import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelDogsComponent } from './admin-panel-dogs.component';

describe('AdminPanelDogsComponent', () => {
  let component: AdminPanelDogsComponent;
  let fixture: ComponentFixture<AdminPanelDogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelDogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
