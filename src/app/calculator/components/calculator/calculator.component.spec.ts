import { CalculatorComponent } from '@app/calculator/components/calculator/calculator.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorService } from '@app/calculator/services/calculator.service';

class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('20');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('-');

  public constructNumber = jasmine.createSpy('constructNumber');

}


describe('CalculatorComponent ', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;

  });

  it('should create the app', () => {
    // console.log(compiled);
    expect(component).toBeTruthy();
  });
  it('should have initial getters', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('20');
    expect(component.lastOperator()).toBe('-');
  });
  it('should display proper calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('45');
    mockCalculatorService.lastOperator.and.returnValue('+');
    fixture.detectChanges();
    // console.log(compiled.querySelector('span')?.textContent);
    expect(compiled.querySelector('span')?.textContent).toBe('45 +');
    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('45');
    expect(component.lastOperator()).toBe('+');
  });
  it('should have 19 calculator-button components', () => {
    expect(component.calculatorButtons()).toBeTruthy;
    expect(component.calculatorButtons().length).toBe(19);
  });
  it('should have 19 calculator-button components with content projection', () => {
    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons.length).toBe(19);
    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
    expect(buttons[3].textContent?.trim()).toBe('÷');
  });
  it('should handle keyboard events correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');
    const eventEsc = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(eventEsc);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });
  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123.45');
    mockCalculatorService.subResultText.and.returnValue('10');
    mockCalculatorService.lastOperator.and.returnValue('/');
    fixture.detectChanges();
    expect(component.resultText()).toBe('123.45');
    console.log(compiled);
    expect(compiled.querySelector('#sub-result')?.textContent).toBe('10 /');

  });
});
