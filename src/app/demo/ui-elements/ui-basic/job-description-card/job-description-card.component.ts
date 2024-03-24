import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { JobDescriptionService } from 'src/app/theme/shared/services/job-description.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';
import { Router } from '@angular/router';
import { GovernorateService } from 'src/app/theme/shared/services/governorate-description.service';
import { GenerateResultsService } from 'src/app/theme/shared/services/generate-results.service';
import { Category, SharedService } from 'src/app/theme/shared/services/shared.service';
import { ExcelService } from 'src/app/theme/shared/services/excel.service';
import { AuthService } from 'src/app/Auth/auth.service';

interface JobDescription {
  id: number;
  status: number;
  category: string;
  public_entity: string;
  sub_entity: string;
  job_title: string;
  governorate: string;
  work_centers: string;
  assignees: number;
  vacancies: number;
  card_number: string;
  general: string;
  record_entry: string;
  entry_date: string;
  last_modifier: string;
  modification_date: string;
  audited_by: string;
}

interface NumericField {
  name: string;
  label: string;
  conditions: { value: string; label: string }[]; 
  selectedCondition?: string;
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

interface TableColumn {
  name: string;
  label: string;
  sortable: boolean;
}

@Component({
  selector: 'app-job-description',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './job-description-card.component.html',
  styleUrls: ['./job-description-card.component.scss'],
})
export default class JobDescriptionCardComponent implements OnInit  {
  jobDescriptions: any[] = [];
  searchForm: FormGroup;
  governorateOptions: { value: string; label: string }[] = [];
  categoryOptions: { value: string; label: string }[] = []; // Add categoryOptions
  selectedJobIds: number[] = [];

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
    { name: 'work_centers', label: 'Work Centers',
    conditions: [
      { value: 'equals', label: 'Equals' },
      { value: 'greater_than', label: 'Greater Than' },
      { value: 'less_than', label: 'Less Than' },
      { value: 'greater_than_or_equal', label: 'Greater Than or Equal To' },
      { value: 'less_than_or_equal', label: 'Less Than or Equal To' },
      { value: 'range', label: 'Range' },
    ] },
    { name: 'assignees', label: 'Assignees',
    conditions: [
      { value: 'equals', label: 'Equals' },
      { value: 'greater_than', label: 'Greater Than' },
      { value: 'less_than', label: 'Less Than' },
      { value: 'greater_than_or_equal', label: 'Greater Than or Equal To' },
      { value: 'less_than_or_equal', label: 'Less Than or Equal To' },
      { value: 'range', label: 'Range' },
    ] },
    { name: 'vacancies', label: 'Vacancies',
    conditions: [
      { value: 'equals', label: 'Equals' },
      { value: 'greater_than', label: 'Greater Than' },
      { value: 'less_than', label: 'Less Than' },
      { value: 'greater_than_or_equal', label: 'Greater Than or Equal To' },
      { value: 'less_than_or_equal', label: 'Less Than or Equal To' },
      { value: 'range', label: 'Range' },
    ] },
    { name: 'card_number', label: 'Card Number',
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
    { name: 'status', label: 'Status' },
    { name: 'public_entity', label: 'Public_Entity' },
    { name: 'sub_entity', label: 'Sub_Entity' },
    { name: 'job_title', label: 'Job_Title' },
    { name: 'record_entry', label: 'Record_Entry' },
    { name: 'last_modified', label: 'Last Modified' },
    { name: 'audited_by', label: 'Audited_By' },
  ];

  searchFields: SelectField[] = [
    { name: 'category', label: 'Category', options: [] },
    { name: 'governorate', label: 'Governorate', options: [] },
  ];


  columnData: TableColumn[] = [
    // { name: '', label: '#', sortable: false },
    { name: '', label: '', sortable: false },
    { name: 'id', label: 'ID', sortable: true },
    { name: 'status', label: 'Status', sortable: true },
    { name: 'details', label: 'Details', sortable: false },
    { name: 'delete', label: 'Delete', sortable: false },
    { name: 'category', label: 'Category', sortable: true },
    { name: 'public_entity', label: 'Public Entity', sortable: true },
    { name: 'sub_entity', label: 'Sub Entity', sortable: true },
    { name: 'governorate', label: 'Governorate', sortable: true },
    { name: 'job_title', label: 'Job Title', sortable: true },
    { name: 'work_centers', label: 'Work Centers', sortable: true },
    { name: 'assignees', label: 'Separated Count', sortable: true },
    { name: 'vacancies', label: 'Vacancies Count', sortable: true },
    { name: 'card_number', label: 'Card Number', sortable: true },
    // { name: 'general', label: 'Specialization', sortable: true },
    { name: 'record_entry', label: 'Record Entry', sortable: true },
    { name: 'entry_date', label: 'Entry Date', sortable: true },
    { name: 'last_modifier', label: 'Last Modifier', sortable: true },
    { name: 'modification_date', label: 'Modification Date', sortable: true },
    { name: 'audited_by', label: 'Verified by', sortable: true },
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
  selectedFileName: string | null = null; // Variable to store the selected file name

  constructor(
    private JobDescription:JobDescriptionService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private translate:TranslationService,
    private router: Router,
    private sharedService:SharedService,
    private governorateService:GovernorateService,
    private generateResult:GenerateResultsService,
    private excelService:ExcelService,
    private authService:AuthService
    ){}
    
    ngOnInit(): void {
      // Initialize the form controls
      this.initForm();
  
      this.jobDescriptionTable();

      this.translate.setLanguage(localStorage.getItem('i18nextLng'));

      this.categoryOptions = Object.keys(Category).map(key => ({ value: Category[key], label: this.sharedService.getCategoryString(Category[key]) }));
      this.searchFields.find(field => field.name === 'category').options = this.categoryOptions;

      this.governorateService.getGovernorateData().subscribe((response: any) => {
        const data = response.data; // Access the 'data' property of the response
        this.governorateOptions = data.map((item) => ({ value: item.name, label: item.name }));
        // Update the select field options
        this.searchFields.find((field) => field.name === 'governorate').options = this.governorateOptions;
      });

      this.role = localStorage.getItem('role');
      this.permissions = this.authService.permissionsService();
      
    }
    
    

    jobDescriptionTable(){
      this.JobDescription.jobDescriptionTableData().subscribe((res: any[]) => {
        this.jobDescriptions = res;
        this.calculateTotalPages();
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
        stringFieldControls[field.name] = [null];
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
    

    paginateData(): JobDescription[] {
      const startIndex = (this.currentPage - 1) * this.pageSizeSelected;
      const endIndex = Math.min(startIndex + this.pageSizeSelected, this.jobDescriptions.length);
      return this.jobDescriptions.slice(startIndex, endIndex);
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
      this.currentPage = this.totalPages;
  }
  
  getRange(): string {
    const startIndex = (this.currentPage - 1) * this.pageSizeSelected + 1;
    const endIndex = Math.min(startIndex + this.pageSizeSelected - 1, this.jobDescriptions.length);
    return `${startIndex} - ${endIndex}`;
}

  
    changePageSize(size: number): void {
      this.pageSizeSelected = size;
      this.currentPage = 1; // Reset to the first page when changing page size
      this.calculateTotalPages();
    }
  
    calculateTotalPages(): void {
      this.totalPages = Math.ceil(this.jobDescriptions.length / this.pageSizeSelected);
    }
  
    sortColumn(columnName: any): void {
      // Check if the column is already being sorted and toggle sorting order
      if (this.sortedColumn === columnName) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        // If sorting a different column, reset sorting order to ascending
        this.sortOrder = 'asc';
        this.sortedColumn = columnName;
      }
    
      this.jobDescriptions.sort((a, b) => {
        if (typeof a[columnName] === 'number' && typeof b[columnName] === 'number') {
          // Compare numbers directly based on sorting order
          return this.sortOrder === 'asc' ? a[columnName] - b[columnName] : b[columnName] - a[columnName];
        } else {
          // Use string comparison for non-numeric values based on sorting order
          return this.sortOrder === 'asc' ? a[columnName].localeCompare(b[columnName]) : b[columnName].localeCompare(a[columnName]);
        }
      });
    }
    
    

    
    
    showDetails(id) {
      this.router.navigate(['/basic/job-description-details', id]);
    }

    addJobDescription(){
      this.router.navigate(['/basic/job-description-details']);
    }
    
  deleteRecord(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      position: { top: '10px', left: '10px' },
      data: { message: 'Are you sure you want to delete this record ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed, perform delete action
        this.JobDescription.jobDescriptionTableDataDeletesolo(id).subscribe(res => {
          if(res){
            this.jobDescriptionTable();
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
      if (value) {
        body[field.name] = value; // Add the string field to the body object
      }
    });

    this.searchFields.forEach((field) => {
      const value = formData[field.name]; // Get the value of the string field
      if (value) {
        body[field.name] = value; // Add the string field to the body object
      }
    });

  

  
    // Make sure your API call is correctly handling params and body
    this.JobDescription.jobDescriptionTableData({ ...params, ...body }).subscribe((res) => {
      this.jobDescriptions = res;
    });
  }
  
  getCategoryString(category){
    return this.sharedService.getCategoryString(category);
  }
  getStatusString(status){
    return this.sharedService.getStatusString(status);
  }

  isRed(job: any): boolean {
    return job.assignees === 0;
  }
  
  isOrange(job: any): boolean {
    return job.assignees > 0 && job.assignees < job.vacancies;
  }
  
  isGreen(job: any): boolean {
    return job.assignees === job.vacancies;
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
            this.jobDescriptionTable();
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
            this.jobDescriptionTable();
          }
        });
      }
    });
  }

  exportJobDescription() {
    this.excelService.exportJobDescriptionExcel().subscribe(blob => {
      this.downloadFile(blob);
    });
  }

  exportJobDescriptionHeaders() {
    this.excelService.exportJobDescriptionHeader().subscribe(blob => {
      this.downloadFile(blob);
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.selectedFileName = this.file ? this.file.name : null; // Update selectedFileName with the file name
  }

  importJobDescriptions() {
    if (!this.file) {
      console.error('No file selected');
      return;
    }

    this.excelService.importJobDescriptionHeader(this.file).subscribe(
      () => {
        this.jobDescriptionTable();
        this.file = null;
        this.selectedFileName = null;
        this.sharedService.openSnackBar('Job Description data has been added successfully', 'close');
        this.getRange();
      },
      error => {
        console.error('Error importing job descriptions:', error);
        if(error){
          this.sharedService.openSnackBar('Job Description data has not been added', 'close');
        }

        // Handle error response from the server
      }
    );
  }

  private downloadFile(blob: Blob) {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'job_descriptions_data.xlsx'; // Specify the filename
    downloadLink.click();
  }

  selectAll(event: any): void {
    const checked = event.target.checked;
    if (checked) {
      // Select all job IDs
      this.selectedJobIds = this.jobDescriptions.map(job => job.id);
    } else {
      // Deselect all job IDs
      this.selectedJobIds = [];
    }
  }
  
  toggleSelection(event: any, jobId: number): void {
    const checked = event.target.checked;
    if (checked) {
      // Add job ID to the selected list
      this.selectedJobIds.push(jobId);
    } else {
      // Remove job ID from the selected list
      this.selectedJobIds = this.selectedJobIds.filter(id => id !== jobId);
    }
  }
  
  
  isSelected(jobId: number): boolean {
    // Check if a job ID is selected
    return this.selectedJobIds.includes(jobId);
  }
  

  
  deleteSelected(): void {
    // Check if any job IDs are selected
    if (this.selectedJobIds.length === 0) {
      // If no job IDs are selected, show an alert or toast message
      return;
    }
  
    // Open confirmation dialog to confirm deletion of selected job descriptions
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      position: { top: '10px', left: '10px' },
      data: { message: 'Are you sure you want to delete selected job descriptions' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed, send request to delete selected job descriptions
        this.JobDescription.jobDescriptionTableDataDelete(this.selectedJobIds).subscribe(res => {
          if (res) {
            // All selected job descriptions deleted successfully
            this.selectedJobIds = []; // Clear the selected IDs array
            this.jobDescriptionTable(); // Refresh the table data
            this.sharedService.openSnackBar('Selected Job Description has been deleted successfully', 'close');

          }
        });
      }
    });
  }
  
  
  

  
  
}
