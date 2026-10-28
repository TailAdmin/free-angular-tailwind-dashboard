import { Direction } from '@angular/cdk/bidi';
import { EventEmitter, Injectable, OnDestroy, signal } from '@angular/core';

/**
 * Replaces the CDK `Directionality` so overlays (dropdown menus, etc.) always use the
 * current document direction. The stock service reads `dir` once at startup, so after
 * switching language (ltr <-> rtl) menus kept opening on the wrong side until a reload.
 */
@Injectable()
export class LiveDirectionality implements OnDestroy {
  readonly change = new EventEmitter<Direction>();
  /** Signal form of the direction, read by spartan-ng brain overlays. */
  readonly valueSignal = signal<Direction>('ltr');
  private observer?: MutationObserver;
  private last: Direction;

  constructor() {
    this.last = this.read();
    this.valueSignal.set(this.last);
    if (typeof document !== 'undefined' && typeof MutationObserver !== 'undefined') {
      this.observer = new MutationObserver(() => {
        const next = this.read();
        if (next !== this.last) {
          this.last = next;
          this.valueSignal.set(next);
          this.change.emit(next);
        }
      });
      this.observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['dir'],
      });
    }
  }

  get value(): Direction {
    return this.read();
  }

  private read(): Direction {
    if (typeof document === 'undefined') return 'ltr';
    const dir = document.documentElement.dir || document.body?.dir;
    return dir === 'rtl' ? 'rtl' : 'ltr';
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.change.complete();
  }
}
