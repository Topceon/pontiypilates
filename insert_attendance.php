<?php
// этот файл обращается к БД и возвращает список клиентов из группы номер которой в запросе
include 'db.php';

$conn = mysqli_connect($HOST, $USER, $PASSWORD, $DB_NAME);


if (!$conn) {
    die("Ошибка подключения: " . mysqli_connect_error());
}
$b = "('2023-03-20', '1')";
$a = $_POST['data'];
if ($a == ""){
    die("Не отмечен ни один клиент");
}

$sql = "INSERT INTO `attendance` (`attendance_date`, `attendance_customers_id`) VALUES $a";

if (mysqli_query($conn, $sql)) {
    echo "Данные записаны";
} else {
    echo "Что то пошло не так: " . mysqli_error($conn);
}

mysqli_close($conn);

?>