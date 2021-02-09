'use strict';

class View {

    constructor() {
    }

    getAllNumericButtons() {
        return document.getElementsByName('numberButton');
    }

    setSelectionToSpecificIndex(field, value) {
        document.getElementById(field).selectedIndex = value;
    }

    getValueById(id) {
        return document.getElementById(id).value;
    }

    setUpButtonHandler(id, handler) {
        document.getElementById(id).addEventListener("click", handler);
    }

    setUpDropdownHandler(id, handler) {
        document.getElementById(id).addEventListener("change", handler);
    }

    displayValueToField(field, value) {
        document.getElementById(field).innerHTML = value;
    }

    changeFlag(field, currValue) {
        document.getElementById(field).src = "resources/flags/" + currValue + ".png";
    }

    getIdOfCurrentlySelectedOption(field) {
        return document.getElementById(field).selectedIndex;
    }

    closeSideMenu() {
        document.getElementById('left-panel').style.width = '0%';
        document.getElementById("left-panel").style.opacity = "0";
        document.getElementById('left-panel').style.overflow = 'hidden';
        document.getElementById('right-panel').style.width = '100%';
        document.getElementById('right-panel').style.overflow = 'hidden';
        document.getElementById('menuMain').style.visibility = 'visible';
    }

    openSideMenu(){
        document.getElementById('left-panel').style.width = '35%';
        document.getElementById("left-panel").style.opacity = "100";
        document.getElementById('left-panel').style.overflow = 'visible';
        document.getElementById('right-panel').style.width = '60%';
        document.getElementById('right-panel').style.overflow = 'visible';
        document.getElementById('menuMain').style.visibility = 'hidden';
    }

    getMenuTogglerId() {
        return'menu';
    }

    getOpenMenuTogglerId() {
        return'menuMain';
    }

    getFromFlagImageId() {
        return "fromFlag";
    }

    getToFlagImageId() {
        return "toFlag";
    }

    getWantedAmountFieldId() {
        return 'wantedAmount';
    }

    getResultFieldId() {
        return 'result';
    }

    getEqualsButtonId() {
        return 'Equals';
    }

    getClearButtonId() {
        return 'ClearButton';
    }

    getStartingCurrencyId() {
        return 'startingCurrency';
    }

    getGoalCurrencyId() {
        return 'goalCurrency';
    }

    getBankFeeId() {
        return 'bankFeeSelector';
    }

    getArrowsId() {
        return 'arrows';
    }

}