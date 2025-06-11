import { ICard, ICardInput } from "./interface";

import {
  generateCardNumber,
  generateCardPin,
  generateCVV,
  generateExpiryDate,
} from "../utils";
import Card from "./entity";

class CardService {
  public async createCard(input: ICardInput) {
    let newCard = new Card({
      userId: input.userId,
      cardName: `${input.firstName} ${input.lastName}`,
      cardNumber: generateCardNumber(),
      cardPin: generateCardPin(),
      cvv: generateCVV(),
      expiryDate: generateExpiryDate(),
    });

    newCard = await newCard.save();

    return newCard;
  }

  public async findCardByUserId(id: string) {
    const transfer = Card.findOne({ userId: id });

    return transfer;
  }
}

export const cardService = new CardService();
