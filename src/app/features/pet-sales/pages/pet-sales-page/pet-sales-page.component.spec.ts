import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSalesPageComponent } from './pet-sales-page.component';

describe('PetSalesPageComponent', () => {
  let component: PetSalesPageComponent;
  let fixture: ComponentFixture<PetSalesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetSalesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetSalesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
