import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  public filters = [{ name: 'Adopted', isAdopted: true }, { name: 'Not Adopted', isAdopted: false }];

  public selectedFilter: object = {};

  public newAnimal(): void {
    this._router.navigate(['animals/new']);
  }

  ngOnInit() {
  }
}
