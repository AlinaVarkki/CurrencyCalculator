'use strict';

class View{

    getAllNumericButtons(){
        let elements = document.getElementsByName( 'numberButton');
        return elements;
    }

    setSelectionToSpecificIndex(field, value){
        document.getElementById(field).selectedIndex = value;
    }

    getValueById(id){
        return document.getElementById(id).value;
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

    displayValueToField(field, value){
        document.getElementById(field).value = value;
    }

    getWantedAmountFieldId(){
        return 'wantedAmount';
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

    getBankFeeId(){
        return 'bankFeeSelector';
    }

    getIdOfCurrentlySelectedOption(field){
        return document.getElementById(field).selectedIndex;
    }


}