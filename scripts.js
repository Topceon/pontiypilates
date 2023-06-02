console.log('JS подключен')

let SITE_NAME = 'http://pontiypilates'
let currentDate = new Date().toISOString().substr(0, 10);
let month_ago_date1 = new Date()
month_ago_date1.setMonth(month_ago_date1.getMonth() - 1);
let month_ago_date = month_ago_date1.toISOString().substr(0, 10)
let group_id_for_php = 0;
let customers = []
let switch_page = "attendance_page"
let foot_btn = document.getElementsByClassName('foot_btn')
let list_for_clear = document.getElementById('customersList');
let header_for_inputs = document.getElementById('re');
let ready_btn = ''
let select_for_header = document.createElement('select')
let current_date_input = document.createElement('input')
let past_date_input = document.createElement('input')
let inputs_for_header = ''


function create_html_objects(){
    select_for_header.type = "select"
    select_for_header.id = "grup"
    select_for_header.Name = "grup"

    current_date_input.type = "date"
    current_date_input.Name = "date"
    current_date_input.id = "date_attendance"
    current_date_input.value = currentDate;


    past_date_input.type = "date"
    past_date_input.Name = "date"
    past_date_input.id = "past_date_attendance"
    past_date_input.value = month_ago_date
}
create_html_objects()


function create_new_db() {
    let newdb_btn = document.getElementById('perva')
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        if (this.response === 'Таблица создана успешно') {
            //кнопка должна быть удалена
            newdb_btn.remove();
            console.log(this.response)
            query_check_db()
            switch_page = "new_group"
            new_group_foo()
        }
    }
    xhttp.open("GET", SITE_NAME + '/new_db.php');
    xhttp.send();
}


function query_check_db() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        if (this.response === 'База данных подключена') {
            all_groups_from_db()
            console.log(this.response)
            // устанавливаем текущую дату в датаинпут
            for (let i = 0; i < foot_btn.length; i++) {
                foot_btn[i].onclick = switch_page_btns
            }
        } else {
            create_ready_btn(create_new_db, "Создать базу данных?")
        }
    }
    xhttp.open("GET", SITE_NAME + '/qry.php');
    xhttp.send();
}

query_check_db()


function create_ready_btn(foo, text) {
    let parent_for_clear = document.getElementById('customersList');
    parent_for_clear.innerHTML = '';
    ready_btn = document.createElement('div');
    ready_btn.className = "row1 reade_btn"
    ready_btn.id = "perva"
    ready_btn.innerHTML = text
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


function ch_box_for_list_customers(a){
    return `<input class="ch_box" name=${a} type="checkbox">`
}

function area_for_date(a){
    return `<div class="area_for_date" id=a>
                <div class="inside_area_for_date">
                    <div class="date_box">1</div>
                    <div class="date_box">2</div>
                    <div class="date_box date_action">3</div>
                    <div class="date_box">4</div>
                    <div class="date_box">5</div>
                    <div class="date_box">6</div>
                    <div class="date_box">7</div>
                </div>
            </div>`
}

function create_inputs_in_header(inputs){
    header_for_inputs.innerText = ''
    for (let i = 0; i < inputs.length; i++) {
        header_for_inputs.appendChild(inputs[i])
    }
}


function input_for_list_customers(a){
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
    create_inputs_in_header(Array(select_for_header, current_date_input))
    if (customers.length > 0) {
        create_ready_btn(attendance_insert_to_db, 'Готово')
        create_list_of_customers(ch_box_for_list_customers)
    } else {
        list_for_clear.innerHTML = '';
    }
}


function payment_page_foo() {
    create_inputs_in_header(Array(select_for_header, current_date_input))
    if (customers.length > 0) {
        create_ready_btn(payment_insert_to_db, 'Готово')
        create_list_of_customers(input_for_list_customers)
    } else {
        list_for_clear.innerHTML = '';
    }
}


function new_customer_foo() {
    create_inputs_in_header(Array(select_for_header))
    list_for_clear.innerHTML = '';
    create_ready_btn(create_new_customer, 'Добавить клиента')
    let ready_btn = document.getElementById(`perva`)
    ready_btn.insertAdjacentHTML('beforebegin', `
        <div class='row' id='name_1'>Имя
        <input class="payment_input" id='new_customer_name' type="text"></div>
        <div class='row' id='name_2'>Фамилия<input class="payment_input" id='new_customer_lastname' type="text"></div>`)
}


function new_group_foo() {
    create_inputs_in_header(Array())
    list_for_clear.innerHTML = '';
    create_ready_btn(create_new_group, 'Создать группу')
    let ready_btn = document.getElementById(`perva`)
    ready_btn.insertAdjacentHTML('beforebegin', `
        <div class='row' id='name_1'>Группа
        <input class="payment_input" id='new_group_name' type="text"></div>`)
}


function table_attendance_foo() {
    create_inputs_in_header(Array(select_for_header, past_date_input, current_date_input))
    if (customers.length > 0) {
        create_ready_btn(attendance_insert_to_db, 'Создать таблицу')
        create_list_of_customers(area_for_date)
    } else {
        list_for_clear.innerHTML = '';
    }
}


function table_payment_foo() {
    create_inputs_in_header(Array(select_for_header, past_date_input, current_date_input))
    if (customers.length > 0) {
        create_ready_btn(attendance_insert_to_db, 'Создать таблицу')
        create_list_of_customers(ch_box_for_list_customers)
    } else {
        list_for_clear.innerHTML = '';
    }
}


function customers_by_group() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        customers = JSON.parse(this.response)
        switch_page_foo(switch_page)
    }
    xhttp.open("POST", SITE_NAME + '/customers.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send("param=" + group_id_for_php);
}


function all_groups_from_db() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        groups = JSON.parse(this.response)
        select_for_header.innerHTML = '<option value selected>Выбор группы</option>';
        for (let i = 0; i < groups.length; i++) {
            let option = document.createElement("option");
            option.value = groups[i].group_id;
            option.text = groups[i].group;
            select_for_header.add(option);
        }
        select_for_header.addEventListener('change', (event) => {
            group_id_for_php = event.target.value;
            console.log(group_id_for_php)
            customers_by_group();
        })
    }
    xhttp.open("GET", SITE_NAME + '/groups.php');
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
    xhttp.open("POST", SITE_NAME + '/new_customer.php', true);
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
    xhttp.open("POST", SITE_NAME + '/new_group.php', true);
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
    xhttp.open("POST", SITE_NAME + '/insert_attendance.php', true);
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
    xhttp.open("POST", SITE_NAME + '/insert_payments.php', true);
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



// функция срабатывающая при нажатии на кнопку создания таблицы присутствующих


// функция срабатывающая при нажатии на кнопку создания таблицы оплативших


// функция срабатывающая при нажатии на клиента в списке для отображения всех его данных

