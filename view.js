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

    displayValueToField(field, value){
        document.getElementById(field).value = value;
    }

    changeFlag(field, currValue) {
        document.getElementById(field).src = "resources/flags/" + currValue +".png";
    }

    getFromFlagImageId(){
        return "fromFlag";
    }

    getToFlagImageId(){
        return "toFlag";
    }

    getWantedAmountFieldId(){
        return 'wantedAmount';
    }

    getResultFieldId(){
        return 'result';
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

    getArrowsId(){
        return 'arrows';
    }

    getIdOfCurrentlySelectedOption(field){
        return document.getElementById(field).selectedIndex;
    }

}