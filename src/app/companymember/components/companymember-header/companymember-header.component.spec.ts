import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanymemberHeaderComponent } from './companymember-header.component';

describe('CompanymemberHeaderComponent', () => {
  let component: CompanymemberHeaderComponent;
  let fixture: ComponentFixture<CompanymemberHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanymemberHeaderComponent]
    });
    fixture = TestBed.createComponent(CompanymemberHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
