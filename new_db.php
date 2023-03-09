<?php

include 'db.php';

$conn = mysqli_connect($HOST, $USER, $PASSWORD);


// создание базы данных

$sql = "CREATE DATABASE $DB_NAME";

if (mysqli_query($conn, $sql)) {
    echo "База данных успешно создана";
} else {
    echo "Ошибка создания базы данных: " . mysqli_error($conn);
}


$conn = mysqli_connect($HOST, $USER, $PASSWORD, $DB_NAME);

//создание таблиц в базе данных

$sql1 = "CREATE TABLE customers (
customers_id INT (6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR (255) NOT NULL,
lastname VARCHAR (255) NOT NULL,
customer_group_id INT (6) NOT NULL
)";

$sql2 = "CREATE TABLE groups (
group_id INT (6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
group_name VARCHAR (255) NOT NULL
)";

$sql3 = "CREATE TABLE attendance (
attendance_id INT (6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
attendance_date DATE NOT NULL,
attendance_customers_id INT (6) NOT NULL
)";

$sql4 = "CREATE TABLE payment (
payment_id INT (6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
payment_date DATE NOT NULL,
payment_customers_id INT (6) NOT NULL
)";

if (mysqli_query($conn, $sql1) && mysqli_query($conn, $sql2) && mysqli_query($conn, $sql3) && mysqli_query($conn, $sql4)) {
    echo "Таблица создана успешно";
} else {
    echo "Что то пошло не так: " . mysqli_error($conn);
}
mysqli_close($conn);
?>