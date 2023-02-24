console.log('JS подключен')

SITE_NAME = 'pontiypilates'


// функция срабатывающая при нажатии на кнопку создать новую базу данных


// функция срабатывающая при первом обращении если все норм то обращаемся к qroups_php() иначе к new_db.php
function query_php() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        if (this.response !== '0'){
            console.log('test')
        }else {
            console.log('Создать новую базу данных?')
        }
    }
    xhttp.open("GET", 'http://' + SITE_NAME + '/qry.php');
    xhttp.send();
}
query_php()

// функция достающая все группы из БД
function qroups_php() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        if (this.response !== '0'){
            console.log('test')
        }
    }
    xhttp.open("GET", 'http://' + SITE_NAME + '/groups.php');
    xhttp.send();
}
// функция достающая из базы данных клиентов по номеру группы


// функция срабатывающая при смене группы


// функция срабатывающая при нажатии на кнопку создания нового клиента


