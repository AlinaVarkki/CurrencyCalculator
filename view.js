'use strict';

class View{

    getAllNumericButtons(){
        let elements = document.getElementsByName( 'numberButton');
        return elements;
    }

    setCurrency(field, value){
        document.getElementById(field).selectedIndex = value;
    }

    getCurrency(currencyId){
        return document.getElementById(currencyId).value;
    }

    setUpButtonHandler(id, handler){
        document.getElementById(id).addEventListener("click", handler);
    }

    displayUpdatedValue(value){
        document.getElementById('wantedAmount').value = value;
    }

    displayResultValue(value){
        document.getElementById('result').value = value;
    }

    getEqualsButtonId(){
        return 'Equals';
    }

    getClearButtonId(){
        return 'ClearButton';
    }

    getStartingCurrencyId(){
        return 'startingCurrency';
    }

    getGoalCurrencyId(){
        return 'goalCurrency';
    }

    getIdOfCurrentlySelectedOption(field){
        return document.getElementById(field).selectedIndex;
    }

}