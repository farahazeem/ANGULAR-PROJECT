import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.css']
})
export class OrderTrackPageComponent implements OnInit {

  order!:Order;
  constructor(activatedRoute: ActivatedRoute,
              orderService: OrderService) {
    const params = activatedRoute.snapshot.params;
    if(!params.orderId) return; //since we setup to send order id in the trackpage component route, se we can expect to get a value of orderId from it

    orderService.trackOrderById(params.orderId).subscribe(order => {
      this.order = order;
    })

               }

  ngOnInit(): void {
  }

}
