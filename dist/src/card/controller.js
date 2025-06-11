"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardController = void 0;
const enum_1 = require("../utils/enum");
const service_1 = require("../user/service");
const enum_2 = require("../user/enum");
const service_2 = require("./service");
class CardController {
    createCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userExist = yield service_1.userService.findUserByIdWithoutPassword(userId);
            if (!userExist) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist!",
                    data: null,
                });
            }
            if (userExist.status != enum_2.AccountStatus.Active) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Your account is not active!",
                    data: null,
                });
            }
            const doesUserHaveCard = yield service_2.cardService.findCardByUserId(userExist._id.toString());
            if (doesUserHaveCard) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "You already have a card!",
                    data: null,
                });
            }
            yield service_2.cardService.createCard({
                userId: userExist._id.toString(),
                firstName: userExist.firstName,
                lastName: userExist.lastName,
            });
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Card created successfully!",
                data: null,
            });
        });
    }
    fetchCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userExist = yield service_1.userService.findUserByIdWithoutPassword(userId);
            if (!userExist) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist!",
                    data: null,
                });
            }
            const doesUserHaveCard = yield service_2.cardService.findCardByUserId(userExist._id.toString());
            if (!doesUserHaveCard) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "You have not created a card!",
                    data: null,
                });
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Card fetched successfully!",
                data: doesUserHaveCard,
            });
        });
    }
}
exports.cardController = new CardController();
