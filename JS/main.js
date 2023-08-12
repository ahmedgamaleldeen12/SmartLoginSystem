"use strict"
//Declare all variables to make it easy control HTML elements during writing Code
// ====================For SignUP ====================
let nameInputSignUp = document.getElementById("nameInputSignUp");
let emailInputSignUp = document.getElementById("emailInputSignUp");
let passInputSignUp = document.getElementById("passInputSignUp");
// ====================For LogIn====================
let emailInputLogIn = document.getElementById("emailInputLogIn");
let passInputLogIn = document.getElementById("passInputLogIn");

let errorSpan = document.getElementById("error");
let inCorrectSpan = document.getElementById("inCorrect");

let dataBase = []; //the main array to store my data

//
let urlParts = location.pathname.split('/');
let baseURL = '';
for(let i = 0 ; i < urlParts.length - 1 ; i++)
{
    baseURL +=  urlParts[i] + '/';
}

console.log(baseURL);

//make sure that i will lost my data in case reloading site 
if(localStorage.getItem("users") == null)
{
    dataBase = [];
}
else
{
    dataBase = JSON.parse(localStorage.getItem("users"));
}
// ====================Functions====================
//This Function makes sure that All inputs has values in (SignUp Page Only)
function isEmpty()
{
    if(nameInputSignUp.value == "" || emailInputSignUp.value == "" || passInputSignUp.value == "") 
    {
        return true;
    }
    else
    {
        return false;
    }
}
//
function isLogInInputsEmpty()
{
    if(emailInputLogIn.value == "" || passInputLogIn.value == "") 
    {
        return true;
    }
    else
    {
        return false;
    }
}
//this function makes sure that emailInput value is existed or not (SignUp Page only)
function isEmailExisted(emailValue){
    for(let i = 0 ; i < dataBase.length ; i++)
    {
        if(emailValue == dataBase[i].email)
        {
            return true;
        }
    }
    
}
function matchingData(email,pass){
    for(let i = 0 ; i < dataBase.length ; i++)
    {
        if(dataBase[i].email == email && dataBase[i].passInput == pass)
        {
            localStorage.setItem("sessionsName",dataBase[i].name)
            return true;
        }
    }
}


//====================Events on Buttons====================
//====================SignUp Button====================
function signUp()
{
    if(isEmpty()){
        errorSpan.innerHTML = '<span class="text-danger m-3">All inputs is required</span>';
        return false // to prevent complete code functionality
    }    
    let user = {
        name : nameInputSignUp.value,
        email : emailInputSignUp.value,
        passInput : passInputSignUp.value
    };
    if(dataBase.length == 0)
    {
        dataBase.push(user);
        localStorage.setItem("users",JSON.stringify(dataBase));
        errorSpan.innerHTML = '<p id="error" class="text-success" >Succes</p>';
        nameInputSignUp.value = "";
        emailInputSignUp.value = "";
        passInputSignUp.value = "";
        return true; //to avoid store same data twice
    }
    let email = emailInputSignUp.value;
    if(isEmailExisted(email))
    {
        errorSpan.innerHTML = '<span class="text-danger m-3">Already Exited</span>';
        
    }
    else{
        dataBase.push(user);
        localStorage.setItem("users",JSON.stringify(dataBase));
        errorSpan.innerHTML = '<p id="error" class="text-success" >Succes</p>';
        nameInputSignUp.value = "";
        emailInputSignUp.value = "";
        passInputSignUp.value = "";
    }
}
//====================LogIn Button====================
function logIn()
{
    if(isLogInInputsEmpty())
    {
        inCorrectSpan.innerHTML = '<span class="text-danger m-3">All inputs is required</span>';
        return false;
    }
    let email = emailInputLogIn.value;
    let password = passInputLogIn.value;
    if(matchingData(email,password))
    {
        location.replace(baseURL + 'home.html');
        baseURL = '';
    }
    else
    {
        inCorrectSpan.innerHTML = `<span class="text-danger m-3">Incorrect Emial or Password</span>`;
    }
}
let username = localStorage.getItem('sessionsName');
if (username) {
    document.getElementById('userName').innerHTML = "Welcome " + username
}
//====================Logout Button====================
function logout() {
    localStorage.removeItem('sessionName');
}

