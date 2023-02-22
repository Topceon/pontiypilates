<?php


$conn = mysqli_connect($HOST, $USER, $PASSWORD, $DB_NAME);
if( $connection == true){
echo 0;

}else{

$x = '{ "0": "odin",
    "1": "PHPtest",
"2": "tri",
"3": "odin",
"4": "dva",
"5": "tri",
"6": "odin",
"7": "dva",
"8": "tri",
"9": "dva",
"10": "tri",
"11": "odin",
"12": "dva",
"13": "tri",
"14": "tri",
"15": "odin",
"16": "dva",
"17": "tri"}';
}
echo $x;
$sql = "INSERT INTO `castomers` (`name`, group_id`, `charact`) VALUES (\'Имя2 Фамилия\', \'1\',\'70\')";

?>