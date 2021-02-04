'use strict';

const view = new View();
const model = new Model();
let currencyAndRateMap = new Map();
currencyAndRateMap.set("EUR", 1.0);


checkDateAndUpdateValues();
addHandlers();

function checkDateAndUpdateValues(){
    //check when the rates were updated last, if it is run for the first time or rates were updated over 24 hours ago, refresh the rates
    let lastUpdateTimestamp = localStorage.getItem("lastUpdatedTime");
    let currTimestamp = new Date().valueOf();

    let diffInHours = (currTimestamp - lastUpdateTimestamp)/1000/60/60;
    if(lastUpdateTimestamp === null || diffInHours >= 24){
        console.log("updated values");
        updateCurrenciesAndRates();
        //if the values are refreshed, change last visited to current
        localStorage.setItem("lastUpdatedTime", currTimestamp.toString());

    }else{
        console.log("got map from storage");
       //get currencies/rates map from localStorage
        currencyAndRateMap =  new Map(JSON.parse(localStorage.currencyRateMap));
        addCurrencyOptions();
        setValuesFromLocalStorage();
        model.setRatesMap(currencyAndRateMap);
    }
}

function addHandlers(){
//handlers for all digits
    let element = view.getAllNumericButtons();
    for(let i = 0; i < element.length; i++){
        addNumericButtonListener(element[i].id);
    }
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
}


function addNumericButtonListener(id){
    view.setUpButtonHandler(id,()=>{
        model.updateCurrentAmount(id);
        view.displayValueToField(view.getWantedAmountFieldId(), model.getCurrentAmount());
    });
}



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
                }
            }
            localStorage.currencyRateMap = JSON.stringify(Array.from(currencyAndRateMap.entries()));
            addCurrencyOptions();
            setValuesFromLocalStorage();
            model.setRatesMap(currencyAndRateMap);
    });
    request.send(null);
}

function addCurrencyOptions(){

    let startingCurrField = document.getElementById(view.getStartingCurrencyId());
    let goalCurrField = document.getElementById(view.getGoalCurrencyId());
    for(const [currency, rate] of currencyAndRateMap.entries()){
        startingCurrField.options[startingCurrField.options.length] = new Option(currency, currency);
        goalCurrField.options[goalCurrField.options.length] = new Option(currency, currency);
    }

}

function setValuesFromLocalStorage(){

    let selectedHomeCurrency = localStorage.selectedCurrencyId || 6;
    let selectedGoalCurrency = localStorage.goalCurrencyId || 0;
    let selectedBankFee = localStorage.bankFee || 0;

    view.setSelectionToSpecificIndex(view.getStartingCurrencyId(), selectedHomeCurrency);
    view.setSelectionToSpecificIndex(view.getGoalCurrencyId(), selectedGoalCurrency);
    view.setSelectionToSpecificIndex(view.getBankFeeId(), selectedBankFee);

    model.setStartingCurrency(view.getValueById(view.getStartingCurrencyId()));
    model.setGoalCurrency(view.getValueById(view.getGoalCurrencyId()));
    model.setBankFee(view.getValueById(view.getBankFeeId()));

}