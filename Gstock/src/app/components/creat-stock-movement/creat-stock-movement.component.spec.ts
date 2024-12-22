import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatStockMovementComponent } from './creat-stock-movement.component';

describe('CreatStockMovementComponent', () => {
  let component: CreatStockMovementComponent;
  let fixture: ComponentFixture<CreatStockMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatStockMovementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatStockMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
