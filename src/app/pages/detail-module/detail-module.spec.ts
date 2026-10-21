import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailModule } from './detail-module';

describe('DetailModule', () => {
  let component: DetailModule;
  let fixture: ComponentFixture<DetailModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailModule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
