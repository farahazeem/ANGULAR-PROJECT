import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm = new Subject<string>(); 
  items: any[] = [];
  filteredItems$!: Observable<any[]>;
  term: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.itemService.getAll().subscribe((items) => {
      this.items = items;
    });
  }

  onTextChange(e: any) {
    this.term = e.target.value;
    this.searchTerm.next(this.term);

    this.filteredItems$ = new Observable<any[]>((observer) => {
      if (!this.term) {
        observer.next([]);
        observer.complete();
      } else {
        // Filter items based on the current search term
        const filteredItems = this.items.filter((item) =>
          item.name.toLowerCase().includes(this.term.toLowerCase())
        );
        observer.next(filteredItems);
        observer.complete();
      }
    });
  }

  search(term: string): void {
    if (term) {
      this.router.navigateByUrl(`/search/${term}`);
    } else {
      this.router.navigateByUrl('/');
    }
  }

  selectBook(name: string) {
    this.term = name;
    this.searchTerm.next(name);

    this.filteredItems$ = new Observable<any[]>((observer) => {
      observer.next([]);
      observer.complete();
    });

    setTimeout(() => {
      this.searchTerm.next("");
    }, 300);
  }
}
