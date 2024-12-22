import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalStockComponent } from './final-stock.component';

describe('FinalStockComponent', () => {
  let component: FinalStockComponent;
  let fixture: ComponentFixture<FinalStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
