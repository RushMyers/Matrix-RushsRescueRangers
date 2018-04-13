import { Component, OnInit } from '@angular/core';

import { Adoption } from '../../models/adoption';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {

  public newAdoption: Adoption = new Adoption();

  constructor() { }

  ngOnInit() {
  }
}
