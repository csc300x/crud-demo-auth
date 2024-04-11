"use strict";
(function () {

    window.addEventListener("load", init);
    function init() {
        refreshTable();
    }

    let newButton = id("new-product-btn");
    newButton.addEventListener("click", function () {
        id("form-popup").style.display = "block";
    });

    let saveButton = id("save-product");
    saveButton.addEventListener("click", function (e) {
        e.preventDefault();
        submitForm();
    });

    let closeButton = id("cancel-btn");
    closeButton.addEventListener("click", function (e) {
        id("form-container").reset();
        id("form-popup").style.display = "none";
    });

    function submitForm() {
        let params = new FormData(document.getElementById("form-container")); // pass in entire form tag
        let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
        console.log("we tried to submit the form");
        fetch("/menu/new", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: jsonBody,
        })
            .then(reload)
           // .then(refreshTable)
            .catch(alert);
    }

    function refreshTable() {
        id("form-popup").style.display = "none";
        id("form-container").reset();

    }

    function reload() {
        location.reload();
    }


    function id(idName) {
        return document.getElementById(idName);
    }
})();