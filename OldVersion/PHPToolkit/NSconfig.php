<?php
$nsendpoint = "2015_1";
$nshost = "https://webservices.netsuite.com";






if($_GET["user"]== null){
$nsemail = "leo4@kc-store-fixtures.com";
$nspassword = "Quint0616@";
$nsrole = "3";
}
else {
	$userid[1] = "sp@kc-store-fixtures.com";
	$userid[2] = "sp2@kc-store-fixtures.com";
	$userid[3] = "receiving@kc-store-fixtures.com";
	$userid[5] = "ltl@kc-store-fixtures.com";
	$userid[4] = "mike@kc-store-fixtures.com";

	$password[1] = "SmallPack1";
	$password[2] = "SmallPack2";
	$password[3] = "Receiving1";
	$password[5] = "LTLshipping1";
	$password[4] = "KCfix121213*";
	
	$key = $_GET["user"];
	
	//$nsemail = "leo4@kc-store-fixtures.com";
	$nsemail = $userid[$key];
	//$nspassword = "silverado1#";
	$nspassword = $password[$key];
	$nsrole = "1034";
}


$nsaccount = "3429264";
?>
