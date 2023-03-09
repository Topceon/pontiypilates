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


// функция достающая из базы данных клиентов по номеру группы
function customer_php(group_id_for_php){
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        customers = JSON.parse(this.response)
        console.log(customers)
            let j_son = customers
            for (let i = 0; i < customers.length; i++) {
                let customer = customers[i];
                let add_div_var = document.getElementById(`perva`)
                add_div_var.insertAdjacentHTML('afterend', `<div class='row' id=${customer['customer_id']}>${customer['name']}
                <input class="ch_box" name="${customer['customer_id']}" type="checkbox"></div>`)
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
        console.log(groups)
        let select = document.getElementById('grup');
        for (let i = 0; i < groups.length; i++) {
            let option = document.createElement("option");
            option.value = groups[i].group_id;
            option.text = groups[i].group;
            select.add(option);
        }
        select.addEventListener('change', (event) =>{
            let group_id_for_php = event.target.value;
            customer_php(group_id_for_php);
        })
    }
    xhttp.open("GET", 'http://' + SITE_NAME + '/groups.php');
    xhttp.send();
}


// функция срабатывающая при смене группы


// функция срабатывающая при нажатии на кнопку создания нового клиента


