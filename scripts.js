console.log('JS подключен')

SITE_NAME = 'pontiypilates'

// получаем текущую дату
let currentDate = new Date().toISOString().substr(0, 10);
let group_id_for_php = 0;


// переменная для переключения между стандартными страничками
let switch_page = "attendance_page"


// функция срабатывающая при нажатии на кнопку создать новую базу данных
function new_db_php() {
    let newdb_btn = document.getElementById('newdb')
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        if (this.response === 'База данных успешно созданаТаблица создана успешно'){
            //кнопка должна быть удалена
            newdb_btn.remove();
            console.log(this.response)
        }
    }
    xhttp.open("GET", 'http://' + SITE_NAME + '/new_db.php');
    xhttp.send();
}


// функция срабатывающая при первом обращении если все норм то обращаемся к qroups_php() иначе к new_db.php
function query_php() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        if (this.response === 'База данных подключена'){
            qroups_php()
            console.log(this.response)
            // устанавливаем текущую дату в датаинпут
            let date_attendance = document.getElementById('date_attendance');
            console.log(currentDate)
            date_attendance.value = currentDate;
        }else {
            let add_div_var = document.getElementById(`perva`)
            add_div_var.insertAdjacentHTML('afterend', `<div class='row' id='newdb'>Создать новую базу данных?</div>`)
            console.log('Создать новую базу данных?')
            let btn_click = document.getElementById('newdb')
            btn_click.onclick = new_db_php
        }
    }
    xhttp.open("GET", 'http://' + SITE_NAME + '/qry.php');
    xhttp.send();
}
query_php()


// функция достающая из базы данных клиентов по номеру группы и формирует список на страничеке
function customer_php(group_id_for_php){
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        customers = JSON.parse(this.response)
        let elementsToRemove = document.getElementsByClassName("row");
            if (elementsToRemove.length !== 0) {
                for (let i = elementsToRemove.length; i > 0; i--) {
                    elementsToRemove[i - 1].parentNode.removeChild(elementsToRemove[i - 1]);
                }
            }
            if (switch_page === "attendance_page") {
                for (let i = 0; i < customers.length; i++) {
                    let customer = customers[i];
                    let add_div_var = document.getElementById(`perva`)
                    add_div_var.insertAdjacentHTML('beforebegin', `<div class='row' id=${customer['customer_id']}>${customer['customer_name']}
                    <input class="ch_box" name="${customer['customer_id']}" type="checkbox"></div>`)
                }
            }else{
                for (let i = 0; i < customers.length; i++) {
                    let customer = customers[i];
                    let add_div_var = document.getElementById(`perva`)
                    add_div_var.insertAdjacentHTML('beforebegin', `<div class='row' id=${customer['customer_id']}>${customer['customer_name']}</div>`)
                }
            }
    }
    xhttp.open("POST", 'http://' + SITE_NAME + '/customers.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send("param=" + group_id_for_php);
}


// функция достающая все группы из БД
function qroups_php() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        groups = JSON.parse(this.response)
        let select = document.getElementById('grup');
        for (let i = 0; i < groups.length; i++) {
            let option = document.createElement("option");
            option.value = groups[i].group_id;
            option.text = groups[i].group;
            select.add(option);
        }
        select.addEventListener('change', (event) =>{
            group_id_for_php = event.target.value;
            customer_php(group_id_for_php);
        })
    }
    xhttp.open("GET", 'http://' + SITE_NAME + '/groups.php');
    xhttp.send();
}


// функция срабатывающая при нажатии на кнопку готово для отправления в БД информации о присутствующих
function attendance_insert() {
    let xhttp = new XMLHttpRequest()
    let elements_to_attendance = document.getElementsByClassName("ch_box");
    customer_data = "data="
    if (elements_to_attendance.length !== 0) {
        let date_attendance = document.getElementById('date_attendance');
        let dat6 = date_attendance.value;
        check_comma = 0
        for (let i = 0; i < elements_to_attendance.length; i++) {
            if (elements_to_attendance[i].checked) {
                if (check_comma){
                    customer_data = customer_data + ",";
                }
                check_comma += 1;
                // тут формируется текст для отправки
                customer_data = customer_data + "('" + dat6 + "'," + elements_to_attendance[i].name + ")";
            }
        }
    }
    xhttp.onload = function () {
        console.log(this.response)
    }
    xhttp.open("POST", 'http://' + SITE_NAME + '/insert_attendance.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send("" + customer_data); // тут будет переменная содержащая текст сформированный для отправки в БД

}
let btn_click = document.getElementById('perva')
btn_click.onclick = attendance_insert


// Функции для переключения стандартных страничек
function attendance_page() {
    switch_page = "attendance_page";
    customer_php(group_id_for_php);
}
let btn_attendance_page = document.getElementById('home_page')
btn_attendance_page.onclick = attendance_page

function payment_page() {
    switch_page = "payment_page";
    customer_php(group_id_for_php);
}
let btn_payment_page = document.getElementById('payment_page')
btn_payment_page.onclick = payment_page

function new_customer_page() {
    switch_page = "new_customer_page"
}
let btn_new_customer_page = document.getElementById('new_customer')
btn_new_customer_page.onclick = new_customer_page

function table_attendance_page() {
    switch_page = "table_attendance_page"
}
let btn_table_attendance_page = document.getElementById('table_attendance')
btn_table_attendance_page.onclick = table_attendance_page

// функция срабатывающая при нажатии на кнопку создания нового клиента


// функция срабатывающая при нажатии на кнопку создания новой группы


// функция срабатывающая при нажатии на кнопку создания таблицы присутствующих


// функция срабатывающая при нажатии на кнопку создания таблицы оплативших


// функция срабатывающая при нажатии на клиента в списке для отображения всех его данных

