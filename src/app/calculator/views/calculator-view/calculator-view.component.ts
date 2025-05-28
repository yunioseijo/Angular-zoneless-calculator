import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { CalculatorComponent } from '@app/calculator/components/calculator/calculator.component';

@Component({
  selector: 'calculator-view',
  imports: [CalculatorComponent],
  templateUrl: './calculator-view.component.html',
  styleUrl: './calculator-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorViewComponent { }

