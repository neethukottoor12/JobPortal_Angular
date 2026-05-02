import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanymemberHomeComponent } from './companymember-home.component';

describe('CompanymemberHomeComponent', () => {
  let component: CompanymemberHomeComponent;
  let fixture: ComponentFixture<CompanymemberHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanymemberHomeComponent]
    });
    fixture = TestBed.createComponent(CompanymemberHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
