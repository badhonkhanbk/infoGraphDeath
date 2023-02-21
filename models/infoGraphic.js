"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const infoGraphicSchema = new mongoose_1.Schema({
    Condition: String,
    ICD_Sub_Chapter_Code: String,
    State: String,
    State_Code: String,
    Year: String,
    Year_Code: String,
    Ten_Year_Age_Groups: String,
    Ten_Year_Age_Groups_Code: String,
    Gender: String,
    Race: String,
    Race_Code: String,
    Deaths: String,
    Population: String,
    Crude_Rate: String,
    Crude_Rate_Lower_95percent_Confidence_Interval: String,
    Crude_Rate_Upper_95percent_Confidence_Interval: String,
    Percentage_of_Total_Deaths: String,
});
const InfoGraphic = (0, mongoose_1.model)('infoGraphic', infoGraphicSchema);
exports.default = InfoGraphic;
