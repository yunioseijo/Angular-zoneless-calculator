
import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';

describe('CalculatorViewComponent', () => {

  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;
  let component: CalculatorViewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it('should render calculator component', () => {
    expect(compiled.querySelector('calculator')).toBeTruthy();
  });
  it('should contain basic css classes', () => {
    const divElement = compiled.querySelector('div');
    const mustHaveClasses = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');
    expect(divElement).toBeTruthy();
    mustHaveClasses.forEach((className) => {
      expect(divElement!.classList.contains(className)).toBeTrue();
    });
  });
});
