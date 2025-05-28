import { booleanAttribute, ChangeDetectionStrategy, Component, ElementRef, Host, HostBinding, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
  },
})
export class CalculatorButtonComponent {
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public isPressed = signal(false);


  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  });
  public isDoubleSize =input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  });
  //Esta es la forma antigua y no recomendada por angular
  // @HostBinding('class.w-2/4') get commandStyle() {
  //   return this.isDoubleSize();
  // }

  handleClick(){
    if(!this.contentValue()?.nativeElement) {
      return;
    }
    const value =this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(value.trim());
  }
  public keyboardPressedStyle(key: string) {
    if(!this.contentValue()) return;
    const value = this.contentValue()!.nativeElement.innerText;
    if ( value !== key ) return;
    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);

  }

 }
