import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  const authServiceMock = {
    user$: of(null),
    isAuthenticated$: of(false),
    loginWithRedirect: () => {},
    logout: () => {},
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterModule.forRoot([])],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();
  });

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render one menu entry per app page', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    // Count the *ngFor host elements rather than reading their projected
    // text: once Ionic registers ion-label as a custom element (globally,
    // triggered by any earlier IonicModule test), the label text moves into
    // shadow DOM and textContent becomes unreliable under random test order.
    const entries = fixture.nativeElement.querySelectorAll(
      '#inbox-list ion-menu-toggle'
    );
    expect(entries.length).toEqual(app.appPages.length);
  });

  it('should configure the expected navigation pages', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.appPages).toEqual([
      { title: 'Habits', url: '/habits', icon: 'paper-plane' },
      { title: 'Grooming', url: '/grooming', icon: 'swap-horizontal' },
      { title: 'Ideas', url: '/ideas', icon: 'bulb' },
      { title: 'Moods', url: '/moods', icon: 'happy' },
      { title: 'Targets', url: '/targets', icon: 'locate' },
    ]);
  });

});
