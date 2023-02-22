console.log('JS подключен')

SITE_NAME = 'pontiypilates'

// функция срабатывающая при нажатии на кнопку создать новую таблицу

// функция срабатывающая при первом обращении
function query_php() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        if (this.response !== '0'){
            console.log('test')
        }
    }
    xhttp.open("GET", 'http://pontiypilates/groups.php');
    xhttp.send();
}

query_php()








// функция достающая все группы из БД

// функция достающая из базы данных клиентов по номеру группы

// функция срабатывающая при смене группы