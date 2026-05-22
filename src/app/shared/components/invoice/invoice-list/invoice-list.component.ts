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
  lastUpdated: Date;
  priceLastUpdated: Date;
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
  public searchTerm = signal<string>('');
  
  // Sorting Signals
  public sortColumn = signal<keyof Product | null>(null);
  public sortDirection = signal<'asc' | 'desc'>('asc');

  public products = signal<Product[]>([
    { id: 1, name: 'Premium watches', sku: 'BP-001', price: 1250.00, stock: 45, toSell: 0, lastUpdated: new Date('2026-05-10T09:30:00'), priceLastUpdated: new Date('2026-05-10T09:30:00') },
    { id: 2, name: 'Premium bags', sku: 'EO-102', price: 2800.00, stock: 12, toSell: 0, lastUpdated: new Date('2026-05-12T14:15:00'), priceLastUpdated: new Date('2026-05-12T14:15:00') },
    { id: 3, name: 'Air cooler', sku: 'AF-552', price: 450.00, stock: 30, toSell: 0, lastUpdated: new Date('2026-05-15T11:00:00'), priceLastUpdated: new Date('2026-05-15T11:00:00') },
    { id: 4, name: 'Wireless Mouse', sku: 'WM-889', price: 850.00, stock: 100, toSell: 0, lastUpdated: new Date('2026-05-18T08:00:00'), priceLastUpdated: new Date('2026-05-18T08:00:00') },
    { id: 5, name: 'Mechanical Keyboard', sku: 'KB-202', price: 3200.00, stock: 25, toSell: 0, lastUpdated: new Date('2026-05-19T10:45:00'), priceLastUpdated: new Date('2026-05-19T10:45:00') },
    { id: 6, name: 'USB-C Cable', sku: 'CB-110', price: 150.00, stock: 200, toSell: 0, lastUpdated: new Date('2026-05-20T12:00:00'), priceLastUpdated: new Date('2026-05-20T12:00:00') },
    { id: 7, name: 'Noise Cancelling Headphones', sku: 'NC-404', price: 5500.00, stock: 15, toSell: 0, lastUpdated: new Date('2026-05-21T09:15:00'), priceLastUpdated: new Date('2026-05-21T09:15:00') },
    { id: 8, name: 'Desk Lamp', sku: 'DL-990', price: 950.00, stock: 40, toSell: 0, lastUpdated: new Date('2026-05-21T14:30:00'), priceLastUpdated: new Date('2026-05-21T14:30:00') },
  ]);

  public completedTransactions = signal<Transaction[]>([]);

  // Combined Filtering AND Sorting Logic
  public filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    let data = [...this.products().filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.sku.toLowerCase().includes(term)
    )];

    const col = this.sortColumn();
    if (col) {
      data.sort((a, b) => {
        let valA: any = a[col];
        let valB: any = b[col];
        
        // Handle Date objects for sorting
        if (valA instanceof Date) valA = valA.getTime();
        if (valB instanceof Date) valB = valB.getTime();
        
        if (valA < valB) return this.sortDirection() === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection() === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  });

  public totalToSell = computed(() => this.products().reduce((acc, p) => acc + (p.price * p.toSell), 0));
  public selectedCount = computed(() => this.products().filter(p => p.toSell > 0).length);
  public cumulativeRevenue = computed(() => this.completedTransactions().reduce((acc, tx) => acc + tx.totalRevenue, 0));

  toggleEdit() { this.isEditing.set(!this.isEditing()); }

  setSort(column: keyof Product) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  private findProductIndex(id: number): number { return this.products().findIndex(p => p.id === id); }

  updateQty(productId: number, change: number) {
    const index = this.findProductIndex(productId);
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

  updateBaseStock(productId: number, newStock: number) {
    const index = this.findProductIndex(productId);
    this.products.update(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], stock: Math.max(newStock || 0, updated[index].toSell), lastUpdated: new Date() };
      return updated;
    });
  }

  updateUnitPrice(productId: number, newPrice: number) {
    const index = this.findProductIndex(productId);
    this.products.update(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], price: Math.max(newPrice || 0, 0), priceLastUpdated: new Date() };
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
      details: activeSales.map(p => ({ productName: p.name, qtySold: p.toSell, subtotal: p.price * p.toSell }))
    };

    this.products.update(prev => prev.map(p => p.toSell > 0 ? { ...p, stock: p.stock - p.toSell, toSell: 0, lastUpdated: new Date() } : p));
    this.completedTransactions.update(prev => [newTransaction, ...prev]);
  }

  setQty(productId: number, newQty: number | null) {
    // Coerce null/undefined to 0, then ensure it's not negative
    const quantity = Math.max(0, newQty ?? 0); 
    const index = this.findProductIndex(productId);
    
    this.products.update(prev => {
      const updated = [...prev];
      const product = { ...updated[index] };
  
      // Cap at available stock
      const validatedQty = Math.min(quantity, product.stock);
      
      product.toSell = validatedQty;
      updated[index] = product;
      
      return updated;
    });
  }
}