'use strict';

const view = new View();
const model = new Model();
let currencyAndRateMap= new Map();
let currencies = [];

//handlers for all digits
let element = view.getAllNumericButtons();

for(let i = 0; i < element.length; i++){
    addNumericButtonListener(element[i].id);
}

function addNumericButtonListener(id){
    view.setUpButtonHandler(id,()=>{
        model.updateCurrentAmount(id);
        view.displayUpdatedValue(model.getCurrentAmount());
    });
}

//set currencies ans bank fee from local storage
let selectedHomeCurrency = localStorage.selectedCurrencyId || 0;
view.setSelectionToSpecificIndex(view.getStartingCurrencyId(), selectedHomeCurrency);
let selectedGoalCurrency = localStorage.goalCurrencyId || 0;
view.setSelectionToSpecificIndex(view.getGoalCurrencyId(), selectedGoalCurrency);
let selectedBankFee = localStorage.bankFee || 0;
view.setSelectionToSpecificIndex(view.getBankFeeId(), selectedBankFee);

model.setStartingCurrency(view.getValueById(view.getStartingCurrencyId()));
model.setGoalCurrency(view.getValueById(view.getGoalCurrencyId()));
model.setBankFee(view.getValueById(view.getBankFeeId()));

//handler for clear button
view.setUpButtonHandler(view.getClearButtonId(),() =>{
    model.clearCurrAmount();
    view.displayUpdatedValue(model.getCurrentAmount());
});

//handler for starting currency selector
view.setUpButtonHandler(view.getStartingCurrencyId(),() =>{
    model.setStartingCurrency(view.getValueById(view.getStartingCurrencyId()));
    localStorage.selectedCurrencyId = view.getIdOfCurrentlySelectedOption(view.getStartingCurrencyId());
});

//handler for goal currency selector
view.setUpButtonHandler(view.getGoalCurrencyId(),() =>{
    model.setGoalCurrency(view.getValueById(view.getStartingCurrencyId()));
    localStorage.goalCurrencyId = view.getIdOfCurrentlySelectedOption(view.getGoalCurrencyId());
});

//handler for equals button
view.setUpButtonHandler(view.getEqualsButtonId(),() =>{
    view.displayResultValue(model.getAnswer());
});

//handler for bank fee selector
view.setUpButtonHandler(view.getBankFeeId(), ()=>{
    model.setBankFee(view.getValueById(view.getBankFeeId()));
    localStorage.bankFee = view.getIdOfCurrentlySelectedOption(view.getBankFeeId());
});


updateCurrenciesAndRates();

function updateCurrenciesAndRates() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://devweb2020.cis.strath.ac.uk/~aes02112/ecbxml.php", true);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200)
        {
            let exchangeRates = request.responseXML;
            let cubes = exchangeRates.getElementsByTagName("Cube");
            for (let i = 0; i < cubes.length; i++) {
                let currency = cubes[i].getAttribute("currency");
                let rate = cubes[i].getAttribute("rate");
                if (currency !== null) {
                    currencyAndRateMap.set(currency, rate);
                    // console.log(currency);
                    currencies.push(currency.toString());

                    let newCurrency = new Option(currency, currency);
                    document.getElementById("startingCurrency").add(newCurrency, undefined);
                }
            }
        }
    };
    request.send(null);

    console.log(currencies[5]);
    console.log(currencyAndRateMap);
    console.log(currencies);
}

//add option currencies
for(let i = 0; i < currencies.length; i++){
    let newCurrency = new Option(currencies[i], currencies[i]);
    document.getElementById("startingCurrency").add(newCurrency, undefined);
}

let newCurrency1 = new Option(currencies[0], currencies[0]);
document.getElementById("startingCurrency").add(newCurrency1, undefined);
console.log(currencies[5]);


let newCurrency = new Option("currencies[i]", "currencies[i]");
document.getElementById("goalCurrency").add(newCurrency, undefined);