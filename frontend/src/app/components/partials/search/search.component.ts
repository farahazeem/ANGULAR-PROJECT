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

    this.filteredItems$ = this.searchTerm.pipe(
      debounceTime(500), // Wait for 500ms after typing stops
      distinctUntilChanged(), // Only emit when the search term actually changes
      switchMap((searchTerm) => {
        if (!searchTerm) {
          return new Observable<any[]>((observer) => {
            observer.next([]);
            observer.complete();
          });
        }

        return new Observable<any[]>((observer) => {
          const filteredItems = this.items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          observer.next(filteredItems);
          observer.complete();
        });
      })
    );
  }

  onTextChange(e: any) {
    this.term = e.target.value;
    this.searchTerm.next(this.term);
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
