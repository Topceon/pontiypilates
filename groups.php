<?php
// этот файл обращается к БД и возвращает список всех групп
include 'db.php';

$conn = mysqli_connect($HOST, $USER, $PASSWORD, $DB_NAME);


if (!$conn) {
    die("Ошибка подключения: " . mysqli_connect_error());
}

$sql = "SELECT group_id, group_name FROM groups";
$result = mysqli_query($conn, $sql);

$rows = array();
while ($row = mysqli_fetch_array($result)) {
    $rows[] = array("group_id" => $row["group_id"], "group" => $row["group_name"]);
}

$json = json_encode($rows);

echo $json;

mysqli_close($conn);
?>