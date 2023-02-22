<?php

include 'db.php';

$conn = mysqli_connect($HOST, $USER, $PASSWORD, $DB_NAME);


if (!$conn) {
    die("Ошибка подключения: " . mysqli_connect_error());
}

$sql = "INSERT INTO `groups` (`name`) VALUES ('df3')";

if (mysqli_query($conn, $sql)) {
    echo "Запись успешно добавлена в таблицу";
} else {
    echo "Ошибка: " . mysqli_error($conn);
}
echo 'Testphp';
?>