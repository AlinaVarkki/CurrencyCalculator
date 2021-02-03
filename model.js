'use strict';

class Model{

    constructor() {
        this.currentAmount = "";
        this.ans = "";
        this.currencyAndRateMap = new Map();
        this.setStartingCurrency("GBP");
        this.setGoalCurrency("EUR");
        this.setBankFee(0);
    }

    setRatesMap(currencyAndRateMap){
        this.currencyAndRateMap = currencyAndRateMap;
        console.log(currencyAndRateMap);
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
        console.log("starting rate " + parseFloat(this.currencyAndRateMap.get(this.startingCurrency)) + " starting currency " + this.startingCurrency);
        console.log("goal rate " +this.currencyAndRateMap.get(this.goalCurrency)  + " goal currency " + this.goalCurrency);
        console.log("requestedAmount " +parseFloat(this.currentAmount));
        this.fee = parseFloat(this.ans) * parseFloat(this.bankFee) / 100;
        this.ans = parseFloat(this.ans) + parseFloat(this.fee);

        return this.ans;
    }
}