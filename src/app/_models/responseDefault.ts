export class responseDefault {
    message: string;
    status: string;
    result: any;

  
    constructor(init?: Partial<responseDefault>) {
      Object.assign(this, init);
    }
  }
  