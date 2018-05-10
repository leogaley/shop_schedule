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
  
  $woParam = '7343';
  $search = new TransactionSearchAdvanced();
  $searchid[1] = "1207";
  
  if($id==null){
    $search->savedSearchId = "2063";//Items by component - Web Services
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
  $service->setSearchPreferences(false, 1000, true);
  //$tranidSearchField = new SearchStringField(); $tranidSearchField->operator = "contains"; $tranidSearchField->searchValue = "2910257";
 // $search->tranid = $tranidSearchField;
  
  $request = new SearchRequest();
  $request->searchRecord = $search;




$searchResponse = $service->search($request);
      
     //print '<pre>';
    // print_r($searchResponse); //variable dump for testing
     //print '</pre>';
      
      $records = $searchResponse->searchResult->searchRowList->searchRow;
      //$today = getdate();
      //$m = $today['mon'];
      //$y = $today['year'];
      //$d = $today['mday'];
      
      
      //$todaystr = "$y-$m-$d";
     
   ?>
     
      
 <head> <link rel="stylesheet" href="styles.css">
 <script type="text/javascript">

window.onload=function(){
document.body.style.cursor='default';
}


</script>
    
     
 
 </head>

 <body>
 
      <h1 style = text-align:left>
      
   
    
    
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
          echo "Work Order #". $_GET["wo"]." BOM List";
        
      
     
      
          
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
   
        
       
        //date_default_timezone_set("America/Chicago");
          
      //echo "    Last Updated: " . date("h:i a  ");//last updated box
      
      ?>
     
      </h2>
    

    <table style='width: 80%' >
    
    <tr>
      
    
      <th>   Item </th>
      <th>   Description </th>
      <th>  Work Order Quantity </th>  
      <th> On Hand Quantity </th> 
       <th> Bin Location </th> 
     
     
    </tr>
     
          <?php 

          //cycle through each record and add table data, all from the saved search ID above
          if($records == null){
            echo "NO WORK ORDERS, THIS SCHEDULE IS EMPTY";//if no records are in the saved search
          }
          else{
          foreach ($records as $record)  {
            $woNum = $record->basic->tranId[0]->searchValue;
            if($woNum == $_GET["wo"]){ 
           //$completionDate = strtotime($record->basic->endDate[0]->searchValue);  
           //$d2=ceil(($completionDate-time())/60/60/24);//determine days between today and completion date for each work order
          
          $lineq = $record->basic->quantity[0]->searchValue;  //line item quantity         
          $oh = $record->itemJoin->quantityOnHand[0]->searchValue;  //on hand quantity
           
           if(isset($oh)){
             $d2 = $oh-$lineq;
           }
           else {
             $d2 = 0;
           }
          
          
           if($d2<0){     
                 echo "<tr id=";    //late
                 
                 //if($record->basic->customFieldList->customField[5]->searchValue == 1){
                   //echo "t2b>";//hard date styling, see CSS
                // }
                // else {
                   echo "t2>";
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
            
           
           $woItem = $record->itemJoin->itemId[0]->searchValue;
           $woItemName = $record->itemJoin->displayName[0]->searchValue;
           
           
           
            
            
            
               //echo $_GET("wo"); 
            //echo  "<td>".$woNum. "</td>\n";  //wo# data
            
           
            echo  "<td>".$record->itemJoin->itemId[0]->searchValue. "</td>\n";  //item# data     
            //echo  "<td>".$record->itemJoin->displayName[0]->searchValue. "</td>\n";  //item name data (display name)
             if(isset($record->basic->memo[0]->searchValue)){
              // echo  "<td>".$record->itemJoin->salesDescription[0]->searchValue. "</td>\n";  //item name data (sales description)
              echo  "<td>".$record->basic->memo[0]->searchValue. "</td>\n";  //item name data (sales description)
             }
             else{
               echo  "<td>".$record->itemJoin->displayName[0]->searchValue. "</td>\n";  //item name data (display name)
             }
           
            
            //echo "<td><img src='checkmark.png' alt='' style='float:center;width:15px;height:15px;'></td>\n";//add icon for whether *SH items are in stock
            echo  "<td>".$record->basic->quantity[0]->searchValue."</td>\n";  //line item quantity         
          
             if( $record->itemJoin->type[0]->searchValue == '_service'||$record->itemJoin->type[0]->searchValue == '_nonInventoryItem'){
                echo "<td> N/A </td>";//N/A if noninventory or service
             }
             else{
             if (isset($record->itemJoin->quantityOnHand[0]->searchValue)){
                echo "<td>".round($record->itemJoin->quantityOnHand[0]->searchValue)."</td>\n";//on hand quantity
                
                }
                else {
                echo "<td> 0 </td>";//0 if none on hand
                }
             }
            echo  "<td>".$record->itemJoin->customFieldList->customField[0]->searchValue."</td>\n";  //bin location        
            
          echo  "</tr>";    
           $results = 'Y';
            }        
          
          }
          
          if($results != 'Y'){
            
            echo "<tr> WORK ORDER COMPONENTS NOT CONFIRMED YET </tr>";
          }
          
          }
       ?>
    </table>
    
      
    
  </body>
</html>
