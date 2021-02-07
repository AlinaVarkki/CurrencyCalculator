'use strict';

class Model{

    constructor() {
        this.currentAmount = "";
        this.ans = "";
        this.currencyAndRateMap = new Map();
    }

    setRatesMap(currencyAndRateMap){
        this.currencyAndRateMap = currencyAndRateMap;
    }

    setBankFee(bankFee){
        this.bankFee = bankFee;
    }

    setStartingCurrency(startingCurrency){
        this.startingCurrency = startingCurrency;
    }

    setGoalCurrency(goalCurrency){
        this.goalCurrency = goalCurrency;
    }

    updateCurrentAmount(value){
        this.currentAmount = this.currentAmount + value;
    }

    getCurrentAmount(){
        return this.currentAmount;
    }

    clearCurrAmount(){
        this.currentAmount = "";
    }

    getAnswer(){
        this.ans = parseFloat(this.currencyAndRateMap.get(this.goalCurrency)) / parseFloat(this.currencyAndRateMap.get(this.startingCurrency)) * parseFloat(this.currentAmount);
        this.fee = parseFloat(this.ans) * parseFloat(this.bankFee) / 100;
        this.ans = parseFloat(this.ans) + parseFloat(this.fee);

        return this.ans;
    }
}