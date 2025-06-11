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
const enum_2 = require("./enum");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        default: "Unlimited Funds",
    },
    routingNumber: {
        type: String,
        required: true,
    },
    swiftCode: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    countryOfResidence: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        //unique: true
    },
    address: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
        enum: Object.values(enum_1.AccountType),
    },
    accountOwnership: {
        type: String,
        required: true,
        enum: Object.values(enum_1.AccountOwnership),
    },
    initialDeposit: {
        type: String,
        required: true,
    },
    monthlyIncome: {
        type: String,
        required: true,
    },
    transferPin: {
        type: String,
        required: true,
    },
    ssn: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    },
    proofOfAddress: {
        type: String,
        required: true,
    },
    accountApproved: {
        type: Boolean,
        default: false,
    },
    occupation: {
        type: String,
        required: true,
    },
    accountNo: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: Object.values(enum_2.GenderStatus),
    },
    maritalStatus: {
        type: String,
        required: true,
        enum: Object.values(enum_2.MaritialStatus),
    },
    status: {
        type: String,
        default: enum_2.AccountStatus.Hold,
        enum: Object.values(enum_2.AccountStatus),
    },
    emailVerificationOtp: {
        type: String,
        default: undefined,
    },
    emailVerificationOtpExpiration: {
        type: Date,
        default: undefined,
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
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
