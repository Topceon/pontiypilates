console.log('JS подключен')


// тест замены текста в диве по id
// let text_ch = document.getElementById('text_change')
// text_ch.innerHTML = 'Тест замены текста в блоке по id успешный'


// тест замены текста в диве по классу TODO
// let btn_click = document.getElementsByClassName('btn_test')[0]


// тест нажатой кнопки по id
function func_test_click() {
    return console.log('Тест нажатой кнопки')
}
let btn_click = document.getElementById('btn')
btn_click.onclick = func_test_click


// Тест создания дива после целевого
// document.onclick = click_add;

function click_add(event) {
    let target_id = event.target.id
    if (target_id === "re") {
        console.log(target_id)
        let add_div_var = document.getElementById(`${target_id}`)
        add_div_var.insertAdjacentHTML('afterend',
            '<div class="block">Добавление дива по клику с получение целевого id</div>')
    }
}

// тест  запроса в PHP
function query_php() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        if (this.response !== '0'){
            console.log(this.response)
            j_son2 = JSON.parse(this.responseText)
            console.log(j_son2)
            let j_son = j_son2
            for (let i = 0; i < 17; i++) {
                let add_div_var = document.getElementById(`perva`)
                add_div_var.insertAdjacentHTML('afterend', `<div class='row' id=${i}>${j_son[i]}
                <input class="ch_box" name="${i}" type="checkbox"></div>`)
            }
        }else{
            let add_div_var = document.getElementById(`perva`)
                add_div_var.insertAdjacentHTML('afterend', `<div class='row' id=776>Что то не так с данными</div>`)
        }
    }

    xhttp.open("GET", 'http://bmd.kz/qry.php');
    console.log(xhttp.status)
    xhttp.onreadystatechange = function () {

    }

    xhttp.send();
}

query_php()


// тест ajax запроса
function loadDoc() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        console.log(this)
        if (this.response){
            text_j = JSON.parse(this.responseText)
    // начало формирования HTML
            for (let i = 0; i < text_j.push(); i++) {
                let add_div_json = document.getElementById(`left`)
                add_div_json.insertAdjacentHTML('afterend', `<div class='block' id=${text_j[i].id}>${text_j[i].name}</div>`)
            }
        }
        
    // конец формирования HTML
    }
    
    xhttp.open("GET", 'http://127.0.0.1:3000/api/v1/store/?format=json');
    console.log(xhttp.status)
    xhttp.onreadystatechange = function (){
        
    }
    if (xhttp.readyState === 1) {
        xhttp.send();
    }
    else {
        let add_div_json = document.getElementById(`left`)
        add_div_json.insertAdjacentHTML('afterend', `<div id='server_error'}>Сервер не отвечает</div>`)
    }
}
// loadDoc()


// тест  запроса в PHP
function query_php2() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        console.log(this)
        if (this.response){
    // начало формирования HTML
    let add_div_var = document.getElementById(`perva`)
    add_div_var.insertAdjacentHTML('afterend', `<div class='row' id=888>${this.responseText}
</div>`)
        }

    // конец формирования HTML
    }

    xhttp.open("GET", 'http://sitetest/qry.php');
    console.log(xhttp.status)
    xhttp.onreadystatechange = function (){

    }
    if (xhttp.readyState === 1) {
        xhttp.send();
    }
    else {
        let add_div_json = document.getElementById(`left`)
        add_div_json.insertAdjacentHTML('afterend', `<div id='server_error'}>Сервер не отвечает</div>`)
    }
}
// query_php()


// тест вложенный json TODO а зачем?


// тест длинного запроса с ожиданием ответа от сервера при изменении


// тест создания записи в базу данных через ajax
function func_post_click() {
    // console.log('post')
    let xhttp = new XMLHttpRequest()
    xhttp.open("POST", "http://127.0.0.1:3000/api/v1/store/");
    xhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    console.log(xhttp.status)
    xhttp.send('name='+'test_ajax3');
}
// let post_req = document.getElementById('reqPost')
// post_req.onclick = func_post_click


// научиться менять только то что изменилось при изменении данных в json


// научиться формировать запрос для отображения нужных данных


// 
