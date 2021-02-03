'use strict';

const view = new View();
const model = new Model();
let currencyAndRateMap = new Map();
currencyAndRateMap.set("EUR", 1.0);
let currencies = [];
let n = 0;

updateCurrenciesAndRates();

checkDateAndUpdateIfNeeded();

function checkDateAndUpdateIfNeeded(){
    //check when the application was run last, if it is run for the first time or it was over 24 hours ago, refresh the currencies
    let lastUseTimestamp = JSON.parse(localStorage.getItem("lastUseTimeStamp"));
    let currTimestamp = new Date().valueOf();

    let diff = currTimestamp - lastUseTimestamp;
    if(lastUseTimestamp === null || diff/1000/60/60 <= 24){
        localStorage.setItem("lastUseTimeStamp", JSON.stringify(currTimestamp));

    }
}


//handlers for all digits
let element = view.getAllNumericButtons();
for(let i = 0; i < element.length; i++){
    addNumericButtonListener(element[i].id);
}

function addNumericButtonListener(id){
    view.setUpButtonHandler(id,()=>{
        model.updateCurrentAmount(id);
        view.displayValueToField(view.getWantedAmountFieldId(), model.getCurrentAmount());
    });
}

//set bank fee from local storage
let selectedBankFee = localStorage.bankFee || 0;
view.setSelectionToSpecificIndex(view.getBankFeeId(), selectedBankFee);
model.setBankFee(view.getValueById(view.getBankFeeId()));

//handler for clear button
view.setUpButtonHandler(view.getClearButtonId(),() =>{
    model.clearCurrAmount();
    view.displayValueToField(view.getWantedAmountFieldId(), model.getCurrentAmount());
});

//handler for starting currency selector
view.setUpButtonHandler(view.getStartingCurrencyId(),() =>{
    model.setStartingCurrency(view.getValueById(view.getStartingCurrencyId()));
    localStorage.selectedCurrencyId = view.getIdOfCurrentlySelectedOption(view.getStartingCurrencyId());
});

//handler for goal currency selector
view.setUpButtonHandler(view.getGoalCurrencyId(),() =>{
    model.setGoalCurrency(view.getValueById(view.getGoalCurrencyId()));
    localStorage.goalCurrencyId = view.getIdOfCurrentlySelectedOption(view.getGoalCurrencyId());
});

//handler for equals button
view.setUpButtonHandler(view.getEqualsButtonId(),() =>{
    let answer = model.getAnswer();
    if(!isNaN(answer)){
        view.displayValueToField(view.getResultFieldId(), model.getAnswer());
    }else{
        model.clearCurrAmount();
        view.displayValueToField(view.getResultFieldId(), model.getCurrentAmount());
    }
});

//handler for bank fee selector
view.setUpButtonHandler(view.getBankFeeId(), ()=>{
    model.setBankFee(view.getValueById(view.getBankFeeId()));
    localStorage.bankFee = view.getIdOfCurrentlySelectedOption(view.getBankFeeId());
});

function updateCurrenciesAndRates() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://devweb2020.cis.strath.ac.uk/~aes02112/ecbxml.php", true);

    request.addEventListener("load", function () {
            let exchangeRates = request.responseXML;
            let cubes = exchangeRates.getElementsByTagName("Cube");
            for (let i = 0; i < cubes.length; i++) {
                let currency = cubes[i].getAttribute("currency");
                let rate = cubes[i].getAttribute("rate");
                if (currency !== null) {
                    currencyAndRateMap.set(currency, rate);
                    currencies.push(currency);
                    let startingCurrField = document.getElementById(view.getStartingCurrencyId());
                    startingCurrField.options[startingCurrField.options.length] = new Option(currency, currency);
                    let goalCurrField = document.getElementById(view.getGoalCurrencyId());
                    goalCurrField.options[goalCurrField.options.length] = new Option(currency, currency);
                }
            }
            setCurrenciesFromLocalStorage();
    });
    request.send(null);
}

function setCurrenciesFromLocalStorage(){
    //set currencies ans bank fee from local storage
    let selectedHomeCurrency = localStorage.selectedCurrencyId || 6;
    view.setSelectionToSpecificIndex(view.getStartingCurrencyId(), selectedHomeCurrency);
    let selectedGoalCurrency = localStorage.goalCurrencyId || 0;
    view.setSelectionToSpecificIndex(view.getGoalCurrencyId(), selectedGoalCurrency);

    model.setStartingCurrency(view.getValueById(view.getStartingCurrencyId()));
    model.setGoalCurrency(view.getValueById(view.getGoalCurrencyId()));

    model.setRatesMap(currencyAndRateMap);
}