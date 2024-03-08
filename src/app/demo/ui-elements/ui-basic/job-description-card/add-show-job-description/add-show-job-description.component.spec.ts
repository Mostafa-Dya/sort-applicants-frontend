import { ComponentFixture, TestBed } from '@angular/core/testing';

import AddShowJobDescription from './add-show-job-description.component';

describe('AddShowJobDescriptionComponent', () => {
  let component: AddShowJobDescription;
  let fixture: ComponentFixture<AddShowJobDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShowJobDescription],
    }).compileComponents();

    fixture = TestBed.createComponent(AddShowJobDescription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
