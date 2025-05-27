import { ChangeDetectionStrategy, Component, } from '@angular/core';

@Component({
  selector: 'calculator-view',
  imports: [],
  templateUrl: './calculator-view.component.html',
  styleUrl: './calculator-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorViewComponent { }

