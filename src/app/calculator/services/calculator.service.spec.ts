import { CalculatorService } from '@app/calculator/services/calculator.service';
import { TestBed } from '@angular/core/testing';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should ignore invalid input', () => {
    service.constructNumber('invalid');
    expect(service.resultText()).toBe('0');
  });

  it('should clear values with C', () => {
    service.resultText.set('123');
    service.subResultText.set('456');
    service.lastOperator.set('-');
    service.constructNumber('C');
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should handle Backspace', () => {
    service.resultText.set('123');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('12');
    service.constructNumber('Backspace');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle +/-', () => {
    service.resultText.set('5');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-5');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('5');
  });

  it('should handle decimal point', () => {
    service.resultText.set('1');
    service.constructNumber('.');
    expect(service.resultText()).toBe('1.');
    service.constructNumber('.');
    expect(service.resultText()).toBe('1.'); // no doble punto
  });

  it('should build numbers', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    expect(service.resultText()).toBe('12');
  });

  it('should not allow leading zero', () => {
    service.resultText.set('0');
    service.constructNumber('0');
    expect(service.resultText()).toBe('0');
  });

  it('should perform addition', () => {
    service.resultText.set('2');
    service.constructNumber('+');
    service.constructNumber('3');
    service.constructNumber('=');
    expect(service.resultText()).toBe('5');
  });

  it('should perform subtraction', () => {
    service.resultText.set('5');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('3');
  });

  it('should perform multiplication', () => {
    service.resultText.set('4');
    service.constructNumber('*');
    service.constructNumber('3');
    service.constructNumber('=');
    expect(service.resultText()).toBe('12');
  });

  it('should perform multiplication with X as operator', () => {
    service.resultText.set('6');
    service.constructNumber('x');
    service.constructNumber('7');
    service.constructNumber('=');
    expect(service.resultText()).toBe('42');
  });

  it('should perform division', () => {
    service.resultText.set('8');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('4');
  });

  it('should not exceed max length', () => {
    service.resultText.set('1234567890');
    service.constructNumber('1');
    expect(service.resultText()).toBe('1234567890');
  });

  it('should update resultText with number input', () => {
    service.resultText.set('0');
    service.constructNumber('5');
    expect(service.resultText()).toBe('5');
  });
  it('should update subResultText when operator is pressed', () => {
    service.resultText.set('10');
    service.constructNumber('+');
    expect(service.subResultText()).toBe('10');
    expect(service.resultText()).toBe('0');
  });

  it('should handle multiple operations correctly', () => {
    service.resultText.set('10');
    service.constructNumber('+');
    service.constructNumber('5');
    service.constructNumber('=');
    expect(service.resultText()).toBe('15');

    service.constructNumber('-');
    service.constructNumber('3');
    service.constructNumber('=');
    expect(service.resultText()).toBe('12');

    service.constructNumber('*');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('24');

    service.constructNumber('/');
    service.constructNumber('4');
    service.constructNumber('=');
    expect(service.resultText()).toBe('6');
  });

  it('should handle division by zero', () => {
    service.resultText.set('10');
    service.constructNumber('/');
    service.constructNumber('0');
    service.constructNumber('=');
    expect(service.resultText()).toBe('Error'); // Assuming you handle division by zero with an error message
  });

  it('should handle percentage operator', () => {
    service.resultText.set('200');
    service.constructNumber('%');
    expect(service.resultText()).toBe('2'); // Assuming 200% is treated as 2
  });



});



