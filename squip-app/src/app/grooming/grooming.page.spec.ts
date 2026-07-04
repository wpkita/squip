import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';

import { GroomingPage } from './grooming.page';

describe('GroomingPage', () => {
  let component: GroomingPage;
  let fixture: ComponentFixture<GroomingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],
      declarations: [ GroomingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroomingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
