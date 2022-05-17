import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelGeneralSettingsComponent } from './admin-panel-general-settings.component';

describe('AdminPanelGeneralSettingsComponent', () => {
  let component: AdminPanelGeneralSettingsComponent;
  let fixture: ComponentFixture<AdminPanelGeneralSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelGeneralSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelGeneralSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
