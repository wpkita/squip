import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';

import { IdeasPage } from './ideas.page';

describe('IdeasPage', () => {
  let component: IdeasPage;
  let fixture: ComponentFixture<IdeasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],
      declarations: [ IdeasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdeasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
