<?php
include 'db.php';

$conn = mysqli_connect($HOST, $USER, $PASSWORD, $DB_NAME);


if (!$conn) {
    die("Ошибка подключения: " . mysqli_connect_error());
}
$a = $_POST['data'];

$sql = "INSERT INTO `customers` (`customer_name`, `lastname`, `customer_group_id`) VALUES $a";

if (mysqli_query($conn, $sql)) {
    echo "Данные записаны";
} else {
    echo "Что то пошло не так: " . mysqli_error($conn);
}

mysqli_close($conn);

?>