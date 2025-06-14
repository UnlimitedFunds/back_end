"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const enum_1 = require("../utils/enum");
const transferSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "User", },
    transactionId: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    beneficiaryName: {
        type: String,
        required: true,
    },
    beneficiaryAccountNumber: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    narration: {
        type: String,
        required: true,
    },
    swiftcode: {
        type: String,
    },
    serviceFee: {
        type: String,
        required: true,
    },
    //For Wire TF
    routingNumber: {
        type: String,
    },
    accountType: {
        type: String,
        required: true,
        enum: Object.values(enum_1.AccountType),
    },
    transferType: {
        type: String,
        required: true,
        enum: Object.values(enum_1.TransferType),
    },
    transactionType: {
        type: String,
        default: enum_1.TransactionType.Debit,
        enum: Object.values(enum_1.TransactionType),
    },
    //For Wire TF
    beneficiaryCountry: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Transfer = mongoose_1.default.model("Transfer", transferSchema);
exports.default = Transfer;
