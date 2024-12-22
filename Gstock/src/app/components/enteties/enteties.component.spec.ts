import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntetiesComponent } from './enteties.component';

describe('EntetiesComponent', () => {
  let component: EntetiesComponent;
  let fixture: ComponentFixture<EntetiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntetiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntetiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
