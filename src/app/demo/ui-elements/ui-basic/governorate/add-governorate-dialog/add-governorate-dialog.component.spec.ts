import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGovernorateDialogComponent } from './add-governorate-dialog.component';

describe('AddGovernorateDialogComponent', () => {
  let component: AddGovernorateDialogComponent;
  let fixture: ComponentFixture<AddGovernorateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddGovernorateDialogComponent]
    });
    fixture = TestBed.createComponent(AddGovernorateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
