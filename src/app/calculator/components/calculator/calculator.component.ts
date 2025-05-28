import { ChangeDetectionStrategy, Component, input, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  public calculatorButtons = viewChildren(CalculatorButtonComponent);
  handleClick(key: string) {
    console.log('Button clicked:', key);
  }
  // @HostListener('document:keyup', ['$event'])  // Esta es la forma antigua y no recomendada por angular
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      'Enter': '=',
      'Backspace': 'C',
      'Escape': 'C',
      'Delete': 'C',
      '*': 'x',
      '/': '÷',

    }
      const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);
    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(keyValue);
    });
  }

 }
