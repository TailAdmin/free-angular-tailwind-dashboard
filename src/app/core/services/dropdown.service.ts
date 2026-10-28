import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  private activeDropdownSubject = new BehaviorSubject<string | null>(null);

  /** Observable emitting the ID of the currently open dropdown, or null if none */
  activeDropdown$: Observable<string | null> = this.activeDropdownSubject.asObservable();

  /** Get active dropdown ID synchronously */
  get activeDropdown(): string | null {
    return this.activeDropdownSubject.value;
  }

  /** Open a dropdown by ID (automatically closing any previously open dropdown) */
  open(id: string): void {
    this.activeDropdownSubject.next(id);
  }

  /** Toggle a dropdown by ID */
  toggle(id: string): void {
    if (this.activeDropdownSubject.value === id) {
      this.activeDropdownSubject.next(null);
    } else {
      this.activeDropdownSubject.next(id);
    }
  }

  /** Close specific dropdown by ID, or close all dropdowns if no ID is passed */
  close(id?: string): void {
    if (!id || this.activeDropdownSubject.value === id) {
      this.activeDropdownSubject.next(null);
    }
  }

  /** Close all open dropdowns */
  closeAll(): void {
    this.activeDropdownSubject.next(null);
  }

  /** Check if specific dropdown is currently open */
  isOpen(id: string): boolean {
    return this.activeDropdownSubject.value === id;
  }
}
