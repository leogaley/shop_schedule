<?php
$nsendpoint = "2015_1";
$nshost = "https://webservices.netsuite.com";






if($_GET["user"]== null){
$nsemail = "leo4@kc-store-fixtures.com";
$nspassword = "Maverick1$";
$nsrole = "3";
}
else {
	$userid[1] = "sp@kc-store-fixtures.com";
	$userid[2] = "sp2@kc-store-fixtures.com";
	$userid[3] = "receiving@kc-store-fixtures.com";
	$userid[5] = "ltl@kc-store-fixtures.com";
	$userid[4] = "mike@kc-store-fixtures.com";

	$password[1] = "Sp1@KCSF2016";
	$password[2] = "SP2@k-c-s-f2016";
	$password[3] = "Rec@KCSF2016";
	$password[5] = "Ltl@KCSF2016";
	$password[4] = "JEK121213*";
	
	$key = $_GET["user"];
	
	//$nsemail = "leo4@kc-store-fixtures.com";
	$nsemail = $userid[$key];
	//$nspassword = "silverado1#";
	$nspassword = $password[$key];
	$nsrole = "1034";
}


$nsaccount = "3429264";
?>
