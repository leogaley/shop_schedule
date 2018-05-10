<?php 
        
      
         
      if($_GET["id"]!=null){
       
       echo "<form action='Submit_Verify.php' method='post'>";//call this php file when submit is clicked
       echo "<input type='hidden' name='id' value=".$_GET["id"]. ">";//capture 'id' parameter from URL 
       echo "<input type='hidden' name='user' value=".$_GET["user"]. ">";//capture 'user' parameter from URL
      
       
      
      
       echo "<input style='float:left;margin-left:50px;' type='submit' name='formSubmit' value='Submit' />";//add submit button

      }
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
          echo "Shop Schedule";
        
      
     
      
          
        if($_GET["id"]!=null){
      
      echo "<input style='float:right;margin-right:50px;' type=button onClick='location.href=";
      echo '"shop_schedule_Shane-test.php?user='.$_GET["user"];
      echo '";';
      echo "' ";
      echo 'value="Full Schedule">';
      echo '<div style="clear: both;"></div>';
         }
         
         if($_GET["id"]==null&&$_GET["user"]!=null){
      echo "<input style='float:right;margin-right:50px;' type=button onClick='location.href=";
      echo '"shop_schedule_Shane-test.php?user='.$_GET["user"];
      echo '&id='.$_GET["user"];
      echo '";';
      echo "' ";
      echo 'value="Back">';
      echo '<div style="clear: both;"></div>';
         }
            
      ?>