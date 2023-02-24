<?php

include 'db.php';

// пытаемся подключиться к бд, если не получается то возвращаем значение 0

$conn = mysqli_connect($HOST, $USER, $PASSWORD, $DB_NAME);

if (!$conn) {
    echo '0';
    die("Ошибка подключения: " . mysqli_connect_error());
}else{
    echo '1';
}
?>