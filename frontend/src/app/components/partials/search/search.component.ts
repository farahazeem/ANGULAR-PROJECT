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
  items$!: Observable<any[]>;
  filteredItems$!: Observable<any[]>;
  term: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.items$ = this.itemService.getAll();

    this.filteredItems$ = this.searchTerm.pipe(
      debounceTime(500), // Wait for 500ms after typing stops
      distinctUntilChanged(), // Only emit when the search term changes
      switchMap((searchTerm) => {
        if (!searchTerm) {
          return new Observable<any[]>((observer) => {
            observer.next([]); // Return an empty array when there's no search term
            observer.complete();
          });
        }

        return this.items$.pipe(
          map((items: any[]) => {
            // Filter books based on the search term
            return items.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          })
        );
      })
    );

   // Set the initial search term if coming from route params
    // this.activatedRoute.params.subscribe((params) => {
    //   if (params['searchTerm']) {
    //     this.searchTerm.next(params['searchTerm']); // Emit searchTerm from route
    //     this.term = params['searchTerm']; // Set term for the input field
    //   }
    // });
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
    setTimeout(() => {
      this.searchTerm.next(""); // Emit empty string so the suggestions clear
    }, 300);
  }
}
