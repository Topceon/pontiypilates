console.log('JS подключен')

let SITE_NAME = 'pontiypilates'
let currentDate = new Date().toISOString().substr(0, 10);
let group_id_for_php = 0;
let customers = []
let switch_page = "attendance_page"
let foot_btn = document.getElementsByClassName('foot_btn')
let list_for_clear = document.getElementById('customersList');
let ready_btn = ''


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
            for (let i = 0; i < foot_btn.length; i++) {
                foot_btn[i].onclick = switch_page_btns
            }
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
    ready_btn = document.createElement('div');
    ready_btn.className = "row1 reade_btn"
    ready_btn.id = "perva"
    ready_btn.innerHTML = 'Готово'
    parent_for_clear.appendChild(ready_btn);
    ready_btn.onclick = foo
}


function switch_page_foo(btn_target) {
    if (switch_page === "attendance_page") {
        btn_target.id = 'payment_page'
        attendance_page_foo()
    } else if (switch_page === "payment_page") {
        btn_target.id = 'attendance_page'
        payment_page_foo()
    } else if (switch_page === "new_customer") {
        btn_target.id = 'new_group'
        new_customer_foo()
    } else if (switch_page === "new_group") {
        btn_target.id = 'new_customer'
        new_group_foo()
    } else if (switch_page === "table_attendance") {
        btn_target.id = 'table_payment'
        table_attendance_foo()
    } else if (switch_page === "table_payment") {
        btn_target.id = 'table_attendance'
        table_payment_foo()
    }
}


function ch_box_action(a){
    return `<input class="ch_box" name=${a} type="checkbox">`
}


function input_action(a){
    return `<input class="payment_input" name="${a}" type="text">`
}


function create_list_of_customers(itput_for_action){
    for (let i = 0; i < customers.length; i++) {
        let customer = customers[i];
        let input_for_action = itput_for_action(customer['customer_id'])
        ready_btn.insertAdjacentHTML('beforebegin', `<div class='row' id=${customer['customer_id']}>${customer['customer_name']}
        ${input_for_action}
        </div>`)
    }
}


function attendance_page_foo() {
    if (customers.length > 0) {
        create_ready_btn(attendance_insert_to_db)
        create_list_of_customers(ch_box_action)
    } else {
        list_for_clear.innerHTML = '';
    }
}


function payment_page_foo() {
    if (customers.length > 0) {
        create_ready_btn(payment_insert_to_db)
        create_list_of_customers(input_action)
    } else {
        list_for_clear.innerHTML = '';
    }
}


function new_customer_foo() {
    list_for_clear.innerHTML = '';
    create_ready_btn(create_new_customer)
    let ready_btn = document.getElementById(`perva`)
    ready_btn.insertAdjacentHTML('beforebegin', `
        <div class='row' id='name_1'>Имя
        <input class="payment_input" id='new_customer_name' type="text"></div>
        <div class='row' id='name_2'>Фамилия<input class="payment_input" id='new_customer_lastname' type="text"></div>`)
}


function new_group_foo() {
    list_for_clear.innerHTML = '';
    create_ready_btn(create_new_group)
    let ready_btn = document.getElementById(`perva`)
    ready_btn.insertAdjacentHTML('beforebegin', `
        <div class='row' id='name_1'>Группа
        <input class="payment_input" id='new_group_name' type="text"></div>`)
}


function table_attendance_foo() {
    list_for_clear.innerHTML = '';
}


function table_payment_foo() {
    list_for_clear.innerHTML = '';
}


function customers_by_group() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        customers = JSON.parse(this.response)
        switch_page_foo(switch_page)
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
        select.innerHTML = '';
        select.innerHTML = '<option value selected>Выбор группы</option>';
        for (let i = 0; i < groups.length; i++) {
            let option = document.createElement("option");
            option.value = groups[i].group_id;
            option.text = groups[i].group;
            select.add(option);
        }
        select.addEventListener('change', (event) => {
            group_id_for_php = event.target.value;
            console.log(group_id_for_php)
            customers_by_group();
        })
    }
    xhttp.open("GET", 'http://' + SITE_NAME + '/groups.php');
    xhttp.send();
}


function create_new_customer() {
    let xhttp = new XMLHttpRequest()
    let new_customer_name = document.getElementById('new_customer_name');
    let new_customer_lastname = document.getElementById('new_customer_lastname');
    customer_data = "data="
    customer_data = customer_data + "('" + new_customer_name.value + "', '" + new_customer_lastname.value + "', '" + group_id_for_php + "')";
    xhttp.onload = function () {
        console.log(customer_data)
        customers_by_group()
    }
    xhttp.open("POST", 'http://' + SITE_NAME + '/new_customer.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send("" + customer_data);
}


function create_new_group() {
    let xhttp = new XMLHttpRequest()
    let new_group_name = document.getElementById('new_group_name');
    group_data = "data="
    group_data = group_data + "('" + new_group_name.value + "')";
    xhttp.onload = function () {
        all_groups_from_db()
        console.log(group_data)
    }
    xhttp.open("POST", 'http://' + SITE_NAME + '/new_group.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send("" + group_data);
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


function switch_page_btns(event) {
    switch_page = event.target.id
    switch_page_foo(event.target);
    for (let i = 0; i < foot_btn.length; i++) {
        foot_btn[i].classList.remove("action");
        event.target.classList.add("action")
    }
}


// функция срабатывающая при нажатии на кнопку создания нового клиента


// функция срабатывающая при нажатии на кнопку создания новой группы


// функция срабатывающая при нажатии на кнопку создания таблицы присутствующих


// функция срабатывающая при нажатии на кнопку создания таблицы оплативших


// функция срабатывающая при нажатии на клиента в списке для отображения всех его данных

