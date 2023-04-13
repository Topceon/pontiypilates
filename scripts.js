console.log('JS подключен')

SITE_NAME = 'pontiypilates'

// получаем текущую дату
let currentDate = new Date().toISOString().substr(0, 10);
let group_id_for_php = 0;
let customers = []


// переменная для переключения между стандартными страничками
let switch_page = "attendance_page"


function create_new_db() {
    let newdb_btn = document.getElementById('newdb')
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        if (this.response === 'База данных успешно созданаТаблица создана успешно') {
            //кнопка должна быть удалена
            newdb_btn.remove();
            console.log(this.response)
        }
    }
    xhttp.open("GET", 'http://' + SITE_NAME + '/new_db.php');
    xhttp.send();
}


function query_check_db() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        if (this.response === 'База данных подключена') {
            all_groups_from_db()
            console.log(this.response)
            // устанавливаем текущую дату в датаинпут
            let date_attendance = document.getElementById('date_attendance');
            date_attendance.value = currentDate;
        } else {
            let add_div_var = document.getElementById(`perva`)
            add_div_var.insertAdjacentHTML('afterend', `<div class='row' id='newdb'>Создать новую базу данных?</div>`)
            console.log('Создать новую базу данных?')
            let btn_click = document.getElementById('newdb')
            btn_click.onclick = create_new_db
        }
    }
    xhttp.open("GET", 'http://' + SITE_NAME + '/qry.php');
    xhttp.send();
}
query_check_db()


function create_ready_btn(foo) {
    let parent_for_clear = document.getElementById('customersList');
    parent_for_clear.innerHTML = '';
    const ready_btn = document.createElement('div');
    ready_btn.className = "row1"
    ready_btn.id = "perva"
    ready_btn.innerHTML = 'Готово'
    parent_for_clear.appendChild(ready_btn);
    ready_btn.onclick = foo
}


function switch_page_foo() {
    if (switch_page === "attendance_page") {
        attendance_page_foo()
    } else if (switch_page === "payment_page") {
        payment_page_foo()
    }
}


function attendance_page_foo() {
    if (customers.length > 0) {
        create_ready_btn(attendance_insert_to_db)
        for (let i = 0; i < customers.length; i++) {
            let customer = customers[i];
            let add_div_var = document.getElementById(`perva`)
            add_div_var.insertAdjacentHTML('beforebegin', `<div class='row' id=${customer['customer_id']}>${customer['customer_name']}
            <input class="ch_box" name="${customer['customer_id']}" type="checkbox">
            </div>`)
        }
    } else {
        let parent_for_clear = document.getElementById('customersList');
        parent_for_clear.innerHTML = '';
    }
}


function payment_page_foo() {
    if (customers.length > 0) {
        create_ready_btn(payment_insert_to_db)
        for (let i = 0; i < customers.length; i++) {
            let customer = customers[i];
            let add_div_var = document.getElementById(`perva`)
            add_div_var.insertAdjacentHTML('beforebegin', `<div class='row' id=${customer['customer_id']}>${customer['customer_name']}
            <input class="payment_input" name="${customer['customer_id']}" type="text">
            </div>`)
        }
    } else {
        let parent_for_clear = document.getElementById('customersList');
        parent_for_clear.innerHTML = '';
    }
}


function customers_by_group() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        customers = JSON.parse(this.response)
        switch_page_foo()
    }
    xhttp.open("POST", 'http://' + SITE_NAME + '/customers.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send("param=" + group_id_for_php);
}


function all_groups_from_db() {
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
        select.addEventListener('change', (event) => {
            group_id_for_php = event.target.value;
            customers_by_group();
        })
    }
    xhttp.open("GET", 'http://' + SITE_NAME + '/groups.php');
    xhttp.send();
}


function attendance_insert_to_db() {
    let xhttp = new XMLHttpRequest()
    let elements_to_attendance = document.getElementsByClassName("ch_box");
    customer_data = "data="
    if (elements_to_attendance.length !== 0) {
        let date_attendance = document.getElementById('date_attendance');
        let dat6 = date_attendance.value;
        check_comma = 0
        for (let i = 0; i < elements_to_attendance.length; i++) {
            if (elements_to_attendance[i].checked) {
                if (check_comma) {
                    customer_data = customer_data + ",";
                }
                check_comma += 1;
                customer_data = customer_data + "('" + dat6 + "'," + elements_to_attendance[i].name + ")";
            }
        }
    }
    xhttp.onload = function () {
        console.log(this.response)
    }
    xhttp.open("POST", 'http://' + SITE_NAME + '/insert_attendance.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send("" + customer_data);
}


function payment_insert_to_db() {
    let xhttp = new XMLHttpRequest()
    let elements_to_payment = document.getElementsByClassName("payment_input");
    customer_data = "data="
    if (elements_to_payment.length !== 0) {
        let date_payment = document.getElementById('date_attendance');
        let date_for_db = date_payment.value;
        check_comma = 0
        for (let i = 0; i < elements_to_payment.length; i++) {
            if (elements_to_payment[i].value !== '') {
                if (check_comma) {
                    customer_data = customer_data + ",";
                }
                check_comma += 1;
                // тут формируется текст для отправки
                customer_data = customer_data + "('" + date_for_db + "', '" + elements_to_payment[i].name + "', '" + elements_to_payment[i].value + "')";
            }
        }
    }
    xhttp.onload = function () {
        console.log(this.response)
    }
    xhttp.open("POST", 'http://' + SITE_NAME + '/insert_payments.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send("" + customer_data);

}


function switch_page_btns(btn_id) {
    switch_page = btn_id.target.id
    // customers_by_group(group_id_for_php);
    switch_page_foo()
}

let foot_btn = document.getElementsByClassName('foot_btn')
for (let i = 0; i < foot_btn.length; i++) {
    foot_btn[i].onclick = switch_page_btns
}


// функция срабатывающая при нажатии на кнопку создания нового клиента


// функция срабатывающая при нажатии на кнопку создания новой группы


// функция срабатывающая при нажатии на кнопку создания таблицы присутствующих


// функция срабатывающая при нажатии на кнопку создания таблицы оплативших


// функция срабатывающая при нажатии на клиента в списке для отображения всех его данных

