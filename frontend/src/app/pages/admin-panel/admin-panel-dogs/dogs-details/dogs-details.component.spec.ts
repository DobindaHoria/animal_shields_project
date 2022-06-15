import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsDetailsComponent } from './dogs-details.component';

describe('DogsDetailsComponent', () => {
  let component: DogsDetailsComponent;
  let fixture: ComponentFixture<DogsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
