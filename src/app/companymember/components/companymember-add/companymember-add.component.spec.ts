import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanymemberAddComponent } from './companymember-add.component';

describe('CompanymemberAddComponent', () => {
  let component: CompanymemberAddComponent;
  let fixture: ComponentFixture<CompanymemberAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanymemberAddComponent]
    });
    fixture = TestBed.createComponent(CompanymemberAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
