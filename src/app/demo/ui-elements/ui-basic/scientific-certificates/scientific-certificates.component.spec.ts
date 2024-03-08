import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificCertificatesComponent } from './scientific-certificates.component';

describe('ScientificCertificatesComponent', () => {
  let component: ScientificCertificatesComponent;
  let fixture: ComponentFixture<ScientificCertificatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScientificCertificatesComponent]
    });
    fixture = TestBed.createComponent(ScientificCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
