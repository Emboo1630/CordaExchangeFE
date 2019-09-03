export class userAccountModel {
    name: String;
    wallet: Array<String> = [];
    linearId: String;

constructor(init?: Partial<userAccountModel>) {
  Object.assign(this, init);
}
}


