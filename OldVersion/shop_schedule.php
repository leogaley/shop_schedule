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
    $search->savedSearchId = "1207";//Shop Schedule - Web Services
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
  else if($id=='6'){
    $search->savedSearchId = "1653";//Shop Schedule - Web Services - Packing ONLY 
  }     
  $service->setSearchPreferences(true, 500, true);
  $request = new SearchRequest();
  $request->searchRecord = $search;


//define array for work order build status.        
$status[1] = "In Shop";
$status[2] = "Pending WO";
$status[3] = "Design/Eng";  
$status[5] = "On Hold"; 
$status[5] = "Pending Process"; 
$status[8] = "Pending Customer"; 
$status[9] = "Metal Shop"; 
$status[11] = "Pend. Appr. Drawing"; 
$status[12] = "Approval Submitted"; 
$status[13] = "Drawing Appr, Pend Process"; 

$inshopstatus[1] = "Cutting/EB";
$inshopstatus[2] = "Machining";
$inshopstatus[3] = "Assembly-STK";
$inshopstatus[4] = "Assembly-CF";
$inshopstatus[5] = "Packing";
$inshopstatus[10] = "Shop Drawing";
$inshopstatus[9] = "Pend Customer";
$inshopstatus[7] = "TBD";
$inshopstatus[8] = "Appr Drawing";
$inshopstatus[11] = "Pend CNC Files";
$inshopstatus[12] = "Pend Cut Sheet";
$inshopstatus[13] = "Pend WO";
$inshopstatus[14] = "Ready for Shop";



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
        
      
         
      if($_GET["id"]!=null){
       
       echo "<form action='Submit_Verify.php' method='post'>";//call this php file when submit is clicked
       //echo "<div id='buttons'>";
       echo "<input type='hidden' name='id' value=".$_GET["id"]. ">";//capture 'id' parameter from URL 
       echo "<input type='hidden' name='user' value=".$_GET["user"]. ">";//capture 'user' parameter from URL
      
       
      
      
       echo "<input style='float:left;margin-left:50px;' type='submit' name='formSubmit' value='Submit' />";//add submit button
       //echo  '<input type=button onClick="http://kcsf.info/shop_schedule/shop_schedule.php?&user='.$_GET["user"].'" value="Full Schedule">';
       
       //echo "<form action='shop_schedule.php?id=".$_POST["id"]."&user=".$_POST["user"]."' method='post'>";//go back to the appropriate version of the schedule after clicking OK post update
       //echo "<input type='submit' name='fullSchedule' value='Full Schedule' />";  
       //echo "</div";
       //echo "</form>";
       //echo '<div style="clear: both;"></div>';
      }
       ?>
      
      <?php
        $searchid[1]="Cutting/Edgebanding";//define array for Title text for each schedule
        $searchid[2]="Machining";
        $searchid[3]="Stock Assembly";
        $searchid[4]="CF Assembly";
        $searchid[5]="Packing";
        $searchid[6]="ONLY Packing";
        
        if($_GET["id"]!=null){
          echo "Shop Schedule for ".$searchid[$_GET["id"]];//add title addendum for each sub-schedule
        }
        else 
          echo "Shop Schedule";
        
      
     
      
          
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
      <th> *SH Here? </th> 
      <th>   Quantity </th>
      <th> Due Date </th>
      <th> BO </th>
      <th> Build Status </th>
      <th> In Shop Status </th>
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
          
             if($d2<0){     
                 echo "<tr id=";    //late
                 
                 //if($record->basic->customFieldList->customField[5]->searchValue == 1){
                   //echo "t2b>";//hard date styling, see CSS
                // }
                // else {
                   echo "t2>";
                // }  
            }  
            else if($d2 >10){
                  
                 echo "<tr id=";    //future
                 
                // if($record->basic->customFieldList->customField[5]->searchValue == 1){
                  // echo "t1b>";//hard date styling, see CSS
                // }
                // else {
                   echo "t1>";
                // }  
            }
            else {   
                   echo "<tr id=";    //current
                 
                 //if($record->basic->customFieldList->customField[5]->searchValue == 1){
                   //echo "t3b>";//hard date styling, see CSS
                 //}
                 //else {
                   echo "t3>";
                // }  
                  
            }
            $woId = $record->basic->internalId[0]->searchValue->internalId ;
            
            $componentLink = "http://kcsf.info/shop_schedule/components.php?wo=";
            
            
            
            
            $z = 0;
             for ($x = 1; $x <= 7; $x++) {
                   if($record->basic->customFieldList->customField[$x]->scriptId == "custbody178"){
                     //echo "<td>".$inshopstatus[$record->basic->customFieldList->customField[$x]->searchValue->internalId] . "</td>\n";
                     $statusKey = $record->basic->customFieldList->customField[$x]->searchValue->internalId;
                   }
                   else {
                     $z = $z+1;
                     if($z == 7){
                       $statusKey = null;
                     }
                   }
                  } 
           $woNum = $record->basic->tranId[0]->searchValue;
           $woItem = $record->itemJoin->itemId[0]->searchValue;
           $woItemName = $record->itemJoin->displayName[0]->searchValue;
           
           $woString = "WO: ".$woNum." Item: ".$woItem." ".$woItemName;
           
            if($_GET["id"]!=null && $_GET["id"]==$statusKey){
             echo "<td>";
             echo '<input type="hidden" name="woData[]" value="'.$woString.'">';
             echo '<input type="hidden" name="woInternal[]" value="'.$woId.'">';
            echo '<input type="checkbox" name="updateCut[]" value= "';//add form checkboxes if this is not the full schedule
            
            echo $woId;
            echo '"> ';   
            echo  '</td> ';  
             
           }
            else {
              echo "<td> </td>";//blank column for full schedule, no checkboxes needed
              
            }
            
            
                
            echo  "<td><a href=".$componentLink.$woNum.'>'.$woNum."</a></td>\n";  //wo# data
            
           
            echo  "<td>".$record->itemJoin->itemId[0]->searchValue. "</td>\n";  //item# data     
            echo  "<td>".$record->itemJoin->displayName[0]->searchValue. "</td>\n";  //item name data (display name)
            
            if(isset($record->basic->memo[0]->searchValue)){
       
            echo  "<td><p title='".$record->basic->memo[0]->searchValue."'>#</p></td>\n";  //# for MEMO (like a tooltip)
            }
            else { echo "<td> </td>";//if no memo, blank
            }
            $camera = "<img src='camera.png' title='Need Photo(s)'alt='Need Photo(s)' style='float:center;width:20px;height:20px;'> \n";//add icon if we need to photograph
            $checkmark = "<img src='checkmark.png' title='ALL Custom Materials Here'alt='Custom Materials Here' style='float:center;width:15px;height:15px;'> \n";//add icon for whether *SH items are in stock
            $hard_date = "<img src='hard_date.png' title='HARD DATE' alt='Hard Date' style='float:center;width:25px;height:25px;'>\n";//add icon for whether this order has a hard date
            for ($x = 1; $x <= 8; $x++) {
                  if($record->basic->customFieldList->customField[$x]->scriptId == "custbody162"){
                     if($record->basic->customFieldList->customField[$x]->searchValue->internalId=='1'){
                       $showIcon = 'T';
                       //return;
                     }
                     else {
                       $showIcon = 'F';
                       //return;
                      
                     }
                  }  
            }
            
             for ($x = 1; $x <= 8; $x++) {
                  if($record->basic->customFieldList->customField[$x]->scriptId == "custbody32"){
                     if($record->basic->customFieldList->customField[$x]->searchValue=='1'){
                       $showIcon2 = 'T';
                       //return;
                     }
                     else {
                       $showIcon2 = 'F';
                       //return;
                      
                     }
                  }  
            }
            
            for ($x = 1; $x <= 8; $x++) {
                  if($record->basic->customFieldList->customField[$x]->scriptId == "custbody144"){
                     if($record->basic->customFieldList->customField[$x]->searchValue=='1'){
                       $showIcon3 = 'T';
                       //return;
                     }
                     else {
                       $showIcon3 = 'F';
                       //return;
                      
                     }
                  }  
            }
            
            echo "<td>";
            
            if($showIcon == 'T' && ($statusKey == 14||$statusKey < 6)){
              echo $checkmark;
         
            }
            if($showIcon2 == 'T' ){
              
              echo $hard_date;
            }
            if($showIcon3 == 'T' ){
              
              echo $camera;
            }
            
            echo "</td>\n";
            
            
            //echo "<td><img src='checkmark.png' alt='' style='float:center;width:15px;height:15px;'></td>\n";//add icon for whether *SH items are in stock
            echo  "<td>".($record->basic->quantity[0]->searchValue - $record->basic->built[0]->searchValue). "</td>\n";  //quantity minus qty built data (open qty on WO)         
            echo "<td>".date('m/d',(strtotime($record->basic->endDate[0]->searchValue)))."</td>\n";//completion date data
                
             if (isset($record->itemJoin->quantityBackOrdered[0]->searchValue)){
                echo "<td>".$record->itemJoin->quantityBackOrdered[0]->searchValue."</td>\n";//back order quantity
                }
                else {
                echo "<td> 0 </td>";//0 if no back orders (system back order)
                }

            for ($x = 1; $x <= 7; $x++) {
                   if($record->basic->customFieldList->customField[$x]->scriptId == "custbody34"){
                     echo "<td>".$status[$record->basic->customFieldList->customField[$x]->searchValue->internalId] . "</td>\n";
                   }
                  } 
             //echo "<td>".$status[$record->basic->customFieldList->customField[4]->searchValue->internalId] . "</td>\n";// build status data
             //$z = 0;
             //for ($x = 1; $x <= 6; $x++) {
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
