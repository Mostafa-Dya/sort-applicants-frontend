import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/Auth/auth.service';
import { GovernorateService } from 'src/app/theme/shared/services/governorate-description.service';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-add-governorate-dialog',
  templateUrl: './add-governorate-dialog.component.html',
  styleUrls: ['./add-governorate-dialog.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export default class AddGovernorateDialogComponent implements OnInit {

  regionSets: FormArray;
  townshipSets: FormArray;
  villageSets: FormArray;
  mainForm: FormGroup;
  title:string;
  role:string;
  permissions:any;
  constructor(
    public dialogRef: MatDialogRef<AddGovernorateDialogComponent>,
    private fb: FormBuilder,
    private governorateService:GovernorateService,
    private translate:TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private authService:AuthService
    ) { }

    ngOnInit() {
      console.log(this.data);
      
      if (this.data) {
        this.governorateService.getGovernorateDataId(this.data).subscribe(res => {
          // Assuming the API response structure is similar to the provided sample
          const governorateData = res.data;
    
          // Set governorate name
          this.mainForm.get('governorate').setValue(governorateData.name);
    
          // Set region data
          const regions = governorateData.regions.map(region => this.fb.group({ region: region.name }));
          this.regionSets = this.fb.array(regions);
          this.mainForm.setControl('regionData', this.regionSets);
    
          // Set township data
          const townships = governorateData.townships.map(township => this.fb.group({ township: township.name }));
          this.townshipSets = this.fb.array(townships);
          this.mainForm.setControl('townshipData', this.townshipSets);
    
          // Set village data
          const villages = governorateData.villages.map(village => this.fb.group({ village: village.name }));
          this.villageSets = this.fb.array(villages);
          this.mainForm.setControl('villageData', this.villageSets);
        });
      }
    
      this.initForm();

      this.title = this.data ?
      this.translate.getTranslation('Show Governorate'):
       this.translate.getTranslation('Add Governorate'); 
       this.translate.setLanguage(localStorage.getItem('i18nextLng'));


     
                       this.role = localStorage.getItem('role');
                       this.permissions = this.authService.permissionsService();
    }

  initForm() {
    this.mainForm = this.fb.group({
      governorate: ['', Validators.required],
      regionData: this.fb.array([]),
      townshipData: this.fb.array([]),
      villageData: this.fb.array([]),
    });
  
    // Assign form arrays to class properties
    this.regionSets = this.mainForm.get('regionData') as FormArray;
    this.townshipSets = this.mainForm.get('townshipData') as FormArray;
    this.villageSets = this.mainForm.get('villageData') as FormArray;
  }
  
  
  addSets(group: string) {
    let regionGroup = this.fb.group({ region: [''] });
    let townshipGroup = this.fb.group({ township: [''] });
    let villageGroup = this.fb.group({ village: [''] });
  
    if (group === 'region') {
      this.regionSets.push(regionGroup);
    } else if (group === 'township') {
      this.townshipSets.push(townshipGroup);
    } else if (group === 'village') {
      this.villageSets.push(villageGroup);
    }
  }
  
  



  removeSet(index: number, group: string) {
    let formArray: FormArray;
  
    switch (group) {
      case 'region':
        formArray = this.regionSets;
        break;
      case 'township':
        formArray = this.townshipSets;
        break;
      case 'village':
        formArray = this.villageSets;
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

      // Extract values from regionSets controls
      const regionData = this.regionSets.controls.map((control) => control.get('region').value);
      const townshipData = this.townshipSets.controls.map((control) => control.get('township').value);
      const villageData = this.villageSets.controls.map((control) => control.get('village').value);

      // Create the API request payload
      const apiPayload = {
        name: formData.governorate,
        regions: regionData,
        townships: townshipData,
        villages: villageData,
      };

      // Check if data is being updated (existing governorate ID is available)
      if (this.data) {
        // Use updateGovernorateData for editing existing record
        this.governorateService.updateGovernorateData(this.data, apiPayload).subscribe(res => {
          if (res) {
            this.dialogRef.close();
          }
        });
      } else {
        // If no existing governorate ID, it's a new record
        this.governorateService.createGovernorateData(apiPayload).subscribe(res => {
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
