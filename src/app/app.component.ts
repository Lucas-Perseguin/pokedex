import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  title = 'pokedex';

  ngOnInit(): void {
    if (window.location.search === '' && window.location.pathname === '/') {
      this.router.navigate([''], { queryParams: { page: 1 } });
    }
  }
}
