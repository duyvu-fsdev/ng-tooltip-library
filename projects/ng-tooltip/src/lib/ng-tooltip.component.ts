import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { Option, Position } from './ng-tooltip.model';

@Component({
  selector: 'ng-tooltip',
  templateUrl: './ng-tooltip.component.html',
  styleUrls: ['../../styles/ng-tooltip.scss'],
})
export class TooltipComponent implements AfterViewInit {
  @Input() option!: Option;
  position: Position;
  top!: string;
  initTop!: string;
  left!: string;
  initLeft!: string;
  visible: boolean = false;
  private hostEl!: HTMLElement;
  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
    const wrapper = this.el.nativeElement.querySelector('.tooltip-wrapper');
    this.hostEl = wrapper.children[0] as HTMLElement;

    this.setInitPosition(this.option.position);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.visible = true;
    this.setPosition(this.adjustPosition());
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.visible = false;
  }

  private getHostPosition(hostEl: HTMLElement): {
    ml: number;
    mt: number;
    w: number;
    h: number;
  } {
    if (!hostEl) return { ml: 0, mt: 0, h: 0, w: 0 };
    const styles = getComputedStyle(hostEl);
    const w = parseFloat(styles.width);
    const h = parseFloat(styles.height);
    const mt = parseFloat(styles.marginTop);
    const ml = parseFloat(styles.marginLeft);
    return { mt, ml, w, h };
  }

  private setInitPosition(position: Position) {
    const tooltipEl = this.el.nativeElement.querySelector('.tooltip-container');
    const initTooltipEl = this.el.nativeElement.querySelector(
      '.init-tooltip-container'
    );
    if (!initTooltipEl || !tooltipEl || !this.hostEl) return;
    const { ml, mt, h, w } = this.getHostPosition(this.hostEl);

    switch (position) {
      case 'top':
        this.position = 'top';
        this.initTop = `${mt - 6}px`;
        this.initLeft = `${ml + w / 2}px`;
        break;
      case 'left':
        this.position = 'left';
        this.initTop = `${mt + h / 2}px`;
        this.initLeft = `${ml - 6}px`;
        break;
      case 'right':
        this.position = 'right';
        this.initTop = `${mt + h / 2}px`;
        this.initLeft = `${ml + w + 6}px`;
        break;
      default:
        this.position = 'bottom';
        this.initTop = `${mt + h + 6}px`;
        this.initLeft = `${ml + w / 2}px`;
        break;
    }

    if (this.option.class) {
      tooltipEl.classList.add(this.option.class);
      initTooltipEl.classList.add(this.option.class);
    }
    this.cdr.detectChanges();
  }

  private setPosition(position: Position) {
    const tooltipEl = this.el.nativeElement.querySelector('.tooltip-container');
    if (!tooltipEl) return;
    const { ml, mt, h, w } = this.getHostPosition(this.hostEl);
    switch (position) {
      case 'top':
        this.position = 'top';
        this.top = `${mt - 6}px`;
        this.left = `${ml + w / 2}px`;
        break;
      case 'left':
        this.position = 'left';
        this.top = `${mt + h / 2}px`;
        this.left = `${ml - 6}px`;
        break;
      case 'right':
        this.position = 'right';
        this.top = `${mt + h / 2}px`;
        this.left = `${ml + w + 6}px`;
        break;
      default:
        this.position = 'bottom';
        this.top = `${mt + h + 6}px`;
        this.left = `${ml + w / 2}px`;
        break;
    }
    this.cdr.detectChanges();
  }

  private adjustPosition(): 'top' | 'bottom' | 'left' | 'right' | undefined {
    const initTooltipEl = this.el.nativeElement.querySelector(
      '.init-tooltip-container'
    );
    if (!initTooltipEl) return undefined;
    const tooltipPos = initTooltipEl.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const isOverLeft = tooltipPos.left < 0;
    const isOverRight = tooltipPos.right > windowWidth;
    const isOverTop = tooltipPos.top < 0;
    const isOverBottom = tooltipPos.bottom > windowHeight;

    if (
      (isOverRight && !isOverLeft && !isOverTop && !isOverBottom) ||
      (isOverRight && isOverTop && isOverBottom && !isOverLeft) ||
      (isOverRight && isOverTop && !isOverLeft && !isOverBottom) ||
      (isOverRight && isOverBottom && !isOverLeft && !isOverTop)
    )
      return 'left';
    else if (
      (isOverLeft && isOverTop && !isOverRight && !isOverBottom) ||
      (isOverLeft && isOverBottom && !isOverRight && !isOverTop) ||
      (isOverTop && isOverBottom && !isOverLeft && !isOverRight) ||
      (isOverLeft && !isOverRight && !isOverTop && !isOverBottom) ||
      (isOverLeft && isOverTop && isOverBottom && !isOverRight)
    )
      return 'right';
    else if (
      (isOverLeft && isOverRight && isOverTop && !isOverBottom) ||
      (isOverTop && !isOverLeft && !isOverRight && !isOverBottom) ||
      (isOverLeft && isOverRight && !isOverTop && !isOverBottom)
    )
      return 'bottom';
    else if (
      (isOverLeft && isOverRight && isOverBottom && !isOverTop) ||
      (isOverBottom && !isOverLeft && !isOverRight && !isOverTop)
    )
      return 'top';
    else return this.option.position;
  }
}
