export class Product {
  constructor(
    public name: string,
    public image: string,
    public cost: number,
    public quantity: number,
    public id?: number
  ) { }
}
