import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from 'src/app/Auth/auth.service';
import { Router } from '@angular/router';
import { TokenAuthService } from 'src/app/Auth/token-auth.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class NavRightComponent implements OnInit {
  visibleUserList: boolean;
  chatMessage: boolean;
  friendId: boolean;
  username:string;
  role:string;
  constructor(config: NgbDropdownConfig,
    private authService:AuthService,
    private router: Router,
    private tokenAuthService:TokenAuthService
    ) {
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.chatMessage = false;
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.username=localStorage.getItem('username');
  }

  logout() {
    this.authService.logout().subscribe({
      next:(res : any) => {
        this.router.navigate(['login']);
        this.tokenAuthService.destroyToken();
      },
    //  error : (error : any) => {
    //     this.openSnackBar(error.message, 'Close');
    //   }
  });
  }

  onChatToggle(friend_id) {
    this.friendId = friend_id;
    this.chatMessage = !this.chatMessage;
  }
  adminPage(){
    this.router.navigate(['/Admin']);
  }
}
