export class CorexMoveTokensFromUserToUserModel {
    senderId: string;
    receiverId: string;
    amount: number;
    currency: string;
constructor(init?: Partial<CorexMoveTokensFromUserToUserModel>) {
Object.assign(this, init);
}
}
