import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import AddGovernorateDialogComponent from '../governorate/add-governorate-dialog/add-governorate-dialog.component';
import { PublicEntitieService } from 'src/app/theme/shared/services/public-entitie.service';
import AddShowPublicEntitiesComponent from './add-show-public-entities/add-show-public-entities.component';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';
import { AuthService } from 'src/app/Auth/auth.service';

interface PublicEntitieNode {
  id: number; // Add id property to PublicEntitieNode
  public_entity_id?: number; // Add id property to PublicEntitieNode
  name: string;
  parentName:string;
  children?: PublicEntitieNode[];
}

interface ExampleFlatNode {
  id?: number; // Add id property to ExampleFlatNode
  public_entity_id?: number; // Add id property to ExampleFlatNode
  parentName:string;
  expandable: boolean;
  name: string;
  level: number;
  children?: ExampleFlatNode[]; // Add children property to ExampleFlatNode for sub-affiliated entities
}

@Component({
  selector: 'app-public-entities',
  templateUrl: './public-entities.component.html',
  styleUrls: ['./public-entities.component.scss'],
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, SharedModule],
})
export default class PublicEntitiesComponent implements OnInit {
  private _transformer = (node: PublicEntitieNode, level: number,) => {
    return {
      id: node.id, // Include id property
      public_entitie_id: node.public_entity_id,// Add id property to ExampleFlatNode
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      parentName:node.parentName,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
    
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  role:string;
  permissions:any;
  constructor(private publicEntitieService: PublicEntitieService,
    private dialog:MatDialog,
    private translate:TranslationService,
    private authService:AuthService

    ) {}

    ngOnInit() {
      this.getData();
      this.translate.setLanguage(localStorage.getItem('i18nextLng'));

    
              this.role = localStorage.getItem('role');
              this.permissions = this.authService.permissionsService();
    }
    
    performDelete(node): void {
      this.publicEntitieService.deletePublicEntity(node)
        .subscribe(res => {
          // Refresh data after successful deletion
          this.getData();
        });
    }

// Add this function to refresh the data
getData(): void {
  this.publicEntitieService.getPublicEntitieData().subscribe((res) => {
    console.log(res);
    const publicEntities: PublicEntitieNode[] = res.data.map((publicEntity) => {
      const subEntities: PublicEntitieNode[] = publicEntity.sub_entities
        ? publicEntity.sub_entities.map((subEntity) => ({
            ...subEntity,
            parentName: publicEntity.name,
            children: subEntity.affiliated_entities
              ? subEntity.affiliated_entities.map((affiliatedEntity) => ({
                  ...affiliatedEntity,
                  parentName: subEntity.name,
                  children: affiliatedEntity.sub_affiliated_entities
                    ? affiliatedEntity.sub_affiliated_entities.map((subAffiliatedEntity) => ({
                        ...subAffiliatedEntity,
                        parentName: affiliatedEntity.name,
                      }))
                    : [],
                }))
              : [],
          }))
        : [];

      return {
        id: publicEntity.id,
        name: publicEntity.name,
        children: subEntities,
      };
    });

    this.dataSource.data = publicEntities;
  });
}






onPreview(node: ExampleFlatNode) {
  const dialogRef = this.dialog.open(AddShowPublicEntitiesComponent, {
    data:node.id ,
    width: '50%', 
    height: '90%', 
  });

  dialogRef.afterClosed().subscribe((result) => {
    this.getData();
  });
}

onDelete(node: ExampleFlatNode): void {
  console.log(node)
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: {
      message: 'Are you sure you want to delete ?',
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // User clicked "Delete"
      this.performDelete(node);
      this.getData();
    }
  });
}

addPublicEntitiy(){
  const dialogRef = this.dialog.open(AddShowPublicEntitiesComponent, {
    width: '50%', 
    height: '90%', 
  });
  dialogRef.afterClosed().subscribe((result)=>{
      this.getData();
  })
}


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
