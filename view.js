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

    openSideMenu() {
        document.getElementById('left-panel').style.width = '35%';
        document.getElementById("left-panel").style.opacity = "100";
        document.getElementById('left-panel').style.overflow = 'visible';
        document.getElementById('right-panel').style.width = '60%';
        document.getElementById('right-panel').style.overflow = 'visible';
        document.getElementById('menuMain').style.visibility = 'hidden';
    }

    switchMode() {
        let theme = document.getElementById("theme");
        if (theme.getAttribute("href") === "light.css") {
            this.setDarkTheme();
        } else {
            this.setLightTheme();
        }
    }

    setTheme(theme){
        if(theme === 'dark.css'){
            this.setDarkTheme();
        }else{
            this.setLightTheme();
        }
    }

    setDarkTheme(){
        document.getElementById("theme").href = "dark.css";
        localStorage.theme ="dark.css";
        document.getElementById("menu").src = "resources/closeDark.JPG";
        document.getElementById("menuMain").src = "resources/menuIconDark.JPG";
        document.getElementById("switchMode").innerHTML = "Light Mode ☀";
    }

    setLightTheme(){
        document.getElementById("theme").href = "light.css";
        localStorage.theme ="light.css";
        document.getElementById("menu").src = "resources/close.JPG";
        document.getElementById("menuMain").src = "resources/menuIcon.JPG";
        document.getElementById("switchMode").innerHTML  = "Dark Mode 🌙";
    }

    getMenuTogglerId() {
        return 'menu';
    }

    getOpenMenuTogglerId() {
        return 'menuMain';
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

    getSwitchModeButtonId() {
        return 'switchMode';
    }
}