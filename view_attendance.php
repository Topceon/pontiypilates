<?php
// этот файл обращается к БД и возвращает список всех групп
include 'db.php';

$conn = mysqli_connect($HOST, $USER, $PASSWORD, $DB_NAME);

$a = '3, 4, 6, 7, 8';
if (!$conn) {
    die("Ошибка подключения: " . mysqli_connect_error());
}

// $sql = "SELECT group_id, group_name FROM groups";
$sql = "SELECT * FROM `payments` WHERE `payment_customers_id` IN ($a)";
$result = mysqli_query($conn, $sql);

$rows = array();
while ($row = mysqli_fetch_array($result)) {
    $rows[] = array("customer_id" => $row["payment_customers_id"], "value" => $row["payment_value"]);
}

$json = json_encode($rows);

echo $json;

mysqli_close($conn);
?>