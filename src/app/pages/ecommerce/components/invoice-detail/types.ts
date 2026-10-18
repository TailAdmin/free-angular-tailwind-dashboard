export interface InvoiceParty {
  label: string;
  name: string;
  addressLines: string[];
  dateLabel: string;
  date: string;
}

export interface InvoiceItem {
  id: number | string;
  product: string;
  quantity: number;
  unitCost: number;
  discount: number;
  total: number;
}

export interface InvoiceSummaryData {
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;
}

export interface InvoiceData {
  invoiceId: string;
  from: InvoiceParty;
  to: InvoiceParty;
  items: InvoiceItem[];
  summary: InvoiceSummaryData;
}
