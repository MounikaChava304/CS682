exports.financing = function(principle_borrowed, interest_rate, amortization_period, chmc_fee_percent) {
    var total_principle = principle_borrowed * (1 + chmc_fee_percent);
    var total_monthly_payment = total_principle * ((((1 + (interest_rate / 200)) ** (1 / 6)) - 1) / (1 - (((1 + (interest_rate / 200)) ** (1 / 6)) ** (amortization_period * -12))));
    return total_monthly_payment;
}

exports.rpp = function(offerPrice, repairs, repairsContingency, lenderFee, brokerFee, environmentals, inspections, appraisals, misc, transferTax, legal) {
    var rpp = offerPrice + repairs + repairsContingency + lenderFee + brokerFee + environmentals + inspections + appraisals + misc + transferTax + legal;
    return rpp;
}

exports.closingCost = function(realPurchasePrice, principle_borrowed) {
    var closingCost = (realPurchasePrice) - (principle_borrowed);
    return closingCost;
}

exports.totalIncome = function(grossrents, parking, storage, laundryVending, other) {
    var totalIncome = grossrents + parking + storage + laundryVending + other;
    return totalIncome;
}

exports.vacancyLoss = function(totalIncome, vacancyRate) {
    var vacancyLoss = (totalIncome) * (vacancyRate / 100);
    return vacancyLoss;
}

exports.effectiveGrossIncome = function(totalIncome, vacancyLoss) {
    var effectiveGrossIncome = (totalIncome) - (vacancyLoss);
    return effectiveGrossIncome;
}

exports.advertizing = function(numberOfUnits, vacancyRate, advertizingCostPerVacancy) {
    var advertizing = (numberOfUnits * vacancyRate * 12 * advertizingCostPerVacancy) / (2 * 100);
    return advertizing;
}

exports.pestControl = function(numberOfUnits) {
    if (numberOfUnits < 2) {
        var pestControl = 140 * numberOfUnits;
    } else {
        pestControl = 70 * numberOfUnits;
    }
    return pestControl;
}

exports.security = function(numberOfUnits, vacancyRate) {
    var security = (numberOfUnits * 12 * vacancyRate * 50) / (1.5 * 100);
    return security;
}

exports.evictions = function(numberOfUnits, vacancyRate) {
    var evictionCost = (numberOfUnits * vacancyRate * 12 * 1000) / (2 * 100 * 10);
    return evictionCost;
}

exports.annualOperatingExpenses = function(propertyTax, insurance, repairsExpense, electricity, gas, lawnSnowMaintenance, waterSewer, cable, management, caretaking, advertizing, associationFee, pestControl, security, trashRemoval, commonAreaMaintenance, capitalImprovements, accounting, badDebts, evictions) {
    var totalOperatingExpenses = propertyTax + insurance + repairsExpense + electricity + gas + lawnSnowMaintenance + waterSewer + cable + management + caretaking + advertizing + associationFee + pestControl + security + trashRemoval + commonAreaMaintenance + capitalImprovements + accounting + badDebts + evictions;
    return totalOperatingExpenses;
}

exports.netOperatingIncome = function(effectiveGrossIncome, totalExpenses) {
    var netOperatingIncome = effectiveGrossIncome - totalExpenses;
    return netOperatingIncome;
}

exports.cashrequiredToClose = function(closingCost, deposits) {
    var cashRequiredToClose = (closingCost) - (deposits);
    return cashRequiredToClose;
}

exports.totalCashRequired = function(deposits, proprationOfRents, cashRequiredToClose) {
    var totalCashRequired = (deposits + cashRequiredToClose) - (proprationOfRents);
    return totalCashRequired;
}

exports.debtServicingCosts = function(totalMonthlyPayment, otherMonthlyFinancingCost) {
    var debtServicingCosts = (-totalMonthlyPayment - otherMonthlyFinancingCost) * 12;
    return debtServicingCosts;
}

exports.annualProfitOrLoss = function(netOperatingIncome, debtServicingCosts) {
    var annualprofitOrLoss = netOperatingIncome + debtServicingCosts;
    return annualprofitOrLoss;
}

exports.monthlyProfitOrLoss = function(annualProfitOrLoss) {
    var monthlyProfitOrLoss = annualProfitOrLoss / 12;
    return monthlyProfitOrLoss;
}

exports.cashFlowPerUnitPerMonth = function(monthlyProfitOrLoss, numberOfUnits) {
    var cashFlowPerUnitPerMonth = monthlyProfitOrLoss / numberOfUnits;
    return cashFlowPerUnitPerMonth;
}

exports.mortgageLTV = function(principle_borrowed, fairMarketValue) {
    var mortgageLTV = (principle_borrowed / fairMarketValue) * 100;
    return mortgageLTV;
}

exports.mortgageLTPP = function(principle_borrowed, offerPrice) {
    var mortgageLTPP = (principle_borrowed / offerPrice) * 100;
    return mortgageLTPP;
}

exports.capRateOnPP = function(netOperatingIncome, offerPrice) {
    var capRateOnPP = (netOperatingIncome / offerPrice) * 100;
    return capRateOnPP;
}

exports.capRateOnFMV = function(netOperatingIncome, fairMarketValue) {
    var capRateOnFMV = (netOperatingIncome / fairMarketValue) * 100;
    return capRateOnFMV;
}

exports.averageRent = function(grossRents, numberOfUnits) {
    var averageRent = (grossRents / numberOfUnits) / 12;
    return averageRent;
}

exports.grm = function(offerPrice, grossRents) {
    var grm = offerPrice / grossRents;
    return grm;
}

exports.dcr = function(netOperatingIncome, debtServicingCosts) {
    if (-debtServicingCosts <= 0) {
        var dcr = "No Debt To Cover"
    } else {
        try {
            dcr = netOperatingIncome / -debtServicingCosts;
        } catch (err) {
            dcr = "Undefined";
        }
    }
    return dcr;
}

exports.cashOnCashROI = function(totalCashRequired, annualProfitOrLoss){
  if(totalCashRequired <= 0){
    var cashOnCashROI = "infinite";
  }else{
    cashOnCashROI = annualProfitOrLoss/totalCashRequired;
  }
  return cashOnCashROI;
}

exports.equityROI = function(principle_borrowed,firstMortgageAmortization,totalCashRequired){
    if(firstMortgageAmortization <= 0){
      var equityROI = "infinite";
    }else{
      equityROI = (((principle_borrowed) - (firstMortgageAmortization))/(totalCashRequired))*100;
    }
    return equityROI;
  }

exports.appreciationROI = function(fairMarketValue, annualAppreciationRate, totalCashRequired){
  if(totalCashRequired <= 0){
    var appreciationROI = "infinite";
  }else{
    appreciationROI = ((fairMarketValue*(1+(annualAppreciationRate)))-fairMarketValue)/Math.abs(totalCashRequired);
  }
  return appreciationROI;
}

exports.totalROI = function(cashOnCashROI,equityROI,appreciationROI,totalCashRequired){
  if(totalCashRequired <= 0){
    var totalROI = "infinite";
  }else{
    totalROI = cashOnCashROI+equityROI+appreciationROI;
  }
  return totalROI;
}

exports.forcedAppROI = function(fairMarketValue,realPurchasePrice,totalCashRequired){
  if(totalCashRequired <= 0){
    var forcedAppROI = "infinite";
  }else{
    forcedAppROI = (fairMarketValue - realPurchasePrice)/Math.abs(totalCashRequired);
  }
  return forcedAppROI;
}

exports.expenseToIncomeRatio = function(effectiveGrossIncome, totalExpenses) {
    var expenseToIncomeRatio = (totalExpenses / effectiveGrossIncome) * 100;
    return expenseToIncomeRatio;
}
