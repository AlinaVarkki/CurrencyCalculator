'use strict';

const view = new View();
const model = new Model();
let currencyAndRateMap = new Map();
currencyAndRateMap.set("EUR", 1.0);


checkDateAndUpdateValues();
addHandlers();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => {
                console.log('registered!!!', reg);
            }).catch(err => {
            console.log("failed", err);
        });
    });
}

function checkDateAndUpdateValues() {
    //check when the rates were updated last, if it is run for the first time or rates were updated over 24 hours ago, refresh the rates
    let lastUpdateTimestamp = localStorage.getItem("lastUpdatedTime");
    let currTimestamp = new Date().valueOf();
    let diffInHours = (currTimestamp - lastUpdateTimestamp) / 1000 / 60 / 60;
    let firstTime = lastUpdateTimestamp === null;
    if (lastUpdateTimestamp === null || diffInHours <= 24) {
        updateCurrenciesAndRates();
        //if the values are refreshed, change last visited to current
        localStorage.setItem("lastUpdatedTime", currTimestamp.toString());
    }

    if (!firstTime) {
        //get currencies/rates map from localStorage, if method to get rates from API was called it will execute after this and override these values
        currencyAndRateMap = new Map(JSON.parse(localStorage.currencyRateMap));
        addCurrencyOptions();
        setValuesFromLocalStorage();
        model.setRatesMap(currencyAndRateMap);
    }
}

function updateCurrenciesAndRates() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://devweb2020.cis.strath.ac.uk/~aes02112/ecbxml.php", true);

    //if there is no network and this method is called, it never gets inside and cached values are left inside the map
    request.addEventListener("load", function () {

        let exchangeRates = request.responseXML;
        let cubes = exchangeRates.getElementsByTagName("Cube");
        for (let i = 0; i < cubes.length; i++) {
            let currency = cubes[i].getAttribute("currency");
            let rate = cubes[i].getAttribute("rate");
            if (currency !== null) {
                currencyAndRateMap.set(currency, rate);
            }
        }
        localStorage.currencyRateMap = JSON.stringify(Array.from(currencyAndRateMap.entries()));

        currencyAndRateMap = new Map(JSON.parse(localStorage.currencyRateMap));
        addCurrencyOptions();
        setValuesFromLocalStorage();
        model.setRatesMap(currencyAndRateMap);
        
    });
    request.send(null);
}

//handlers for all digits
function addHandlers() {


    let element = view.getAllNumericButtons();
    for (let i = 0; i < element.length; i++) {
        addNumericButtonListener(element[i].id);
    }
    //handler for clear button
    view.setUpButtonHandler(view.getClearButtonId(), () => {
        model.clearCurrAmount();
        view.displayValueToField(view.getResultFieldId(), model.getCurrentAmount());
        view.displayValueToField(view.getWantedAmountFieldId(), model.getCurrentAmount());
    });

    //handler for starting currency selector
    view.setUpDropdownHandler(view.getStartingCurrencyId(), () => {
        startingCurrencyChange();
        equalButtonPressed();
    });

    //handler for goal currency selector
    view.setUpDropdownHandler(view.getGoalCurrencyId(), () => {
        goalCurrencyChange();
        equalButtonPressed();
    });

    //handler for equals button
    view.setUpButtonHandler(view.getEqualsButtonId(), () => {
        equalButtonPressed();
        // model.clearCurrAmount();
    });

    //menu close handler
    view.setUpButtonHandler(view.getMenuTogglerId(), () => {
        view.closeSideMenu();
    });

    //menu open handler
    view.setUpButtonHandler(view.getOpenMenuTogglerId(), () => {
        view.openSideMenu();
    });

    //handler for bank fee selector
    view.setUpDropdownHandler(view.getBankFeeId(), () => {
        model.setBankFee(view.getValueById(view.getBankFeeId()));
        localStorage.bankFee = view.getIdOfCurrentlySelectedOption(view.getBankFeeId());
        equalButtonPressed();
    });

    //reverse currencies from/to
    view.setUpButtonHandler(view.getArrowsId(), () => {

        let startingCurrencyId = view.getIdOfCurrentlySelectedOption(view.getStartingCurrencyId());
        let goalCurrencyId = view.getIdOfCurrentlySelectedOption(view.getGoalCurrencyId());

        //switch value of select boxes
        view.setSelectionToSpecificIndex(view.getStartingCurrencyId(), goalCurrencyId);
        view.setSelectionToSpecificIndex(view.getGoalCurrencyId(), startingCurrencyId);
        startingCurrencyChange();
        goalCurrencyChange();

        equalButtonPressed();
    });

}

function equalButtonPressed() {
    let answer = model.getAnswer();
    if (!isNaN(answer)) {
        view.displayValueToField(view.getWantedAmountFieldId(), model.getCurrentAmount() + " " + view.getValueById(view.getStartingCurrencyId()));
        view.displayValueToField(view.getResultFieldId(), model.getAnswer() + " " + view.getValueById(view.getGoalCurrencyId()));
    } else {
        model.clearCurrAmount();
        view.displayValueToField(view.getResultFieldId(), model.getCurrentAmount());
    }
}

function startingCurrencyChange() {
    model.setStartingCurrency(view.getValueById(view.getStartingCurrencyId()));
    localStorage.selectedCurrencyId = view.getIdOfCurrentlySelectedOption(view.getStartingCurrencyId());
    view.changeFlag(view.getFromFlagImageId(), view.getValueById(view.getStartingCurrencyId()));
}

function goalCurrencyChange() {
    model.setGoalCurrency(view.getValueById(view.getGoalCurrencyId()));
    localStorage.goalCurrencyId = view.getIdOfCurrentlySelectedOption(view.getGoalCurrencyId());
    view.changeFlag(view.getToFlagImageId(), view.getValueById(view.getGoalCurrencyId()));
}

function addNumericButtonListener(id) {
    view.setUpButtonHandler(id, () => {
        model.updateCurrentAmount(id);
        view.displayValueToField(view.getResultFieldId(), model.getCurrentAmount());
    });
}

function addCurrencyOptions() {

    let startingCurrField = document.getElementById(view.getStartingCurrencyId());
    let goalCurrField = document.getElementById(view.getGoalCurrencyId());
    for (const [currency, rate] of currencyAndRateMap.entries()) {
        startingCurrField.options[startingCurrField.options.length] = new Option(currency, currency);
        goalCurrField.options[goalCurrField.options.length] = new Option(currency, currency);
    }

}

function setValuesFromLocalStorage() {

    let selectedHomeCurrency = localStorage.selectedCurrencyId || 6;
    let selectedGoalCurrency = localStorage.goalCurrencyId || 0;
    let selectedBankFee = localStorage.bankFee || 0;

    view.setSelectionToSpecificIndex(view.getStartingCurrencyId(), selectedHomeCurrency);
    view.setSelectionToSpecificIndex(view.getGoalCurrencyId(), selectedGoalCurrency);
    view.setSelectionToSpecificIndex(view.getBankFeeId(), selectedBankFee);

    model.setStartingCurrency(view.getValueById(view.getStartingCurrencyId()));
    model.setGoalCurrency(view.getValueById(view.getGoalCurrencyId()));
    model.setBankFee(view.getValueById(view.getBankFeeId()));

    updateFlags();
}

function updateFlags() {
    view.changeFlag(view.getFromFlagImageId(), view.getValueById(view.getStartingCurrencyId()));
    view.changeFlag(view.getToFlagImageId(), view.getValueById(view.getGoalCurrencyId()));
}