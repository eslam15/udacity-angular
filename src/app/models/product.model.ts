export class ProductModel {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public url: string,
    public description: string,
    public amount: number
  ) {}
}
