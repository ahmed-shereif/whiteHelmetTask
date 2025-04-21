import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetSalesTrendComponent } from './pet-sales-trend.component';


describe('PetSalesTrendComponent', () => {
  let component: PetSalesTrendComponent;
  let fixture: ComponentFixture<PetSalesTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetSalesTrendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetSalesTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
