const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Property schema
const propertySchema = Schema({
    UserEmail: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    PropertyId: {
        type: String,
        required: true
    },
    ListingId: {
        type: String,
        required: true
    },
    FairMarketValue: {
        type: String,
        required: true
    },
    VacancyRate: {
        type: String,
        required: true
    },
    ManagementRate: {
        type: String,
        required: true
    },
    AdvertizingCostPerVacancy: {
        type: String,
        required: true
    },
    NumberOfUnits: {
        type: String,
        required: true
    },
    AnnualAppreciationRate: {
        type: String,
        required: true
    },
    OfferPrice: {
        type: String,
        required: true
    },
    Repairs: {
        type: String,
        required: true
    },
    RepairsContingency: {
        type: String,
        required: true
    },
    LenderFee: {
        type: String,
        required: true
    },
    BrokerFee: {
        type: String,
        required: true
    },
    Environmentals: {
        type: String,
        required: true
    },
    InspectionsEngineerReport: {
        type: String,
        required: true
    },
    Appraisals: {
        type: String,
        required: true
    },
    Misc: {
        type: String,
        required: true
    },
    TransferTax: {
        type: String,
        required: true
    },
    Legal: {
        type: String,
        required: true
    },
    RealPurchasePrice: {
        type: String,
        required: true
    },
    DownPayment: {
        type: String,
        required: true
    },
    PrincipleAmount: {
        type: String,
        required: true
    },
    InterestRate: {
        type: String,
        required: true
    },
    AmortizationPeriod: {
        type: String,
        required: true
    },
    CHMCFee: {
        type: String,
        required: true
    },
    MortgageMonthlyPayment: {
        type: String,
        required: true
    },
    OtherMonthlyFinanceCost: {
        type: String,
        required: true
    },
    CashRequiredToCloseAfterFinancing: {
        type: String,
        required: true
    },
    GrossRents: {
        type: String,
        required: true
    },
    Parking: {
        type: String,
        required: true
    },
    Storage: {
        type: String,
        required: true
    },
    LaundryVending: {
        type: String,
        required: true
    },
    OtherIncome: {
        type: String,
        required: true
    },
    TotalIncome: {
        type: String,
        required: true
    },
    VacancyLoss: {
        type: String,
        required: true
    },
    EffectiveGrossIncome: {
        type: String,
        required: true
    },
    PropertyTax: {
        type: String,
        required: true
    },
    Insurance: {
        type: String,
        required: true
    },
    RepairsExpense: {
        type: String,
        required: true
    },
    Electricity: {
        type: String,
        required: true
    },
    Gas: {
        type: String,
        required: true
    },
    LawnSnowMaintenance: {
        type: String,
        required: true
    },
    WaterSewer: {
        type: String,
        required: true
    },
    Cable: {
        type: String,
        required: true
    },
    Management: {
        type: String,
        required: true
    },
    Caretaking: {
        type: String,
        required: true
    },
    Advertizing: {
        type: String,
        required: true
    },
    AssociationFee: {
        type: String,
        required: true
    },
    PestControl: {
        type: String,
        required: true
    },
    Security: {
        type: String,
        required: true
    },
    TrashRemoval: {
        type: String,
        required: true
    },
    MiscellaneousExpense: {
        type: String,
        required: true
    },
    CommonAreaMaintenance: {
        type: String,
        required: true
    },
    CapitalImprovements: {
        type: String,
        required: true
    },
    Accounting: {
        type: String,
        required: true
    },
    LegalExpense: {
        type: String,
        required: true
    },
    BadDebts: {
        type: String,
        required: true
    },
    OtherExpense: {
        type: String,
        required: true
    },
    Evictions: {
        type: String,
        required: true
    },
    TotalOperatingExpenses: {
        type: String,
        required: true
    },
    NetOperatingIncome: {
        type: String,
        required: true
    },
    DepositsMadeWithOffer: {
        type: String,
        required: true
    },
    LessProRationOfRents: {
        type: String,
        required: true
    },
    CashRequiredToClose: {
        type: String,
        required: true
    },
    TotalCashRequired: {
        type: String,
        required: true
    },
    DebtServicingCosts: {
        type: String,
        required: true
    },
    AnnualProfitOrLoss: {
        type: String,
        required: true
    },
    TotalMonthlyProfitOrLoss: {
        type: String,
        required: true
    },
    CashFlowPerUnitPerMonth: {
        type: String,
        required: true
    },
    MortgageLTV: {
        type: String,
        required: true
    },
    MortgageLTPP: {
        type: String,
        required: true
    },
    CapRateOnPP: {
        type: String,
        required: true
    },
    CapRateOnFMV: {
        type: String,
        required: true
    },
    AverageRent: {
        type: String,
        required: true
    },
    GRM: {
        type: String,
        required: true
    },
    DCR: {
        type: String,
        required: true
    },
    CashOnCashROI: {
        type: String,
        required: true
    },
    EquityROIAfterOneYear: {
        type: String,
        required: true
    },
    AppreciationROIAfterOneYear: {
        type: String,
        required: true
    },
    TotalROIAfterOneYear: {
        type: String,
        required: true
    },
    ForcedAppROIAfterOneYear: {
        type: String,
        required: true
    },
    ExpenseToIncomeRatio: {
        type: String,
        required: true
    },
});

//let Property = module.exports = mongoose.model("Property", propertySchema);
module.exports = Property =mongoose.model("Properties", propertySchema);