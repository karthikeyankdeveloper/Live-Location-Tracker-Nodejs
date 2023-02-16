var btn = document.getElementById('login_button');
var message = document.getElementById('message');
var message_placeholder = document.getElementById('message_placeholder');

function validate() {
    btn.disabled = true;

    var email = document.getElementById('login_email');

    var pass = document.getElementById('login_pass');


    if (email.value == "" || pass.value == "") {
        show_message("Fill All blank!");
        return false;
    }
    else if (pass.value.length < 8) {
        show_message("Password Length atleast 8");
        return false;
    }
    else {
        return true;
    }
}


function show_pass() {
    var pass = document.getElementById('login_pass');

    if (pass.type == "password") {
        pass.type = "text";
    }
    else {
        pass.type = "password";
    }

}

function show_message(msg){
    btn.disabled = true;
    message.style.animation = "topbot .5s ease-in-out";
    message.style.display = "block";
    message_placeholder.innerHTML = msg;
}

function disable_message(){
    message.style.animation = "none";
    message.style.display = "none";
    btn.disabled = false;
}