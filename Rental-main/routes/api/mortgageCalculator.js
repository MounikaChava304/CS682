exports.mortgageCalculator = function(principle_amount, amortization_period, interest_rate, monthly_payment) {
    const fs = require('fs');
    var _ = require("underscore");
    var beginning_balance = principle_amount;
    var mortgageDataCalculations = [];
    var firstMortgageAmortization = 0;
    for (yr = 1; yr <= amortization_period; yr++) {
        for (month = 1; month <= 12; month++) {
            var interest = ((((1 + (interest_rate / 200)) ** 2) ** (1 / 12)) - 1) * (beginning_balance);
            var principle = (monthly_payment) - (interest);
            if (principle_amount <= 0) {
                var payment = 0;
            } else {
                payment = monthly_payment;
            }
            if ((beginning_balance - principle) <= 0) {
                var ending_balance = 0;
            } else {
                ending_balance = (beginning_balance) - (principle);
            }
            var mortgageData = {
                "Year": yr,
                "Month": month,
                "BeginningBalance": beginning_balance,
                "Payment": monthly_payment,
                "Principal": principle,
                "Interest": interest,
                "EndingBalance": ending_balance
            }
            mortgageDataCalculations.push(mortgageData);
            var data = JSON.stringify(mortgageDataCalculations);
            //console.log(data);
            // fs.writeFile('./mortgage.json', data, (err) => {
            //     if (err) {
            //         throw err;
            //     }
            // });
            beginning_balance = ending_balance;
            if(yr == 1 && month == 12){
              firstMortgageAmortization = ending_balance;
              //console.log(firstMortgageAmortization);
            }
        }
    }
    return firstMortgageAmortization;
  }
