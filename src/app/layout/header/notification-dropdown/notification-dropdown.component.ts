import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DropdownComponent } from '../../../shared/components/ui/dropdown/dropdown.component';
import { DropdownItemComponent } from '../../../shared/components/ui/dropdown/dropdown-item/dropdown-item.component';
import { DropdownService } from '../../../core/services/dropdown.service';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

interface NotificationItem {
  id: string;
  name: string;
  avatar: string;
  action: string;
  project: string;
  time: string;
  status: 'online' | 'offline' | 'busy';
}

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  imports: [ButtonComponent, CommonModule, RouterModule, DropdownComponent, DropdownItemComponent]
})
export class NotificationDropdownComponent implements OnInit, OnDestroy {
  readonly dropdownId = 'notification-dropdown';
  isOpen = false;
  notifying = true;

  notifications: NotificationItem[] = [
    {
      id: '1',
      name: 'Terry Franci',
      avatar: '/images/user/user-02.jpg',
      action: 'requests permission to change',
      project: 'Project - Nganter App',
      time: '5 min ago',
      status: 'online',
    },
    {
      id: '2',
      name: 'Alena Franci',
      avatar: '/images/user/user-03.jpg',
      action: 'requests permission to change',
      project: 'Project - Nganter App',
      time: '8 min ago',
      status: 'online',
    },
    {
      id: '3',
      name: 'Jocelyn Kenter',
      avatar: '/images/user/user-04.jpg',
      action: 'requests permission to change',
      project: 'Project - Nganter App',
      time: '15 min ago',
      status: 'online',
    },
    {
      id: '4',
      name: 'Brandon Philips',
      avatar: '/images/user/user-05.jpg',
      action: 'requests permission to change',
      project: 'Project - Nganter App',
      time: '1 hr ago',
      status: 'offline',
    },
    {
      id: '5',
      name: 'Terry Franci',
      avatar: '/images/user/user-02.jpg',
      action: 'requests permission to change',
      project: 'Project - Nganter App',
      time: '5 min ago',
      status: 'online',
    },
    {
      id: '6',
      name: 'Alena Franci',
      avatar: '/images/user/user-03.jpg',
      action: 'requests permission to change',
      project: 'Project - Nganter App',
      time: '8 min ago',
      status: 'online',
    },
    {
      id: '7',
      name: 'Jocelyn Kenter',
      avatar: '/images/user/user-04.jpg',
      action: 'requests permission to change',
      project: 'Project - Nganter App',
      time: '15 min ago',
      status: 'online',
    },
    {
      id: '8',
      name: 'Brandon Philips',
      avatar: '/images/user/user-05.jpg',
      action: 'requests permission to change',
      project: 'Project - Nganter App',
      time: '1 hr ago',
      status: 'offline',
    },
  ];

  private sub?: Subscription;

  constructor(
    private elementRef: ElementRef,
    private dropdownService: DropdownService
  ) {}

  ngOnInit(): void {
    this.sub = this.dropdownService.activeDropdown$.subscribe((activeId) => {
      this.isOpen = activeId === this.dropdownId;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleDropdown(event?: Event): void {
    event?.stopPropagation();
    this.dropdownService.toggle(this.dropdownId);
    this.notifying = false;
  }

  closeDropdown(): void {
    this.dropdownService.close(this.dropdownId);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}