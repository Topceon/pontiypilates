<?php
// этот файл обращается к БД и возвращает список клиентов из группы номер которой в запросе
include 'db.php';

$conn = mysqli_connect($HOST, $USER, $PASSWORD, $DB_NAME);


if (!$conn) {
    die("Ошибка подключения: " . mysqli_connect_error());
}
$group_id = $_POST['param'];
$sql = "SELECT customer_id, customer_name FROM customers WHERE customer_group_id='$group_id'";
$result = mysqli_query($conn, $sql);

$rows = array();
while ($row = mysqli_fetch_array($result)) {
    $rows[] = array("customer_id" => $row["customer_id"], "name" => $row["customer_name"]);
}

$json = json_encode($rows);

echo $json;

mysqli_close($conn);
?>