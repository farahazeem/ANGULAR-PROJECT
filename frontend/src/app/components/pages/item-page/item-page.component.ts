import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/Item';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  item!: Item;
  constructor(activatedRoute:ActivatedRoute, itemService:ItemService, private cartService:CartService, private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      itemService.getItemById(params.id).subscribe(serverItem => {
        this.item = serverItem;
      });
    })
   }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addToCart(this.item);
    this.router.navigateByUrl('/cart-page');
  }

}
