import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsJobSortingComponent } from './applicants-job-sorting.component';

describe('ApplicantsJobSortingComponent', () => {
  let component: ApplicantsJobSortingComponent;
  let fixture: ComponentFixture<ApplicantsJobSortingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantsJobSortingComponent]
    });
    fixture = TestBed.createComponent(ApplicantsJobSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
