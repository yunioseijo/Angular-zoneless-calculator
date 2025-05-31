import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CalculatorButtonComponent } from "./calculator-button.component";

import { Component} from '@angular/core';
@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="projected-content underline">Test Content</span>
    </calculator-button>
  `,
})
class TestHostComponent {
  isDoubleSize = false;
}


describe('CalculatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compile: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compile = fixture.nativeElement as HTMLElement
    component  = fixture.componentInstance
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should apply w-1/4 doubleSize is false', () => {
    const hostCssClasses: string[] = compile.classList.value.split(' ');
    expect(hostCssClasses).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse();
  });
  it('should apply w-2/4 doubleSize is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();
    const hostCssClasses: string[] = compile.classList.value.split(' ');
    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
  });
  it('should emit onClick when button is clicked', () => {
    component.handleClick();
    spyOn(component.onClick, 'emit');
    const buttonElement = compile.querySelector('button') as HTMLButtonElement;
    expect(buttonElement).toBeTruthy();
    buttonElement.innerText = '5';
    buttonElement.click();
    expect(component.onClick.emit).toHaveBeenCalledWith('5');
  });
  it('should emit onClick when hableClick is called', () => {
    spyOn(component.onClick, 'emit');
    component.handleClick();
    expect(component.onClick.emit).toHaveBeenCalled();
  });
  it('should set isPressed to true and the false when keyboardPressedStyle is called with a matching key', (done) => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('1');
    expect(component.isPressed()).toBeTrue();
    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 150);
  });
  // another way to test the same functionality
  it('should set isPressed to true and then false in keyboardPressedStyle', (done) => {
    const buttonElement = compile.querySelector('button') as HTMLButtonElement;
    expect(buttonElement).toBeTruthy();
    buttonElement.innerText = '1';
    spyOn(component, 'contentValue').and.returnValue({ nativeElement: buttonElement } as any);
    component.keyboardPressedStyle('1');
    expect(component.isPressed()).toBeTrue();
    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 150);
  });
  it('should not set is-pressed to true if key does not match', () => {
    component.contentValue()!.nativeElement.innerText = '2';
    component.keyboardPressedStyle('1');
    expect(component.isPressed()).toBeFalse();
  });
  it('should display projected content', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    const compiled = testHostFixture.nativeElement as HTMLElement;
    const projectedContent = compiled.querySelector('.projected-content');
    expect(projectedContent).toBeTruthy();
    expect(projectedContent?.textContent).toContain('Test Content');
    expect(projectedContent?.classList).toContain('underline');
  });
});
