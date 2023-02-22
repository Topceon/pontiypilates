console.log('JS подключен')

SITE_NAME = 'pontiypilates'

// функция срабатывающая при нажатии на кнопку создать новую таблицу

// функция срабатывающая при первом обращении
function query_php() {
    let xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        if (this.response !== '0'){
            for (let i = 0; i < 17; i++) {
            console.log('test')
            }
        }
    }
    xhttp.open("GET", 'http://' + SITE_NAME + '/groups.php');
    xhttp.send();
}

query_php()






var xhr = new XMLHttpRequest();
xhr.open('GET', 'groups.php', true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("User created successfully");
    } else if (xhr.status !== 200) {
        console.log("Error: " + xhr.responseText);
    }
};
xhr.send("username=newuser&password=password123");

// функция достающая все группы из БД

// функция достающая из базы данных клиентов по номеру группы

// функция срабатывающая при смене группы