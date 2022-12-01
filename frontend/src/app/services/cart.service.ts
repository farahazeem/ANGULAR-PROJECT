import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Item } from '../shared/models/Item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(itemAttr:Item):void {
   let cartItem = this.cart.items.find(item => item.item.id === itemAttr.id);
   if (cartItem)
   return;

   this.cart.items.push(new CartItem(itemAttr));
   this.setCartToLocalStorage();
  }

  removeFromCart(itemId:string):void {
    this.cart.items = this.cart.items
    .filter(item => item.item.id != itemId);
    this.setCartToLocalStorage();
  }

  changeQuantity(itemId: string, quantity:number) {
    let cartItem = this.cart.items
    .find(item => item.item.id === itemId)
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.item.price;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  //sometimes we dont want to work with observable rather
  //we just want the latest value of the observable, that is
  //why we create this new getCart() method which always have the latest
  //value of the cart bcs we made it as BehaviorSubject as can be seen
  //on line 12 of this service
  //Note: we're creating this method for accessing it in checkout component
  getCart(): Cart {
    return this.cartSubject.value;
  }

  private setCartToLocalStorage():void {
    this.cart.totalPrice = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    //to notify all the listeners of the cart observable we write the following line of code
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson): new Cart();
  }
}
