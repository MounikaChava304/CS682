const express = require("express");
const router = express.Router();
var request = require("request");
var _ = require("underscore");
const config = require('./config.json');
const fs = require('fs');
const calculator = require('./calculator.js');
const mortgageCalculator = require('./mortgageCalculator.js');
const fileName = './property.json';
const file = require(fileName);
const Property = require("../../modal/Property.js");

//After User logs in, the dashboard display all the properties analysed by the user.
//Inputs required from the request-- userEmail

router.get("/dashboard", async(req, res) => {
    var userEmail = req.cookies.useremail;
    //console.log(userEmail);
    Property.find({
        UserEmail: userEmail
    }, function(err, properties) {
        if (err) {
            console.log(err);
        } else {
            var displayproperty = properties.toString();
            //console.log(displayproperty);
            res.send(displayproperty);
        }
    })
})

//when the user clicks on a particular property displayed in his/her dashboard, this router fetches the property by id.
//Inputs required from the request-- document id from the database record.

router.get("/rentalCalculator/:id", async(req, res) => {
    var id = req.params.id;
    Property.findById({
        _id: id
    }, function(err, property) {
        if (err) {
            console.log(err);
        } else {
            //console.log(property.toString());
            res.end(property.toString());
        }
    })
})

//When user enters address in the search bar, this methods does all the analysis and inserts record to the database.
// Inputs required from the request -- userEmail, City, State, Address Line.

router.post("/rentalCalculator", async(req, res) => {
    var city = req.body.city;
    var state = req.body.state;
    var addressLine = req.body.addressline;
    var userEmail = req.cookies.useremail;

    var options1 = {
        method: 'GET',
        url: 'https://realtor.p.rapidapi.com/properties/list-for-sale',
        qs: {
            sort: 'relevance',
            city: city,
            offset: '0',
            limit: '200',
            state_code: state
        },
        headers: {
            'x-rapidapi-host': config.RapidApiHost,
            'x-rapidapi-key': config.RapidApiKey,
            useQueryString: true
        }
    };

    request(options1, function(error, response, body) {
        if (error) throw new Error(error);
        var json = response.body;
        var values = JSON.parse(json);
        var listings = values.listings;
        var property = [];
        for (let i = 0; i < listings.length; i++) {
            if (listings[i].address_new.line == addressLine) {
                property.push(listings[i]);
            }
        }
        var property_id = property[0].property_id;
        var listing_id = property[0].listing_id;
        var address = property[0].address;

        var options2 = {
            method: 'GET',
            url: 'https://rapidapi.p.rapidapi.com/properties/detail',
            qs: {
                listing_id: listing_id,
                prop_status: 'for_sale',
                property_id: property_id
            },
            headers: {
                'x-rapidapi-host': config.RapidApiHost,
                'x-rapidapi-key': config.RapidApiKey,
                useQueryString: true
            }
        };

        request(options2, function(error, response, body) {
            if (error) throw new Error(error);
            var json = response.body;
            var values = JSON.parse(json);

            var market_price = values.listing.price;
            var unitInfo = _.where(values.listing.features, {
                'category': 'Multi-Unit Info'
            });
            if (unitInfo === undefined || unitInfo.length == 0) {
                var numberofUnits = 1;
            } else {
                var units = (unitInfo[0].text).toString();
                numberofUnits = units.split("Number of Units: ").pop();
            }
            if (values.listing.hoa_fee === null || values.listing.hoa_fee === undefined) {
                if (values.listing.hoa_fees === null || values.listing.hoa_fees === undefined) {
                    var association_fee = 0;
                } else {
                    association_fee = values.listing.hoa_fees;
                }
            } else {
                association_fee = values.listing.hoa_fee;

            }
            var zip_code = values.listing.address.postal_code;
            var monthly_home_insurance = values.listing.mortgage.estimate.monthly_home_insurance;
            var annual_home_insurance = monthly_home_insurance * 12;

            var options3 = {
                method: 'GET',
                url: 'https://rapidapi.p.rapidapi.com/finance/rates',
                qs: {
                    loc: zip_code
                },
                headers: {
                    'x-rapidapi-host': config.RapidApiHost,
                    'x-rapidapi-key': config.RapidApiKey,
                    useQueryString: true
                }
            };
            request(options3, function(error, response, body) {
                if (error) throw new Error(error);
                var json = response.body;
                var values = JSON.parse(json);
                var property_tax_rate = values.rates.property_tax;
                var insurance_rate = values.rates.insurance_rate;
                var thirtyyearrate = values.rates.average_rate_30_year;
                var fifteenyearrate = values.average_rate_15_year;
                var chmc_fee = 0;
                var amortizationPeriod = 30;
                var principle_borrowed = market_price - (market_price * 0.2);
                var total_monthly_payment = calculator.financing(principle_borrowed, thirtyyearrate, amortizationPeriod, 0);
                // var endingbalanceAfterOneYear = mortgageCalculator.mortgageCalculator(principle_borrowed, amortizationPeriod, thirtyyearrate, total_monthly_payment)
                // console.log(endingbalanceAfterOneYear);

                var options4 = {
                    method: 'GET',
                    url: 'https://rapidapi.p.rapidapi.com/mortgage/calculate',
                    qs: {
                        hoi: monthly_home_insurance,
                        tax_rate: property_tax_rate,
                        price: market_price,
                        downpayment: market_price * 0.1,
                        term: '30.0',
                        rate: thirtyyearrate
                    },
                    headers: {
                        'x-rapidapi-host': config.RapidApiHost,
                        'x-rapidapi-key': config.RapidApiKey,
                        useQueryString: true
                    }
                };
                request(options4, function(error, response, body) {
                    if (error) throw new Error(error);
                    var json = response.body;
                    var values = JSON.parse(json);
                    var property_tax_annual = (values.mortgage.monthly_property_taxes) * 12;

                    file.UserEmail = userEmail;
                    file.Address = address;
                    file.PropertyId = property_id;
                    file.ListingId = listing_id;
                    file.FairMarketValue = market_price;
                    file.NumberOfUnits = numberofUnits;
                    file.OfferPrice = market_price;
                    file.RealPurchasePrice = calculator.rpp(Number(file.OfferPrice), Number(file.Repairs), Number(file.RepairsContingency), Number(file.LenderFee), Number(file.BrokerFee), Number(file.Environmentals), Number(file.InspectionsEngineerReport), Number(file.Appraisals), Number(file.Misc), Number(file.TransferTax), Number(file.Legal));
                    file.PrincipleAmount = principle_borrowed;
                    file.InterestRate = thirtyyearrate;
                    file.AmortizationPeriod = amortizationPeriod;
                    file.CHMCFee = chmc_fee;
                    file.MortgageMonthlyPayment = total_monthly_payment;
                    file.CashRequiredToCloseAfterFinancing = calculator.closingCost(Number(file.RealPurchasePrice), Number(file.PrincipleAmount));
                    file.TotalIncome = calculator.totalIncome(Number(file.GrossRents), Number(file.Parking), Number(file.Storage), Number(file.LaundryVending), Number(file.OtherIncome));
                    file.VacancyLoss = calculator.vacancyLoss(Number(file.TotalIncome), Number(file.VacancyRate));
                    file.EffectiveGrossIncome = calculator.effectiveGrossIncome(Number(file.TotalIncome), Number(file.VacancyLoss));
                    file.PropertyTax = property_tax_annual;
                    file.Insurance = annual_home_insurance;
                    file.RepairsExpense = file.GrossRents * 10 / 100;
                    file.Advertizing = calculator.advertizing(Number(file.NumberOfUnits), Number(file.VacancyRate), Number(file.AdvertizingCostPerVacancy));
                    file.AssociationFee = association_fee;
                    file.PestControl = calculator.pestControl(Number(file.NumberOfUnits));
                    file.Security = calculator.security(Number(file.NumberOfUnits), Number(file.VacancyRate));
                    file.Evictions = calculator.evictions(Number(file.NumberOfUnits), Number(file.VacancyRate));
                    file.TotalOperatingExpenses = calculator.annualOperatingExpenses(Number(file.PropertyTax), Number(file.Insurance), Number(file.RepairsExpense), Number(file.Electricity), Number(file.Gas), Number(file.LawnSnowMaintenance), Number(file.WaterSewer), Number(file.Cable), Number(file.Management), Number(file.Caretaking), Number(file.Advertizing), Number(file.AssociationFee), Number(file.PestControl), Number(file.Security), Number(file.TrashRemoval), Number(file.CommonAreaMaintenance), Number(file.CapitalImprovements), Number(file.Accounting), Number(file.BadDebts), Number(file.Evictions));
                    file.NetOperatingIncome = calculator.netOperatingIncome(Number(file.EffectiveGrossIncome), Number(file.TotalOperatingExpenses));
                    file.CashRequiredToClose = calculator.cashrequiredToClose(Number(file.CashRequiredToCloseAfterFinancing), Number(file.DepositsMadeWithOffer));
                    file.TotalCashRequired = calculator.totalCashRequired(Number(file.DepositsMadeWithOffer), Number(file.LessProRationOfRents), Number(file.CashRequiredToClose));
                    file.DebtServicingCosts = calculator.debtServicingCosts(Number(file.MortgageMonthlyPayment), Number(file.OtherMonthlyFinanceCost));
                    file.AnnualProfitOrLoss = calculator.annualProfitOrLoss(Number(file.NetOperatingIncome), Number(file.DebtServicingCosts));
                    file.TotalMonthlyProfitOrLoss = calculator.monthlyProfitOrLoss(Number(file.AnnualProfitOrLoss));
                    file.CashFlowPerUnitPerMonth = calculator.cashFlowPerUnitPerMonth(Number(file.TotalMonthlyProfitOrLoss), Number(file.NumberOfUnits));
                    file.MortgageLTV = calculator.mortgageLTV(Number(file.PrincipleAmount), Number(file.FairMarketValue));
                    file.MortgageLTPP = calculator.mortgageLTPP(Number(file.PrincipleAmount), Number(file.OfferPrice));
                    file.CapRateOnPP = calculator.capRateOnPP(Number(file.NetOperatingIncome), Number(file.OfferPrice));
                    file.CapRateOnFMV = calculator.capRateOnFMV(Number(file.NetOperatingIncome), Number(file.FairMarketValue));
                    file.AverageRent = calculator.averageRent(Number(file.GrossRents), Number(file.NumberOfUnits));
                    file.GRM = calculator.grm(Number(file.OfferPrice), Number(file.GrossRents));
                    file.DCR = calculator.dcr(Number(file.NetOperatingIncome), Number(file.DebtServicingCosts));
                    file.CashOnCashROI = calculator.cashOnCashROI(Number(file.AnnualProfitOrLoss), Number(file.TotalCashRequired));
                    var endingbalanceAfterOneYear = mortgageCalculator.mortgageCalculator(principle_borrowed, amortizationPeriod, thirtyyearrate, total_monthly_payment);
                    file.EquityROIAfterOneYear = calculator.equityROI(Number(file.PrincipleAmount), Number(endingbalanceAfterOneYear), Number(file.TotalCashRequired));
                    file.AppreciationROIAfterOneYear = calculator.appreciationROI(Number(file.FairMarketValue), Number(file.AnnualAppreciationRate), Number(file.TotalCashRequired));
                    file.TotalROIAfterOneYear = calculator.totalROI(Number(file.CashOnCashROI), Number(file.EquityROIAfterOneYear), Number(file.AppreciationROIAfterOneYear), Number(file.TotalCashRequired));
                    file.ForcedAppROIAfterOneYear = calculator.forcedAppROI(Number(file.FairMarketValue), Number(file.RealPurchasePrice), Number(file.TotalCashRequired));
                    file.ExpenseToIncomeRatio = calculator.expenseToIncomeRatio(Number(file.EffectiveGrossIncome), Number(file.TotalOperatingExpenses));

                    console.log("fetching file to write");
                    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                        if (err) return console.log(err);
                        var updatedJson = JSON.stringify(file);
                        console.log(JSON.parse(updatedJson));
                        // console.log('writing to ' + fileName);
                    });
                    fs.readFile(fileName, 'utf8', function(err, data) {
                        if (!err) {
                            //console.log("Success" + data);
                            var jsonObj = JSON.parse(data)
                            const newproperty = new Property(jsonObj);
                            newproperty.save()
                                .then(property => res.json(property))
                                .catch(err => console.log(err));
                            res.end(data);

                        } else {
                            res.end("Error: " + err)
                        }
                    })
                });
            });
        });

    });

});

module.exports = router;