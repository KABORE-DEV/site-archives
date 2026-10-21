import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadrePrincipal } from './cadre-principal';

describe('CadrePrincipal', () => {
  let component: CadrePrincipal;
  let fixture: ComponentFixture<CadrePrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadrePrincipal],
    }).compileComponents();

    fixture = TestBed.createComponent(CadrePrincipal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
