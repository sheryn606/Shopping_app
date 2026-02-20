export interface Bill {
  id?: number;
  orderId: number;
  userId: number;
  customerName: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentStatus: string;
  createdAt?: Date;
}

export interface BillItem {
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}
