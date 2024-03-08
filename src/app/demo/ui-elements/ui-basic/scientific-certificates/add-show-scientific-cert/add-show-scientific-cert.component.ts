

import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/Auth/auth.service';
import { ScientificCertificateService } from 'src/app/theme/shared/services/scientific-certificate.service';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-add-show-scientific-cert',
  templateUrl: './add-show-scientific-cert.component.html',
  styleUrls: ['./add-show-scientific-cert.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export default class AddShowScientificCertComponent implements OnInit {

  preciseSets: FormArray;

  mainForm: FormGroup;

  categoryMapping: { [key: string]: number } = {
    'Category 1': 1,
    'Category 2': 2,
    'Category 3': 3,
    'Category 4': 4,
    'Category 5': 5,
  };
  categoryOrder: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
  title: any;
  role: string;
  permissions: any;
  constructor(
    public dialogRef: MatDialogRef<AddShowScientificCertComponent>,
    private fb: FormBuilder,
    private scientificCertificateService: ScientificCertificateService,
    private translate: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private authService: AuthService

  ) { }

  ngOnInit() {
    this.initForm();

    console.log(this.data);

    if (this.data) {
      this.scientificCertificateService.getScientificCertificateDataId(this.data).subscribe(res => {
        const certificateData = res.data[0]; // Access the first element of the array
        console.log(certificateData);

        this.mainForm.patchValue({
          type: certificateData.type,
          general: certificateData.name,
          selectedCategory: certificateData.category,
        });

        this.preciseSets.clear();

        const scientificCert = certificateData.scientific_cert ?? [];
        scientificCert.forEach(precise => {
          this.addSets('precise', precise.name);
        });
        this.mainForm.get('selectedCategory').setValue(certificateData.category);

      });
    }
    this.title = this.data ?
      this.translate.getTranslation('Show Scientific Certificates') :
      this.translate.getTranslation('Add Scientific Certificates');

    this.translate.setLanguage(localStorage.getItem('i18nextLng'));


    this.role = localStorage.getItem('role');
    this.permissions = this.authService.permissionsService();
  }





  initForm() {
    this.mainForm = this.fb.group({
      general: ['', Validators.required],
      type: ['', Validators.required],
      preciseData: this.fb.array([]),
      selectedCategory: [null, Validators.required], // Set initial value to null
    });

    // Assign form arrays to class properties
    this.preciseSets = this.mainForm.get('preciseData') as FormArray;
  }

  addSets(group: string, value?: string) {
    let preciseGroup = this.fb.group({ precise: [value || ''] });

    if (group === 'precise') {
      this.preciseSets.push(preciseGroup);
    }
  }

  removeSet(index: number, group: string) {
    let formArray: FormArray;

    switch (group) {
      case 'precise':
        formArray = this.preciseSets;
        break;

      default:
        return;
    }

    if (formArray && formArray.length > 0) {
      formArray.removeAt(index);
    }
  }


  submit() {
    // Check if the form is valid
    if (this.mainForm.valid) {
      const formData = this.mainForm.value;

      // Extract values from preciseSets controls
      const preciseData = this.preciseSets.controls.map((control) => control.get('precise').value);

      // Create the API request payload
      const apiPayload = {
        name: formData.general,
        type: formData.type,
        category: formData.selectedCategory, // Use numeric value directly
        precise: preciseData,
      };
      // Check if data is being updated (existing general ID is available)
      if (this.data) {
        // Use updateGovernorateData for editing existing record
        this.scientificCertificateService.updateScientificCertificateData(this.data, apiPayload).subscribe(res => {
          if (res) {
            this.dialogRef.close();
          }
        });
      } else {
        // If no existing general ID, it's a new record
        this.scientificCertificateService.createScientificCertificateData(apiPayload).subscribe(res => {
          if (res) {
            this.dialogRef.close();
          }
        });
      }
    } else {
      // Mark the form as touched to display error messages
      this.mainForm.markAllAsTouched();
    }
  }



}
