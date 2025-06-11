export interface ICard {
  userId: string;
  cardNumber: string;
  cardName: string;
  cvv: string;
  cardPin: string
  expiryDate: string;
}


export interface ICardInput {
  userId: string;
  firstName: string;
  lastName: string;
}