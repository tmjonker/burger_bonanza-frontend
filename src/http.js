import { AlternateEmail } from '@mui/icons-material';
import $ from 'jquery';

function postMenuItem(values) {

    const menuItem = {
        id: values.id,
        category: values.category, 
        name: values.name,
        description: values.desc,
        price: values.price,
        imgPath: values.img
    }

    $.ajax({
        type: "post",
        url: "http://localhost:8080/api/menu/" + values.id,
        data: JSON.stringify(menuItem),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function(menuItem) {
            alert("Menu Item successfully added...");
        }
    });
}

function signIn(values) {

    const credentials = {
        username: values.username,
        password: values.password
    }

    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/authenticate',
        data: JSON.stringify(credentials),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        
        success: function(data) {
            let tokenString = JSON.stringify(data);
            let token = "Bearer " + JSON.parse(tokenString).token;
            window.localStorage.setItem(credentials.username, token);
            alert(window.localStorage.getItem(credentials.username));
        }
    })
}

export { postMenuItem, signIn };