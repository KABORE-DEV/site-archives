import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjoutArchive } from './ajout-archive';

describe('AjoutArchive', () => {
  let component: AjoutArchive;
  let fixture: ComponentFixture<AjoutArchive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutArchive],
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutArchive);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
