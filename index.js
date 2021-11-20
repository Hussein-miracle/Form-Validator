"use strict";

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");



//shows input success message
const showSuccess = function(handler){
  handler.closest(".form-control").classList.add("success");

}

//shows input error message
const showError = function(handler, message){

  handler.closest(".form-control").classList.add("error");
  handler.closest(".form-control").insertAdjacentHTML("beforeend",message);

}

///validate email
function checkEmail (input){
  const checker = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  if(!checker.test(input.value) ){

    showError(input , `<small class="error">Email is not valid!</small>`)
  }else{
    showSuccess(input)
  }
}

function getFieldName(input){
  return `${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`
}

const checkRequiredInput = function(inputArr){
  inputArr.forEach(function(input){

    if(input.value.trim() === ""){
      showError(input , `<small class="error"> ${getFieldName(input)}  field is required! </small>`);
    }else{
      showSuccess(input);
    }
  })

}

//check length
function checkLength(input ,min , max){
  if(input.value.length < min){
    showError(input , `<small class="error">${getFieldName(input)} must be at least ${min} character </small>`)
  }else if (input.value.length > max){
    showError(input , `<small class="error">${getFieldName(input)} must be at most or lower than ${max} character</small>`)
  }else{
    showSuccess(input)
  }
}

//check password match

function checkPasswordsMatch(firstPassword,secondPassword){
  if(firstPassword.value.length !== secondPassword.value.length && firstPassword.value !== secondPassword.value){
    showError(secondPassword , `<small class="error">Passwords do not match!</small>`)
  }
}

//gets fieldname

form.addEventListener("submit",function(e){
    e.preventDefault();

    checkRequiredInput([username,email,passwordConfirm,password]);

    checkLength(username,3,15);
    checkLength(password,6,25);
    checkEmail(email);
    checkPasswordsMatch(password, passwordConfirm);

})

