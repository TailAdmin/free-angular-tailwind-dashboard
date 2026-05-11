import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  toSell: number;
}

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-list.component.html',
})
export class InvoiceListComponent {
  // Toggle for Edit Mode
  public isEditing = signal<boolean>(false);

  public products = signal<Product[]>([
    { id: 1, name: 'Premium watches', sku: 'BP-001', price: 1250.00, stock: 45, toSell: 0 },
    { id: 2, name: 'Premium bags', sku: 'EO-102', price: 2800.00, stock: 12, toSell: 0 },
    { id: 3, name: 'Air cooler', sku: 'AF-552', price: 450.00, stock: 30, toSell: 0 },
  ]);

  public totalToSell = computed(() => {
    return this.products().reduce((acc, p) => acc + (p.price * p.toSell), 0);
  });

  public selectedCount = computed(() => {
    return this.products().filter(p => p.toSell > 0).length;
  });

  toggleEdit() {
    this.isEditing.set(!this.isEditing());
  }

  // Updates the sale quantity (+/- buttons)
  updateQty(index: number, change: number) {
    this.products.update(prev => {
      const updated = [...prev];
      const product = { ...updated[index] };
      const newQty = product.toSell + change;

      if (newQty >= 0 && newQty <= product.stock) {
        product.toSell = newQty;
        updated[index] = product;
      }
      return updated;
    });
  }

  // Triggered via ngModelChange in Edit Mode
  updateBaseStock(index: number, newStock: number) {
    this.products.update(prev => {
      const updated = [...prev];
      // Ensure stock doesn't fall below what is already being sold
      const validatedStock = Math.max(newStock || 0, updated[index].toSell);
      updated[index] = { ...updated[index], stock: validatedStock };
      return updated;
    });
  }
}