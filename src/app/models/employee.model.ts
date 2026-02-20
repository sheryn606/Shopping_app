export interface Employee {
  id: string;
  name: string;
  password: string;
  createdAt?: Date;
}

export interface EmployeeOrder {
  id: number;
  userId: number;
  customerName: string;
  totalAmount: number;
  status: 'Pending' | 'Accepted' | 'Cancelled' | 'Delivered';
  orderDate: Date;
  items: string; // Summary of items
}
