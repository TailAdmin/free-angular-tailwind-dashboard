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
  private initialData: Product[] = [
    { id: 1, name: 'Premium watches', sku: 'BP-001', price: 1250.00, stock: 45, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 2, name: 'Premium bags', sku: 'EO-102', price: 2800.00, stock: 12, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 3, name: 'Air cooler', sku: 'AF-552', price: 450.00, stock: 30, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 4, name: 'Wireless Mouse', sku: 'WM-889', price: 850.00, stock: 100, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 5, name: 'Mechanical Keyboard', sku: 'KB-202', price: 3200.00, stock: 25, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 6, name: 'USB-C Cable', sku: 'CB-110', price: 150.00, stock: 200, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 7, name: 'Noise Cancelling Headphones', sku: 'NC-404', price: 5500.00, stock: 15, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 8, name: 'Desk Lamp', sku: 'DL-990', price: 950.00, stock: 40, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 9, name: 'Gaming Chair', sku: 'GC-777', price: 8500.00, stock: 8, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 10, name: 'Webcam 1080p', sku: 'WC-108', price: 1200.00, stock: 50, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 11, name: 'External SSD 1TB', sku: 'ES-1TB', price: 4500.00, stock: 20, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 12, name: 'Bluetooth Speaker', sku: 'BS-505', price: 2200.00, stock: 35, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 13, name: 'Laptop Stand', sku: 'LS-202', price: 600.00, stock: 60, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 14, name: 'USB Hub Multiport', sku: 'UH-004', price: 800.00, stock: 80, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 15, name: 'Ergonomic Chair', sku: 'EC-999', price: 12000.00, stock: 5, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 16, name: 'Microphone Stand', sku: 'MS-111', price: 400.00, stock: 25, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 17, name: 'Monitor 24 inch', sku: 'MT-240', price: 7500.00, stock: 10, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 18, name: 'Phone Case', sku: 'PC-123', price: 250.00, stock: 150, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 19, name: 'Screen Protector', sku: 'SP-456', price: 150.00, stock: 200, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 20, name: 'Wireless Charger', sku: 'WC-789', price: 900.00, stock: 45, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 21, name: 'Power Bank 20k', sku: 'PB-20K', price: 1500.00, stock: 30, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 22, name: 'Table Mat', sku: 'TM-001', price: 350.00, stock: 90, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 23, name: 'HDMI Cable 2m', sku: 'HC-002', price: 200.00, stock: 120, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 24, name: 'Webcam Privacy Cover', sku: 'PC-003', price: 50.00, stock: 300, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() },
    { id: 25, name: 'Portable SSD 500GB', sku: 'PS-500', price: 2800.00, stock: 25, toSell: 0, lastUpdated: new Date(), priceLastUpdated: new Date() }
  ];

  public allProducts = signal<Product[]>(this.initialData);

  getPagedData(data: Product[], page: number, pageSize: number): Product[] {
    const startIndex = (page - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }
}