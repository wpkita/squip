import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);

  public appPages = [
    { title: 'Habits', url: '/habits', icon: 'paper-plane' },
    { title: 'Grooming', url: '/grooming', icon: 'swap-horizontal' },
    { title: 'Ideas', url: '/ideas', icon: 'bulb' },
    { title: 'Moods', url: '/moods', icon: 'happy' },
    { title: 'Targets', url: '/targets', icon: 'locate' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  user: any;

  ngOnInit(): void {
    this.fillUserDetails();
  }

  fillUserDetails(): void {
    this.authService.user$.subscribe((user: any) => {
      if (!!user) {
        this.user = user;
      }
    });
  }

  login(): void {
    this.authService.loginWithRedirect();
  }

  logout(): void {
    this.authService.logout({
      logoutParams: {
        returnTo: document.location.origin
      }
    });
  }
}
