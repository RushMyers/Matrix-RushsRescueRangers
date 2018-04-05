import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
})
export class AnimalComponent implements OnInit {
  @Input() public name: string;
  @Input() public species: string;
  @Input() public imageUrl: string;

  constructor() { }

  ngOnInit() {
  }

}
