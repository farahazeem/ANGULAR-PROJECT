import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order:Order = new Order();
  checkoutForm!: FormGroup;
  constructor(cartService: CartService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService) {
                const cart = cartService.getCart();
                this.order.items = cart.items;
                this.order.totalPrice = cart.totalPrice;
               }

  ngOnInit(): void {
    let {name, address} = this.userService.currentUser;
    //now after getting the value of current user
    //we'll create a form with prefilled values of name and address
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    });
  }

  //we're creating this shorthand method for the easy access of form controls(values)
  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Please fill the input', 'Invalid Inputs');
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    console.log(this.order);
  }

}
