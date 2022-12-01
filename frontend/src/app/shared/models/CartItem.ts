import { Item } from "./Item";

export class CartItem {
  constructor(public item:Item) { }
  quantity:number = 1;
  price: number = this.item.price;
}
