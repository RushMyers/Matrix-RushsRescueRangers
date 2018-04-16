import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdopterModalComponent } from './new-adopter-modal.component';

describe('NewAdopterModalComponent', () => {
  let component: NewAdopterModalComponent;
  let fixture: ComponentFixture<NewAdopterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAdopterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdopterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
