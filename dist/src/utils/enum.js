"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.AccountOwnership = exports.AccountType = exports.MessageResponse = void 0;
var MessageResponse;
(function (MessageResponse) {
    MessageResponse["Error"] = "error";
    MessageResponse["Success"] = "success";
})(MessageResponse || (exports.MessageResponse = MessageResponse = {}));
var AccountType;
(function (AccountType) {
    AccountType["Savings"] = "Savings";
    AccountType["Current"] = "Current";
})(AccountType || (exports.AccountType = AccountType = {}));
var AccountOwnership;
(function (AccountOwnership) {
    AccountOwnership["Company"] = "Company";
    AccountOwnership["Personal"] = "Personal";
    AccountOwnership["Joint"] = "Joint";
    AccountOwnership["Others"] = "Others";
})(AccountOwnership || (exports.AccountOwnership = AccountOwnership = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["Debit"] = "debit";
    TransactionType["Credit"] = "credit";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
