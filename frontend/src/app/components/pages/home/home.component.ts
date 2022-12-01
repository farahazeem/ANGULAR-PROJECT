import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/Item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Item[] = [];
  constructor(private itemService: ItemService, activatedRoute:ActivatedRoute) {
    //by subscribing to the params, we make sure that this piece of code is executed whenever params change
    let itemsObservable:Observable<Item[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      itemsObservable = this.itemService.getAllItemsBySearchTerm(params.searchTerm);
      else if (params.tag)
      itemsObservable = this.itemService.getAllItemsByTag(params.tag);
      else
      itemsObservable = itemService.getAll();

      itemsObservable.subscribe((serverItems) => {
        this.items = serverItems;
      })
    })
  }

  ngOnInit(): void {
  }

}
