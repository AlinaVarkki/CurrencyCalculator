'use strict';

class Model{

    constructor() {
        this.poundRates = {Euro: 1.13, Zloty: 5.12};
        this.currentAmount = "";
        this.ans = "";
        this.setStartingCurrency("Pound");
        this.setGoalCurrency("Euro");
        this.setBankFee(0);
    }

    setBankFee(bankFee){
        this.bankFee = bankFee;
        // console.log(bankFee);
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
        //first convert to pound if not yet pounds
        if(this.startingCurrency !== 'Pound'){
            if(this.startingCurrency === 'Euro'){
                this.currentAmount = this.currentAmount / this.poundRates.Euro;
            }else{
                this.currentAmount = this.currentAmount / this.poundRates.Zloty;
            }
        }

        if(this.goalCurrency === 'Euro'){
            this.ans = this.currentAmount * this.poundRates.Euro;
        }
        if(this.goalCurrency === 'Zloty'){
            this.ans = this.currentAmount * this.poundRates.Zloty;
        }
        if(this.goalCurrency === 'Pound'){
            this.ans = this.currentAmount;
        }

        this.fee = this.ans * this.bankFee / 100;
        this.ans = parseFloat(this.ans) + parseFloat(this.fee);

        return this.ans;
    }
}