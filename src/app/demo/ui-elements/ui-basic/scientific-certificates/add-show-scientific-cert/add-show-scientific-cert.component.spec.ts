import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShowScientificCertComponent } from './add-show-scientific-cert.component';

describe('AddShowScientificCertComponent', () => {
  let component: AddShowScientificCertComponent;
  let fixture: ComponentFixture<AddShowScientificCertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddShowScientificCertComponent]
    });
    fixture = TestBed.createComponent(AddShowScientificCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
