'use strict';

const view = new View();
const model = new Model();

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

//set currencies from local storage
let selectedHomeCurrency = localStorage.selectedCurrencyId || 0;
view.setCurrency(view.getStartingCurrencyId(), selectedHomeCurrency);
let selectedGoalCurrency = localStorage.goalCurrencyId || 0;
view.setCurrency(view.getGoalCurrencyId(), selectedGoalCurrency);

model.setStartingCurrency(view.getCurrency(view.getStartingCurrencyId()));
model.setGoalCurrency(view.getCurrency(view.getGoalCurrencyId()));


//handler for clear button
view.setUpButtonHandler(view.getClearButtonId(),() =>{
    model.clearCurrAmount();
    view.displayUpdatedValue(model.getCurrentAmount());
});

//handler for starting currency selector
view.setUpButtonHandler(view.getStartingCurrencyId(),() =>{
    model.setStartingCurrency(view.getCurrency(view.getStartingCurrencyId()));
    localStorage.selectedCurrencyId = view.getIdOfCurrentlySelectedOption(view.getStartingCurrencyId());
});

//handler for goal currency selector
view.setUpButtonHandler(view.getGoalCurrencyId(),() =>{
    model.setGoalCurrency(view.getCurrency(view.getStartingCurrencyId()));
    localStorage.goalCurrencyId = view.getIdOfCurrentlySelectedOption(view.getGoalCurrencyId());
});

//handler for equals button
view.setUpButtonHandler(view.getEqualsButtonId(),() =>{
    view.displayResultValue(model.getAnswer());
});

