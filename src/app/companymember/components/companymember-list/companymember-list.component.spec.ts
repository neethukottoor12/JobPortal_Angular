import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanymemberListComponent } from './companymember-list.component';

describe('CompanymemberListComponent', () => {
  let component: CompanymemberListComponent;
  let fixture: ComponentFixture<CompanymemberListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanymemberListComponent]
    });
    fixture = TestBed.createComponent(CompanymemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
