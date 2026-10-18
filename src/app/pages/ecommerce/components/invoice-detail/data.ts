import { InvoiceData } from './types';

export const defaultInvoiceData: InvoiceData = {
  invoiceId: '#34834',
  from: {
    label: 'From',
    name: 'Pimjo LLC',
    addressLines: ['1280, Clair Street,', 'Massachusetts, New York - 02543'],
    dateLabel: 'Issued On:',
    date: '11 March, 2027',
  },
  to: {
    label: 'To',
    name: 'David Thompson',
    addressLines: ['355, Shobe Lane', 'Colorado, Fort Collins - 80543'],
    dateLabel: 'Due On:',
    date: '16 March, 2027',
  },
  items: [
    { id: 1, product: 'Macbook pro 13”', quantity: 1, unitCost: 1200, discount: 0, total: 1200 },
    { id: 2, product: 'Apple Watch Ultra', quantity: 1, unitCost: 300, discount: 50, total: 150 },
    { id: 3, product: 'iPhone 15 Pro Max', quantity: 2, unitCost: 800, discount: 0, total: 1600 },
    { id: 4, product: 'iPad Pro 3rd Gen', quantity: 1, unitCost: 900, discount: 0, total: 900 },
  ],
  summary: {
    subtotal: 3850,
    vatRate: 10,
    vatAmount: 385,
    total: 4235,
  },
};
