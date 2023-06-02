<?php

include 'db.php';

// пытаемся подключиться к бд, если не получается то возвращаем значение 0

$conn = mysqli_connect($HOST, $USER, $PASSWORD, $DB_NAME);
$sql = "SELECT * FROM groups";
$result = mysqli_query($conn, $sql);

if ($result) {
    echo 'База данных подключена';
} else {
    echo "Что то пошло не так: " . mysqli_error($conn);
}

mysqli_close($conn);
?>