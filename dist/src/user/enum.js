"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaritialStatus = exports.GenderStatus = exports.AccountStatus = void 0;
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["Hold"] = "hold";
    AccountStatus["Active"] = "active";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
var GenderStatus;
(function (GenderStatus) {
    GenderStatus["Male"] = "male";
    GenderStatus["Female"] = "female";
})(GenderStatus || (exports.GenderStatus = GenderStatus = {}));
var MaritialStatus;
(function (MaritialStatus) {
    MaritialStatus["Single"] = "Single";
    MaritialStatus["Married"] = "Married";
    MaritialStatus["Divorce"] = "Divorce";
})(MaritialStatus || (exports.MaritialStatus = MaritialStatus = {}));
