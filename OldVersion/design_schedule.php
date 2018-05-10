<?php
header("refresh: 180");

echo "<!DOCTYPE html>";
echo "<html>";
require_once 'PHPToolkit/NetSuiteService.php';
set_time_limit(0); 
print(str_repeat(" ", 120) . "\n"); 
flush();
$service = new NetSuiteService();

   function checkForNull($val){
      

      if (isset($val)){
          return $val;
      }
      else {
      return 'nope';
      }}; 
  

  $search = new TransactionSearchAdvanced();
  $searchid[1] = "1207";
  
  if($id==null){
    $search->savedSearchId = "1565";//Design Schedule - Web Services
  }
  else if($id=='1'){
    $search->savedSearchId = "1311";//Shop Schedule - Web Services - Cutting
  }  
  else if($id=='2'){
    $search->savedSearchId = "1313";//Shop Schedule - Web Services - Machining
  }   
  else if($id=='3'){
    $search->savedSearchId = "1314";//Shop Schedule - Web Services - Stock Assembly
  }   
  else if($id=='4'){
    $search->savedSearchId = "1315";//Shop Schedule - Web Services - CF Assembly
  }   
  else if($id=='5'){
    $search->savedSearchId = "1316";//Shop Schedule - Web Services - Packing
  }     
  $service->setSearchPreferences(true, 500, true);
  $request = new SearchRequest();
  $request->searchRecord = $search;


//define array for work order build status.        
$status[1] = "In Shop";
$status[2] = "Pending WO";
$status[3] = "Pending Process";  
$status[5] = "On Hold"; 
$status[5] = "Pending Process"; 
$status[8] = "Pending Customer"; 
$status[9] = "Metal Shop"; 
$status[11] = "Pend. Appr. Drawing"; 
$status[12] = "Approval Submitted"; 
$status[13] = "Drawing Appr, Pend Process"; 


//define array for 'in shop status', which has been renamed as Sub Status
$inshopstatus[1] = "Cutting/EB";
$inshopstatus[2] = "Machining";
$inshopstatus[3] = "Assembly-STK";
$inshopstatus[4] = "Assembly-CF";
$inshopstatus[5] = "Packing";
$inshopstatus[8] = "Approval Drawing";
$inshopstatus[9] = "Pend Customer Approval";
$inshopstatus[10] = "Shop Drawing";
$inshopstatus[11] = "CNC Files";
$inshopstatus[12] = "Cut Sheet";
$inshopstatus[13] = "Work Order";
$inshopstatus[14] = "Ready for Shop";


//define array for 'user'
$user[47709]= "Jeff";
$user[1256057]= "Kim";
$user[1256058]= "Jason";
$user[47708]= "Phil";
$user[1633375]= "Aaron";


//define array for completion field for each step
$done[10]='custbody197';
$done[8]='custbody194';
$done[9]='custbody195';
$done[11]='custbody186';
$done[12]='custbody200';
$done[13]='custbody198';
$done[14]='custbody201';




$searchResponse = $service->search($request);
      
      //print '<pre>';
      //print_r($searchResponse); //variable dump for testing
      //print '</pre>';
      
      $records = $searchResponse->searchResult->searchRowList->searchRow;
      $today = getdate();
      $m = $today['mon'];
      $y = $today['year'];
      $d = $today['mday'];
      
      
      $todaystr = "$y-$m-$d";
     
   ?>
     
      
 <head> <link rel="stylesheet" href="styles.css">
 <script type="text/javascript">

window.onload=function(){
document.body.style.cursor='default';
}


</script>
    
     
 
 </head>

 <body>
 
      <h1>
      
    <img src="KCSF_Logo.jpg" alt="" style="float:right;width:250px;height:60px;">
    
    
      <?php 
        
      
         
      //if($_GET["id"]!=null){
       
       echo "<form action='Submit_Verify.php' method='post'>";//call this php file when submit is clicked
       //echo "<div id='buttons'>";
       echo "<input type='hidden' name='id' value='6'>";//capture 'id' parameter from URL (always 6 for design)
       echo "<input type='hidden' name='user' value=".$_GET["user"]. ">";//capture 'user' parameter from URL
      
       
      
      
       echo "<input style='float:left;margin-left:50px;' type='submit' name='formSubmit' value='Submit' />";//add submit button
       //echo  '<input type=button onClick="http://kcsf.info/shop_schedule/shop_schedule.php?&user='.$_GET["user"].'" value="Full Schedule">';
       
       //echo "<form action='shop_schedule.php?id=".$_POST["id"]."&user=".$_POST["user"]."' method='post'>";//go back to the appropriate version of the schedule after clicking OK post update
       //echo "<input type='submit' name='fullSchedule' value='Full Schedule' />";  
       //echo "</div";
       //echo "</form>";
       //echo '<div style="clear: both;"></div>';
     // }
       ?>
      
      <?php
        $searchid[1]="Cutting/Edgebanding";//define array for Title text for each schedule
        $searchid[2]="Machining";
        $searchid[3]="Stock Assembly";
        $searchid[4]="CF Assembly";
        $searchid[5]="Packing";
        if($_GET["id"]!=null){
          echo "Shop Schedule for ".$searchid[$_GET["id"]];//add title addendum for each sub-schedule
        }
        else 
          echo "Design/Engineering Schedule";
        
      
     
      
          
        if($_GET["id"]!=null){
      
      echo "<input style='float:right;margin-right:50px;' type=button onClick='location.href=";
      echo '"shop_schedule.php?user='.$_GET["user"];
      echo '";';
      echo "' ";
      echo 'value="Full Schedule">';
      echo '<div style="clear: both;"></div>';
         }
         
         if($_GET["id"]==null&&$_GET["user"]!=null){
      echo "<input style='float:right;margin-right:50px;' type=button onClick='location.href=";
      echo '"shop_schedule.php?user='.$_GET["user"];
      echo '&id='.$_GET["user"];
      echo '";';
      echo "' ";
      echo 'value="Back">';
      echo '<div style="clear: both;"></div>';
         }
            
      ?> 
          
         </h1>
      <h2 style = text-align:right;text-size:.5>
      <?php
   
        
       
        date_default_timezone_set("America/Chicago");
          
      echo "    Last Updated: " . date("h:i a  ");//last updated box
      
      ?>
     
      </h2>
    

    <table style='width: 100%' >
    
      <th>  </th>  
      
      <th> WO# </th>
      <th>   Item </th>
      <th>   Description </th>
      <th>  </th>  
      <th>   Quantity </th>
      <th> Start Date </th>
      <th> Compl. Date </th>
      <th> BO </th>
      <th> User </th>
      <th> Sub Status </th>
      <th> SO # : Customer</th>
    </tr>
     
          <?php 

          //cycle through each record and add table data, all from the saved search ID above
          if($records == null){
            echo "NO WORK ORDERS, THIS SCHEDULE IS EMPTY";//if no records are in the saved search
          }
          else{
          foreach ($records as $record)  {
           
           $completionDate = strtotime($record->basic->endDate[0]->searchValue);  
           $d2=ceil(($completionDate-time())/60/60/24);//determine days between today and completion date for each work order
          
           
            $woId = $record->basic->internalId[0]->searchValue->internalId ;
            $x = 0;
            $z = 0;
            
            //find if the search has pulled a user for each record
            for ($x = 0; $x <= 5; $x++) {
                   if($record->basic->customFieldList->customField[$x]->scriptId == "custbody57"){
                     //echo "<td>".$inshopstatus[$record->basic->customFieldList->customField[$x]->searchValue->internalId] . "</td>\n";
                     $userKey = $record->basic->customFieldList->customField[$x]->searchValue->internalId;
                     break;
                   }
                   else {
                     $z = $z+1;
                     if($z == 5){
                       $userKey = null;
                     }
                   }
                  } 
             //find if the search has pulled a sub status for each record
             $x = 0;
             $z = 0;
             for ($x = 0; $x <= 5; $x++) {
                   if($record->basic->customFieldList->customField[$x]->scriptId == "custbody178"){
                     //echo "<td>".$inshopstatus[$record->basic->customFieldList->customField[$x]->searchValue->internalId] . "</td>\n";
                     $statusKey = $record->basic->customFieldList->customField[$x]->searchValue->internalId;
                     break;
                   }
                   else {
                     $z = $z+1;
                     if($z == 5){
                       $statusKey = null;
                     }
                   }
                  } 
                  
              if($statusKey=='10'||$statusKey=='8'||$statusKey=='9'){     
                 echo "<tr id=t2>";    //pending drawings of some sort
              }
              else if($statusKey=='11'){     
                 echo "<tr id=t1>";    //pending CNC files
              }
              else if($statusKey=='12'){     
                 echo "<tr id=t5>";    //pending CNC files
              }
              else if($statusKey=='13'){     
                 echo "<tr id=t4>";    //pending CNC files
              }
              else if($statusKey=='14'){     
                 echo "<tr id=t3>";    //pending CNC files
              }
              else {
                 echo "<tr>"; //N/A
              }
                 //if($record->basic->customFieldList->customField[5]->searchValue == 1){
                   //echo "t2b>";//hard date styling, see CSS
                 //}
                // else {
                  // echo "t2>";
                 //}       
               
                  //$inshopstatus[8] = "Approval Drawing";
                  //$inshopstatus[9] = "Pend Customer Approval";
                  //$inshopstatus[10] = "Shop Drawing";
                  //$inshopstatus[11] = "CNC Files";
                  //$inshopstatus[12] = "Cut Sheet";
                  //$inshopstatus[13] = "Work Order";
                  //$inshopstatus[14] = "Ready for Shop";
                  
                  
                  
                  
                  
                  
           $woNum = $record->basic->tranId[0]->searchValue;
           $woItem = $record->itemJoin->itemId[0]->searchValue;
           $woItemName = $record->itemJoin->displayName[0]->searchValue;
           $stepCompleted = $inshopstatus[$statusKey];
           $woString = $stepCompleted." Complete <br>WO: ".$woNum." Item: ".$woItem." ".$woItemName;
           
            if($statusKey != null){
             echo "<td>";
             echo '<input type="hidden" name="woData[]" value="'.$woString.'">';
             echo '<input type="hidden" name="woInternal[]" value="'.$woId.'">';
             echo '<input type="hidden" name="woStatus[]" value="'.$inshopstatus[$statusKey].'">';
             echo '<input type="hidden" name="woField[]" value="'.$done[$statusKey].'">';
             
            echo '<input type="checkbox" name="updateCut[]" value= "';//add form checkboxes if this is not the full schedule
            
            echo $woId;
            echo '"> ';   
            echo  '</td> ';  
             
           }
            else {
              echo "<td> </td>";//blank column for full schedule, no checkboxes needed
              
            }
            
            
                
            echo  "<td>".$woNum."</td>\n";  //wo# data
            
           
            echo  "<td>".$record->itemJoin->itemId[0]->searchValue. "</td>\n";  //item# data     
            echo  "<td>".$record->itemJoin->displayName[0]->searchValue. "</td>\n";  //item name data (display name)
            
            if(isset($record->basic->memo[0]->searchValue)){
       
            echo  "<td><p title='".$record->basic->memo[0]->searchValue."'>#</p></td>\n";  //# for MEMO (like a tooltip)
            }
            else { echo "<td> </td>";//if no memo, blank
            }
            
            echo  "<td>".($record->basic->quantity[0]->searchValue - $record->basic->built[0]->searchValue). "</td>\n";  //quantity minus qty built data (open qty on WO)         
            echo "<td>".date('m/d',(strtotime($record->basic->startDate[0]->searchValue)))."</td>\n";//start date data
            echo "<td>".date('m/d',(strtotime($record->basic->endDate[0]->searchValue)))."</td>\n";//completion date data
                
             if (isset($record->itemJoin->quantityBackOrdered[0]->searchValue)){
                echo "<td>".$record->itemJoin->quantityBackOrdered[0]->searchValue."</td>\n";//back order quantity
                }
                else {
                echo "<td> 0 </td>";//0 if no back orders (system back order)
                }
            //The following is blocked out because do not need Work Order status for design schedule     
            //for ($x = 1; $x <= 6; $x++) {
                   //if($record->basic->customFieldList->customField[$x]->scriptId == "custbody34"){
                    // echo "<td>".$status[$record->basic->customFieldList->customField[$x]->searchValue->internalId] . "</td>\n";
                   //}
                 // } 
             //echo "<td>".$status[$record->basic->customFieldList->customField[4]->searchValue->internalId] . "</td>\n";// build status data
             //$z = 0;
             //for ($x = 1; $x <= 6; $x++) {
                  if($userKey != null){
                     echo "<td>".$user[$userKey] ."</td>\n";
                   }
                   else {
                     
                       echo "<td>N/A</td>\n";
                     
                   }
                   
             
             
                   if($statusKey != null){
                     echo "<td>".$inshopstatus[$statusKey] . "</td>\n";
                   }
                   else {
                     
                       echo "<td>N/A</td>\n";
                     
                   }
                   
             
             
             //if (isset($record->basic->customFieldList->customField[3]->searchValue->internalId)){
               //echo "<td>".$inshopstatus[$record->basic->customFieldList->customField[3]->searchValue->internalId] . "</td>\n";// in shop status data
             //}
            // else {
               //echo "<td></td>\n";//no in-shop status
             //}     
              //check if created-from sales order is null, combine with customer name
            if (isset($record->createdFromJoin->tranId[0]->searchValue)){
                echo "<td id=alignleft>".($record->createdFromJoin->tranId[0]->searchValue)." : ".$record->customerJoin->altName[0]->searchValue."</td>\n";//if created from an SO, print SO# and customer data
                }
                else {
                echo "<td> </td>";
                }      
                echo  "</tr>";            
         
          }}
       ?>
    </table>
    
      
    
  </body>
</html>
