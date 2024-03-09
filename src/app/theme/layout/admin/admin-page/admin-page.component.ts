import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  standalone:true,
  imports: [SharedModule],
})
export default class AdminPageComponent {

  users: any;
  searchTerm: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private translate:TranslationService,
    ) {}

  ngOnInit(): void {
    this.translate.setLanguage(localStorage.getItem('i18nextLng'));

    this.authService.getUsers().subscribe(users =>
      {
       this.users = users.users.filter(user => user.role !== 'Admin');
      });
  }

  toggleActive(user: any): void {
    user.permissions.canActive = user.permissions.canActive === 0 ? 1 : 0;
    this.authService.updateCanActive(user.id,user.permissions.canActive)
      .subscribe(() => console.log('User status updated'));
  }

  navigateSignup(){
    this.router.navigate(['/signup'])
  }

  onUserSearch(event: any): void {
    const term: string = event.target.value;
    this.searchTerm = term.trim().toLowerCase();
    if (!this.searchTerm) {
      // If search term is empty, reset the users list
      this.authService.getUsers().subscribe(users => {
        this.users = users.users.filter(user => user.role !== 'Admin');
      });
    } else {
      // Filter users based on search term
      this.users = this.users.filter(user => 
        user.name.toLowerCase().includes(this.searchTerm)
      );
    }
  }
  

  navigateToPermissions(userID){
    this.router.navigate(['/users-permissions', userID]);
  }
}
