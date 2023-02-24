console.log('JS подключен')

SITE_NAME = 'pontiypilates'


// функция срабатывающая при нажатии на кнопку создать новую базу данных
function new_db_php() {
    let newdb_btn = document.getElementById('newdb')
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        if (this.response === 'База данных успешно созданаТаблица создана успешно'){
            //кнопка должна быть удалена
            newdb_btn.remove();
            console.log('test')
        }
    }
    xhttp.open("GET", 'http://' + SITE_NAME + '/new_db.php');
    xhttp.send();
}


// функция срабатывающая при первом обращении если все норм то обращаемся к qroups_php() иначе к new_db.php
function query_php() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        if (this.response === '1'){
            console.log(this.response)
        }else {
            let add_div_var = document.getElementById(`perva`)
            add_div_var.insertAdjacentHTML('afterend', `<div class='row' id='newdb'>Создать новую базу данных?}</div>`)
            console.log('Создать новую базу данных?')
            let btn_click = document.getElementById('newdb')
            btn_click.onclick = new_db_php
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


