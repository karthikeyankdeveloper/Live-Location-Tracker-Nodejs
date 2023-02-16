var btn = document.getElementById('signup_button');
var message = document.getElementById('message');
var message_placeholder = document.getElementById('message_placeholder');

function validate() {
    btn.disabled = true;
    var name = document.getElementById('signup_name');
    var email = document.getElementById('signup_email');
    var number = document.getElementById('signup_number');
    var pass = document.getElementById('signup_pass');
    var repass = document.getElementById('signup_repass');

    if (name.value == "" || email.value == "" || pass.value == "" || repass.value == "" ||number.value.valueOf() == "") {
        show_message("Fill All blank!");
        return false;
    }
    else if(number.value.valueOf().length != 10){
        show_message("Mobile Number should be 10 digit");
        return false;
    }
    else if (password_validator(pass.value) != 4) {
        show_message("Pass should contain 1 Special character(\'*\',\'#\',\'@\',\'!\',\'^\',\'&\''),1 Capital and Small letter and 1 Number");
        return false;
    }
    else if (pass.value.length < 8) {
        show_message("Password Length atleast 8");
        return false;
    }
    else if (pass.value != repass.value) {
        show_message("Password Not equal to Re-Password");
        return false;
    }
    else {
        return true;
    }
}

function password_validator(p) {
    var total = 0;
    if (p.includes("A") || p.includes("B") || p.includes("C") || p.includes("D") || p.includes("E") || p.includes("F") || p.includes("G") || p.includes("H") || p.includes("I") || p.includes("J") || p.includes("K") || p.includes("L") || p.includes("M") || p.includes("N") || p.includes("O") || p.includes("P") || p.includes("Q") || p.includes("R") || p.includes("S") || p.includes("T") || p.includes("U") || p.includes("V") || p.includes("W") || p.includes("X") || p.includes("Y") || p.includes("Z")) {
        total++;
    }

    if (p.includes("a") || p.includes("b") || p.includes("c") || p.includes("d") || p.includes("e") || p.includes("f") || p.includes("g") || p.includes("h") || p.includes("i") || p.includes("j") || p.includes("k") || p.includes("l") || p.includes("m") || p.includes("n") || p.includes("o") || p.includes("p") || p.includes("q") || p.includes("r") || p.includes("s") || p.includes("t") || p.includes("u") || p.includes("v") || p.includes("w") || p.includes("x") || p.includes("y") || p.includes("z")) {
        total++;
    }

    if (p.includes("1") || p.includes("2") || p.includes("3") || p.includes("4") || p.includes("5") || p.includes("6") || p.includes("7") || p.includes("8") || p.includes("9") || p.includes("0")) {
        total++;
    }

    if (p.includes("!") || p.includes("@") || p.includes("#") || p.includes("$") || p.includes("%") || p.includes("^") || p.includes("&") || p.includes("*") || p.includes("(") || p.includes(")") || p.includes("+")) {
        total++;
    }
    return total;
}

function show_pass() {
    var pass = document.getElementById('signup_pass');
    var repass = document.getElementById('signup_repass');

    if (pass.type == "password") {
        pass.type = "text";
        repass.type = "text";
    }
    else {
        pass.type = "password";
        repass.type = "password";
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