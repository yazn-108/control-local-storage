"use strict";
let
allButtons = document.querySelectorAll(".buttons button"),
results = document.querySelector(".results > span"),
keyInput = document.querySelector(".key-input"),
itemInput = document.querySelector(".item-input");
allButtons.forEach(span => {
    span.addEventListener("click", e => {
        e.target.classList.contains("check")?checkItem():"";
        e.target.classList.contains("add")?addItem():"";
        e.target.classList.contains("delete")?deleteItem():"";
        e.target.classList.contains("show")?showItems():"";
    });
});
function showMessage(){results.innerHTML = "Input Cant Be Empty";};
function checkItem() {
    if(keyInput.value !== ""){
        keyInput.style.borderColor = "white";
        if (localStorage.getItem(keyInput.value)) {
            results.innerHTML = `Found Local Storage Item Called <span>${keyInput.value}</span>`;
        }else{
            results.innerHTML = `No Local Storage Item With The Name <span>${keyInput.value}</span>`;
        };
    }else{
        keyInput.style.borderColor = "red";
        itemInput.style.borderColor = "white";
        keyInput.focus();
        showMessage();};
};
function addItem() {
    if (keyInput.value !== "" && itemInput.value !== "") {
        keyInput.style.borderColor = "white";
        itemInput.style.borderColor = "white";
        let exists = false;
        for (let [key, value] of Object.entries(localStorage)) {
            if(key === keyInput.value){exists = true};
        }; 
        if (exists !== true) {
            localStorage.setItem(keyInput.value,itemInput.value)
            results.innerHTML = `Local Storage Item <span>${itemInput.value}</span> Added`;
            keyInput.value = '';
            itemInput.value = '';
        }else{
            results.innerHTML = `Local Storage Item Called <span>${keyInput.value}</span> is exists`;
        }; 
    }else{
        keyInput.style.borderColor = "red";
        itemInput.style.borderColor = "red";
        keyInput.focus();
        showMessage();};
};
function deleteItem() {
    if (keyInput.value !== "") {
        keyInput.style.borderColor = "white";
        if (localStorage.getItem(keyInput.value)) {
            localStorage.removeItem(keyInput.value);
            results.innerHTML = `Local Storage Item <span>${keyInput.value}</span> deleted`;
            keyInput.value = '';
        }else{
            results.innerHTML = `No Local Storage Item With The Name <span>${keyInput.value}</span>`;
        };
    }else{
        keyInput.style.borderColor = "red";
        itemInput.style.borderColor = "white";
        keyInput.focus();
        showMessage();};
};
function showItems() {
    keyInput.style.borderColor = "white";
    itemInput.style.borderColor = "white";
    localStorage.removeItem("loglevel");
    results.innerHTML = '';
    if (localStorage.length) {
        for (let [key, value] of Object.entries(localStorage)) {
            results.innerHTML += `<div>${key}: <span>${value}</span></div>`;
        }
    }else{
        results.innerHTML = `Local Storage Is Empty`;
    };
};