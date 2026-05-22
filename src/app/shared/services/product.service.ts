import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  toSell: number;
  lastUpdated: Date;
  priceLastUpdated: Date;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  // Your specific data
  private initialData: Product[] = [
    { id: 1, name: 'Premium watches', sku: 'BP-001', price: 1250.00, stock: 45, toSell: 0, lastUpdated: new Date('2026-05-10T09:30:00'), priceLastUpdated: new Date('2026-05-10T09:30:00') },
    { id: 2, name: 'Premium bags', sku: 'EO-102', price: 2800.00, stock: 12, toSell: 0, lastUpdated: new Date('2026-05-12T14:15:00'), priceLastUpdated: new Date('2026-05-12T14:15:00') },
    { id: 3, name: 'Air cooler', sku: 'AF-552', price: 450.00, stock: 30, toSell: 0, lastUpdated: new Date('2026-05-15T11:00:00'), priceLastUpdated: new Date('2026-05-15T11:00:00') },
    { id: 4, name: 'Wireless Mouse', sku: 'WM-889', price: 850.00, stock: 100, toSell: 0, lastUpdated: new Date('2026-05-18T08:00:00'), priceLastUpdated: new Date('2026-05-18T08:00:00') },
    { id: 5, name: 'Mechanical Keyboard', sku: 'KB-202', price: 3200.00, stock: 25, toSell: 0, lastUpdated: new Date('2026-05-19T10:45:00'), priceLastUpdated: new Date('2026-05-19T10:45:00') },
    { id: 6, name: 'USB-C Cable', sku: 'CB-110', price: 150.00, stock: 200, toSell: 0, lastUpdated: new Date('2026-05-20T12:00:00'), priceLastUpdated: new Date('2026-05-20T12:00:00') },
    { id: 7, name: 'Noise Cancelling Headphones', sku: 'NC-404', price: 5500.00, stock: 15, toSell: 0, lastUpdated: new Date('2026-05-21T09:15:00'), priceLastUpdated: new Date('2026-05-21T09:15:00') },
    { id: 8, name: 'Desk Lamp', sku: 'DL-990', price: 950.00, stock: 40, toSell: 0, lastUpdated: new Date('2026-05-21T14:30:00'), priceLastUpdated: new Date('2026-05-21T14:30:00') },
  ];

  public allProducts = signal<Product[]>(this.initialData);

  getPagedData(data: Product[], page: number, pageSize: number): Product[] {
    const startIndex = (page - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }
}