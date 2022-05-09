import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSearch(data:string) {
    if(data && data.length > 3) {
      this.router.navigate(['/character-list'], {
        queryParams: {q:data}
      }
      )

    }
  }

}
