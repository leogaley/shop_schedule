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
                 
                 if($record->basic->customFieldList->customField[5]->searchValue == 1){
                   echo "t2b>";//hard date styling, see CSS
                 }
                 else {
                   echo "t2>";
                 }  
            }  
            else if($d2 >10){
                  
                 echo "<tr id=";    //future
                 
                 if($record->basic->customFieldList->customField[5]->searchValue == 1){
                   echo "t1b>";//hard date styling, see CSS
                 }
                 else {
                   echo "t1>";
                 }  
            }
            else {   
                   echo "<tr id=";    //current
                 
                 if($record->basic->customFieldList->customField[5]->searchValue == 1){
                   echo "t3b>";//hard date styling, see CSS
                 }
                 else {
                   echo "t3>";
                 }  
                  
            }
            $woId = $record->basic->internalId[0]->searchValue->internalId ;
            
            $z = 0;
             for ($x = 1; $x <= 6; $x++) {
                   if($record->basic->customFieldList->customField[$x]->scriptId == "custbody178"){
                     //echo "<td>".$inshopstatus[$record->basic->customFieldList->customField[$x]->searchValue->internalId] . "</td>\n";
                     $statusKey = $record->basic->customFieldList->customField[$x]->searchValue->internalId;
                   }
                   else {
                     $z = $z+1;
                     if($z == 6){
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
            
            
                
            echo  "<td>".$woNum. "</td>\n";  //wo# data
            
           
            echo  "<td>".$record->itemJoin->itemId[0]->searchValue. "</td>\n";  //item# data     
            echo  "<td>".$record->itemJoin->displayName[0]->searchValue. "</td>\n";  //item name data (display name)
            
            if(isset($record->basic->memo[0]->searchValue)){
       
            echo  "<td><span title='".$record->basic->memo[0]->searchValue."'>#</span></td>\n";  //# for MEMO (like a tooltip)
            }
            else { echo "<td> </td>";//if no memo, blank
            }
            
            echo  "<td>".($record->basic->quantity[0]->searchValue - $record->basic->built[0]->searchValue). "</td>\n";  //quantity minus qty built data (open qty on WO)         
            echo "<td>".date('m/d',(strtotime($record->basic->endDate[0]->searchValue)))."</td>\n";//completion date data
                
             if (isset($record->itemJoin->quantityBackOrdered[0]->searchValue)){
                echo "<td>".$record->itemJoin->quantityBackOrdered[0]->searchValue."</td>\n";//back order quantity
                }
                else {
                echo "<td> 0 </td>";//0 if no back orders (system back order)
                }

            for ($x = 1; $x <= 5; $x++) {
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

            if (isset($record->createdFromJoin->tranId[0]->searchValue)){
                echo "<td id=alignleft>".($record->createdFromJoin->tranId[0]->searchValue)." : ".$record->customerJoin->altName[0]->searchValue."</td>\n";//if created from an SO, print SO# and customer data
                }
                else {
                echo "<td> </td>";
                }      
                echo  "</tr>";            
         
          }}
       ?>