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
  lastUpdated: Date;       // Tracks stock updates
  priceLastUpdated: Date;  // Tracks unit price updates
}

interface Transaction {
  id: string;
  timestamp: Date;
  itemsCount: number;
  totalRevenue: number;
  details: { productName: string; qtySold: number; subtotal: number }[];
}

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-list.component.html',
})
export class InvoiceListComponent {
  public isEditing = signal<boolean>(false);

  public products = signal<Product[]>([
    { id: 1, name: 'Premium watches', sku: 'BP-001', price: 1250.00, stock: 45, toSell: 0, lastUpdated: new Date('2026-05-10T09:30:00'), priceLastUpdated: new Date('2026-05-10T09:30:00') },
    { id: 2, name: 'Premium bags', sku: 'EO-102', price: 2800.00, stock: 12, toSell: 0, lastUpdated: new Date('2026-05-12T14:15:00'), priceLastUpdated: new Date('2026-05-12T14:15:00') },
    { id: 3, name: 'Air cooler', sku: 'AF-552', price: 450.00, stock: 30, toSell: 0, lastUpdated: new Date('2026-05-15T11:00:00'), priceLastUpdated: new Date('2026-05-15T11:00:00') },
  ]);

  public completedTransactions = signal<Transaction[]>([]);

  public totalToSell = computed(() => {
    return this.products().reduce((acc, p) => acc + (p.price * p.toSell), 0);
  });

  public selectedCount = computed(() => {
    return this.products().filter(p => p.toSell > 0).length;
  });

  public cumulativeRevenue = computed(() => {
    return this.completedTransactions().reduce((acc, tx) => acc + tx.totalRevenue, 0);
  });

  toggleEdit() {
    this.isEditing.set(!this.isEditing());
  }

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

  updateBaseStock(index: number, newStock: number) {
    this.products.update(prev => {
      const updated = [...prev];
      const validatedStock = Math.max(newStock || 0, updated[index].toSell);
      
      updated[index] = { 
        ...updated[index], 
        stock: validatedStock,
        lastUpdated: new Date()
      };
      return updated;
    });
  }

  updateUnitPrice(index: number, newPrice: number) {
    this.products.update(prev => {
      const updated = [...prev];
      const validatedPrice = Math.max(newPrice || 0, 0);
      
      updated[index] = {
        ...updated[index],
        price: validatedPrice,
        priceLastUpdated: new Date() // Refreshes the price-specific timestamp instantly
      };
      return updated;
    });
  }

  submitTransaction() {
    const currentProducts = this.products();
    const activeSales = currentProducts.filter(p => p.toSell > 0);

    if (activeSales.length === 0) return;

    const newTransaction: Transaction = {
      id: 'TX-' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date(),
      itemsCount: activeSales.reduce((acc, p) => acc + p.toSell, 0),
      totalRevenue: this.totalToSell(),
      details: activeSales.map(p => ({
        productName: p.name,
        qtySold: p.toSell,
        subtotal: p.price * p.toSell
      }))
    };

    this.products.update(prev => 
      prev.map(p => {
        if (p.toSell > 0) {
          return {
            ...p,
            stock: p.stock - p.toSell,
            toSell: 0,
            lastUpdated: new Date() // Deducting items modifies stock levels, so we update this too
          };
        }
        return p;
      })
    );

    this.completedTransactions.update(prev => [newTransaction, ...prev]);
  }
}