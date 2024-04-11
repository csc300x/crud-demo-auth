"use strict";
(function () {

    window.addEventListener("load", init);
    function init() {
        refreshTable();
    }

    let newButton = document.getElementById("new-product-btn");
    newButton.addEventListener("click", function () {
        id("form-popup").style.display = "block";
    });
    let updateButton = document.getElementById("update-product-btn");
    updateButton.addEventListener("click", function () {
        id("update-form-popup").style.display = "block";
    });


    let saveButton = document.getElementById("save-product");
    saveButton.addEventListener("click", function (e) {
        e.preventDefault();
        submitForm();
    });
    let updateSaveButton = document.getElementById("update-save-product");
    updateSaveButton.addEventListener("click", function (e) {
        e.preventDefault();
        let id=e.currentTarget.value;
        submitUpdateForm(id);
    });


    let closeButton = document.getElementById("cancel-btn");
    closeButton.addEventListener("click", function (e) {
        id("form-container").reset();
        id("form-popup").style.display = "none";
    });
    let closeUpdateButton = document.getElementById("update-cancel-btn");
    closeUpdateButton.addEventListener("click", function (e) {
        id("update-form-container").reset();
        id("update-form-popup").style.display = "none";
    });

    let deleteButton=document.getElementById("delete-product-btn");
    deleteButton.addEventListener("click", function (event) {
        let id=event.currentTarget.value;
        fetch("/menu/delete/"+id, {
            method: "DELETE",
        })
        .then(goHome)
            .catch(alert);
    });

    function submitForm() {
        let params = new FormData(document.getElementById("form-container")); // pass in entire form tag
        let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
        fetch("/menu/new", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: jsonBody,
        })
            .then(goHome)
            .catch(alert);
    }

    function submitUpdateForm(id) {
        let params = new FormData(document.getElementById("update-form-container")); // pass in entire form tag
        let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
        fetch("/menu/update/"+id, {
            method: "PUT",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: jsonBody,
        })
            .then(reload)
            .catch(alert);
    }

    function refreshTable() {
        id("form-popup").style.display = "none";
        id("form-container").reset();

        id("update-form-popup").style.display = "none";
        id("update-form-container").reset();
    }

    function goHome(){
        location.assign("/menu/all");
    }

    function reload() {
        location.reload();
    }

    function id(idName) {
        return document.getElementById(idName);
    }
})();