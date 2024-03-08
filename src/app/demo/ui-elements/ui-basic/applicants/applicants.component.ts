import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { JobDescriptionService } from 'src/app/theme/shared/services/job-description.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';
import { ApplicantsService } from 'src/app/theme/shared/services/applicants.service';
import { Router } from '@angular/router';
import { GovernorateService } from 'src/app/theme/shared/services/governorate-description.service';
import { GenerateResultsService } from 'src/app/theme/shared/services/generate-results.service';
import { Category, SharedService } from 'src/app/theme/shared/services/shared.service';
import { ExcelService } from 'src/app/theme/shared/services/excel.service';
import { AuthService } from 'src/app/Auth/auth.service';


interface Applicant {
  id: number;
  status: number;
  fullName: string;
  category: string;
  certificate: {
    general: string;
    precise: string;
  };
  governorate: string;
  graduationRate: string;
  exam_result: string;
  specialization_data: any[]; // Assuming this is an array, you can replace it with the actual type
  ministry: string;
  destination: string;
  sub_entity: string; // If applicable
  cardNumber: string;
  desireOrder: string; // Assuming this is a string, you can replace it with the actual type
  recordEntry: string;
  entryDate: string;
  lastModifier: string;
  modificationDate: string;
  accepted:number;
}


interface TableColumn {
  name: string;
  label: string;
  sortable: boolean;
}





interface NumericField {
  name: string;
  label: string;
  conditions: { value: string; label: string }[]; // Update the conditions property
  selectedCondition?: string; // Add this property
}


interface StringField {
  name: string;
  label: string;
}

interface SelectField {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}


@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule,FormsModule,ReactiveFormsModule],
})
export default class ApplicantsComponent implements OnInit  {
  applicants: any[] = [];
  searchForm: FormGroup;
  categoryOptions: { value: string; label: string }[] = []; // Add categoryOptions
  governorateOptions: { value: string; label: string }[] = [];
  selectedIds: number[] = [];

  numericFields: NumericField[] = [
    { name: 'id', label: 'ID', 
        conditions: [
      { value: 'equals', label: 'Equals' },
      { value: 'greater_than', label: 'Greater Than' },
      { value: 'less_than', label: 'Less Than' },
      { value: 'greater_than_or_equal', label: 'Greater Than or Equal To' },
      { value: 'less_than_or_equal', label: 'Less Than or Equal To' },
      { value: 'range', label: 'Range' },
    ] },
    { name: 'graduationRate', label: 'Graduation Rate', 
        conditions: [
      { value: 'equals', label: 'Equals' },
      { value: 'greater_than', label: 'Greater Than' },
      { value: 'less_than', label: 'Less Than' },
      { value: 'greater_than_or_equal', label: 'Greater Than or Equal To' },
      { value: 'less_than_or_equal', label: 'Less Than or Equal To' },
      { value: 'range', label: 'Range' },
    ] },
    // { name: 'exam_result', label: 'Exam Results', 
    //     conditions: [
    //   { value: 'equals', label: 'Equals' },
    //   { value: 'greater_than', label: 'Greater Than' },
    //   { value: 'less_than', label: 'Less Than' },
    //   { value: 'greater_than_or_equal', label: 'Greater Than or Equal To' },
    //   { value: 'less_than_or_equal', label: 'Less Than or Equal To' },
    //   { value: 'range', label: 'Range' },
    // ] },
    { name: 'cardNumber', label: 'Card Number', 
        conditions: [
      { value: 'equals', label: 'Equals' },
      { value: 'greater_than', label: 'Greater Than' },
      { value: 'less_than', label: 'Less Than' },
      { value: 'greater_than_or_equal', label: 'Greater Than or Equal To' },
      { value: 'less_than_or_equal', label: 'Less Than or Equal To' },
      { value: 'range', label: 'Range' },
    ] },
    { name: 'order_of_desire', label: 'Desire Order', 
        conditions: [
      { value: 'equals', label: 'Equals' },
      { value: 'greater_than', label: 'Greater Than' },
      { value: 'less_than', label: 'Less Than' },
      { value: 'greater_than_or_equal', label: 'Greater Than or Equal To' },
      { value: 'less_than_or_equal', label: 'Less Than or Equal To' },
      { value: 'range', label: 'Range' },
    ] },
  ];

  
  stringFields: StringField[] = [
    { name: 'fullName', label: 'Full_Name' },
    { name: 'certificate', label: 'Certificate' },
    { name: 'destination', label: 'The_Ministry' },
    { name: 'destination', label: 'Destination' },
    { name: 'recordEntry', label: 'Record_Entry' },
    { name: 'lastModifier', label: 'Last_Modified' },
  ];

  searchFields: SelectField[] = [
    { name: 'category', label: 'Category', options: [] },
    { name: 'governorate', label: 'Governorate', options: [] },
  ];

  columnData: TableColumn[] = [
    { name: 'id', label: 'ID',sortable: true },
    { name: '', label: '', sortable: false },
    { name: '', label: 'Details', sortable: false },
    { name: '', label: 'Delete', sortable: false },
    { name: 'status', label: 'Status', sortable: true },
    { name: 'fullName', label: 'Full Name', sortable: true },
    { name: 'category', label: 'Category', sortable: true },
    { name: 'certificate', label: 'Certificate', sortable: false },
    { name: 'governorate', label: 'Governorate', sortable: true },
    { name: 'graduationRate', label: 'Graduation Rate', sortable: true },
    // { name: 'exam_result', label: 'Exam Result', sortable: true },
    { name: 'numberOfDesires', label: 'Number of Desires', sortable: false },
    { name: 'ministry', label: 'Ministry', sortable: false },
    { name: 'destination', label: 'Destination', sortable: true },
    { name: 'cardNumber', label: 'Card Number', sortable: true },
    { name: 'desireOrder', label: 'Desire Order', sortable: true },
    { name: 'recordEntry', label: 'Record Entry', sortable: true },
    { name: 'entryDate', label: 'Entry Date', sortable: true },
    { name: 'lastModified', label: 'Last Modified', sortable: false },
    { name: 'modificationDate', label: 'Modification Date', sortable: true },
  ];

  currentPage: number = 1;
  pageSizeSelected: number = 5; // Default page size
  totalPages: number;
  pageSizes: number[] = [5, 10, 25, 50, 100]; // Options for page size

  sortedColumn: string = ''; // Track the currently sorted column
  sortOrder: string = 'asc'; // Track the sorting order (asc/desc)
  file: File | null = null;
  role:string;
  permissions:any;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder ,
    private translate: TranslationService,
    private applicantsService:ApplicantsService,
    private router: Router,
    private governorateService:GovernorateService,
    private generateResult:GenerateResultsService,
    private sharedService:SharedService,
    private excelService:ExcelService,
    private authService:AuthService
    ){
      this.applicantTable();
    }
    applicantTable(){
      this.applicantsService.getApplicants().subscribe((res) => {
        this.applicants = res;
        // Parse the certificate string to an object
        this.applicants.forEach(applicant => {
          if (applicant.certificate) {
            applicant.certificate = JSON.parse(applicant.certificate);
          }
        });
      });
      return this.applicants;
    }

    
    ngOnInit(): void {
      // Initialize the form controls
      this.initForm();
      this.translate.setLanguage(localStorage.getItem('i18nextLng'));
    
      this.categoryOptions = Object.keys(Category).map(key => ({ value: Category[key], label: this.sharedService.getCategoryString(Category[key]) }));
      this.searchFields.find(field => field.name === 'category').options = this.categoryOptions;
    
      this.governorateService.getGovernorateData().subscribe((response: any) => {
        const data = response.data; // Access the 'data' property of the response
        this.governorateOptions = data.map((item) => ({ value: item.name, label: item.name }));
        // Update the select field options
        this.searchFields.find((field) => field.name === 'governorate').options = this.governorateOptions;
    
        // Calculate total pages after fetching data
        this.calculateTotalPages();
      });
      this.role = localStorage.getItem('role');
      this.permissions = this.authService.permissionsService();
    }
    

    

    getCategoryString(category){
      return this.sharedService.getCategoryString(category);
    }

    getDesireOrderString(desires){
      return this.sharedService.getDesireOrderString(desires);
    }

    toggleSelection(event: any, id: number): void {
      if (event.target.checked) {
        // If checkbox is checked, add ID to selectedIds array
        this.selectedIds.push(id);
      } else {
        // If checkbox is unchecked, remove ID from selectedIds array
        const index = this.selectedIds.indexOf(id);
        if (index !== -1) {
          this.selectedIds.splice(index, 1);
        }
      }
    }
  
    // Function to check if an applicant is selected
    isSelected(id: number): boolean {
      return this.selectedIds.includes(id);
    }
  
    // Function to select all applicants
    selectAll(event: any): void {
      if (event.target.checked) {
        // If "select all" checkbox is checked, add all IDs to selectedIds array
        this.selectedIds = this.applicants.map(applicant => applicant.id);
      } else {
        // If "select all" checkbox is unchecked, clear selectedIds array
        this.selectedIds = [];
      }
    }
  
    // Function to clear selected applicants
    deleteSelected(): void {
      // Check if any applicant IDs are selected
      if (this.selectedIds.length === 0) {
        // If no applicant IDs are selected, show an alert or toast message
        console.log("No applicants selected for deletion.");
        return;
      }
    
      // Open confirmation dialog to confirm deletion of selected applicants
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        position: { top: '10px', left: '10px' },
        data: { message: 'Are you sure you want to delete selected applicants?' }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // User confirmed, send request to delete selected applicants
          this.applicantsService.deleteApplicantsByIDs(this.selectedIds).subscribe(res => {
            if (res) {
              // All selected applicants deleted successfully
              this.selectedIds = []; // Clear the selected IDs array
              this.applicantTable(); // Refresh the table data
            }
          });
        }
      });
    }
    

    
    private initForm() {
      // Initialize form controls for numeric fields
      const numericFieldControls = {};
      this.numericFields.forEach((field) => {
        numericFieldControls[field.name] = this.fb.group({
          condition: [field.conditions[0].value],
          min: [null],
          max: [null],
          value: [null], 
        });
      });
    
      // Initialize form controls for string fields
      const stringFieldControls = {};
      this.stringFields.forEach((field) => {
        if (field.name === 'certificate') {
          // Initialize controls for 'general' and 'precise' under 'certificate' field
          stringFieldControls[field.name] = this.fb.group({
            general: [null],
            precise: [null]
          });
        } else {
          stringFieldControls[field.name] = [null]; // Initialize other string fields
        }
      });


      const searchFieldControls = {};
      this.searchFields.forEach((field) => {
        searchFieldControls[field.name] = [null];
      });
    
      // Combine numeric and string field controls
      const formControls = { ...numericFieldControls, ...stringFieldControls, ...searchFieldControls };
    
      // Create the FormGroup
      this.searchForm = this.fb.group(formControls);
      this.searchForm.patchValue({
        category: '', // Replace 'category' with the name of your select field
        governorate: '' // Replace 'governorate' with the name of your select field
      });
    }


    paginateData(): Applicant[] {
      const startIndex = (this.currentPage - 1) * this.pageSizeSelected;
      const endIndex = Math.min(startIndex + this.pageSizeSelected, this.applicants.length);
      console.log(this.applicants.slice(startIndex, endIndex))
      return this.applicants.slice(startIndex, endIndex);
    }
    
    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
    
    nextPage(): void {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
    
    firstPage(): void {
      this.currentPage = 1;
    }
    
    lastPage(): void {
      this.currentPage = this.totalPages - 1;
    }
    
    getRange(): string {
      const startIndex = (this.currentPage - 1) * this.pageSizeSelected + 1;
      const endIndex = Math.min(startIndex + this.pageSizeSelected - 1, this.applicants.length);
      return `${startIndex} - ${endIndex}`;
    }
    
    changePageSize(size: number): void {
      this.pageSizeSelected = size;
      this.currentPage = 1; // Reset to the first page when changing page size
      this.calculateTotalPages(); // Recalculate total pages
    }
    
    calculateTotalPages(): void {
      // Calculate total number of items by summing the lengths of specialization_data arrays
      const totalItems = this.applicants.reduce((total, applicant) => total + applicant.specialization_data.length, 0);
      this.totalPages = Math.ceil(totalItems / this.pageSizeSelected);
    }
    
    
    addApplicants(){
      this.router.navigate(['/basic/applicants-data']);
    }
    
    showDetails(id) {
      this.router.navigate(['/basic/applicants-data', id]);
    }


    generateResults() {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        position: { top: '10px', left: '10px' },
        data: { 
          message: 'Are you sure you want to generate results ?',
          flag:true
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // User confirmed, perform delete action
          this.generateResult.generateResults().subscribe(res=>{
            if(res){
              this.applicantTable();
            }
          });
        }
      });
    }

    revertResults() {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        position: { top: '10px', left: '10px' },
        data: {
          message: 'Are you sure you want to revert results ?',
          flag:true
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // User confirmed, perform delete action
          this.generateResult.cancelResults().subscribe(res=>{
            if(res){
              this.applicantTable();
            }
          });
        }
      });
    }

    sortColumn(columnName: any): void {
      console.log(columnName)
      // Check if the column is already being sorted and toggle sorting order
      if (this.sortedColumn === columnName) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        // If sorting a different column, reset sorting order to ascending
        this.sortOrder = 'asc';
        this.sortedColumn = columnName;
      }
    
      this.applicants.sort((a, b) => {
        if (typeof a[columnName] === 'number' && typeof b[columnName] === 'number') {
          // Compare numbers directly based on sorting order
          console.log(this.sortOrder === 'asc' ? a[columnName] - b[columnName] : b[columnName] - a[columnName])
          return this.sortOrder === 'asc' ? a[columnName] - b[columnName] : b[columnName] - a[columnName];
        } else {
          // Use string comparison for non-numeric values based on sorting order
          console.log(this.sortOrder === 'asc' ? a[columnName].localeCompare(b[columnName]) : b[columnName].localeCompare(a[columnName]))
          return this.sortOrder === 'asc' ? a[columnName].localeCompare(b[columnName]) : b[columnName].localeCompare(a[columnName]);
        }
      });
    }

  
  deleteRecord(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      position: { top: '10px', left: '10px' },
      data: { message: 'Are you sure you want to delete this record ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        // User confirmed, perform delete action
        this.applicantsService.deleteApplicantsByID(id).subscribe(res => {
          if(res){
            this.applicantTable();

          }
        });
      }
    });
  }

  


  onSubmit() {
    const formData = this.searchForm.getRawValue();
    const params = {};
    const body = {};
  
    // Process numeric fields
    this.numericFields.forEach((field) => {
      const condition = formData[field.name]?.condition;
      const min = formData[field.name]?.min;
      const max = formData[field.name]?.max;
      const value = formData[field.name]?.value;
  
      if (condition) {
        if (condition === 'range' && (min !== null || max !== null)) {
          body[field.name] = {
            condition,
            value: {
              min,
              max,
            },
          };
        } else if (condition !== 'range' && value !== null) {
          body[field.name] = {
            condition,
            value,
          };
        }
      }
    });
  
    // Process string fields
    this.stringFields.forEach((field) => {
      const value = formData[field.name]; // Get the value of the string field
  
      // Special handling for the certificate field
      if (field.name === 'certificate') {
        // Only include the certificate field if both general and precise values are provided
        if (value.general && value.precise) {
          const certificate = {
            general: value.general,
            precise: value.precise,
          };
          // Stringify the certificate object
          body[field.name] = JSON.stringify(certificate);
        }
      } else if (value) {
        // For other string fields
        body[field.name] = value; // Add the string field to the body object
      }
    });


    this.searchFields.forEach((field) => {
      const value = formData[field.name]; // Get the value of the string field
      if (value) {
        body[field.name] = value; // Add the string field to the body object
      }
    });
  
    console.log('Params:', params);
    console.log('Body:', body);
  
    // Make sure your API call is correctly handling params and body
    this.applicantsService.getApplicants({ ...params, ...body }).subscribe((res) => {
      this.applicants = res;
      this.applicants.forEach(applicant => {
        if (applicant.certificate) {
          applicant.certificate = JSON.parse(applicant.certificate);
        }
      });
    });
  }
  

  exportApplicantsData() {
    // Get the raw form value of the search form
    const formData = this.searchForm.getRawValue();
    // Prepare an object to hold the search filter parameters
    const searchFilter = {};
  
    // Process select fields for category and governorate
    this.searchFields.forEach((field) => {
      const value = formData[field.name]; // Get the value of the select field
      if (value) {
        searchFilter[field.name] = value; // Add the select field to the search filter object
      }
    });
  
    console.log(searchFilter);
  
    // Pass the search filter along with the export request
    this.excelService.exportApplicants(searchFilter).subscribe(blob => {
      this.downloadFile(blob);
    });
  }
  

  exportApplicantsHeaders() {
    this.excelService.exportApplicantsHeader().subscribe(blob => {
      this.downloadFile(blob);
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  importApplicants() {
    if (!this.file) {
      console.error('No file selected');
      return;
    }

    this.excelService.importApplicantsHeader(this.file).subscribe(
      () => {
        console.log('Applicants imported successfully');
        // Optionally, add any further logic you need upon successful import
      },
      error => {
        console.error('Error importing job descriptions:', error);
        // Handle error response from the server
      }
    );
  }

  private downloadFile(blob: Blob) {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'applicants_data.xlsx'; // Specify the filename
    downloadLink.click();
  }
  
  
  
}
