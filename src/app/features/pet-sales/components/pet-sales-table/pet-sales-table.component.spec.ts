import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSalesTableComponent } from './pet-sales-table.component';

describe('PetSalesTableComponent', () => {
  let component: PetSalesTableComponent;
  let fixture: ComponentFixture<PetSalesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetSalesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetSalesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
