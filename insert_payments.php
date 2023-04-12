<?php
// этот файл обращается к БД и возвращает список клиентов из группы номер которой в запросе
include 'db.php';

$conn = mysqli_connect($HOST, $USER, $PASSWORD, $DB_NAME);


if (!$conn) {
    die("Ошибка подключения: " . mysqli_connect_error());
}
$a = $_POST['data'];
if ($a == ""){
    die("Не отмечен ни один клиент");
}

$sql = "INSERT INTO `payments` (`payment_date`, `payment_customers_id`, `payment_value`) VALUES $a";

if (mysqli_query($conn, $sql)) {
    echo "Данные записаны";
} else {
    echo "Что то пошло не так: " . mysqli_error($conn);
}

mysqli_close($conn);

?>