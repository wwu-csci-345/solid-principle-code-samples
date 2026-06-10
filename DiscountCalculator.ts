type CustomerType = 'regular' | 'student' | 'vip';

type Customer = {
  id: string;
  name: string;
  customerType: CustomerType;
};

type OrderItem = {
  name: string;
  unitPrice: number;
  quantity: number;
};

type Order = {
  id: string;
  customer: Customer;
  items: OrderItem[];
};

class CheckoutService {
  calculateSubtotal(order: Order): number {
    return order.items.reduce((total, item) => {
      return total + item.unitPrice * item.quantity;
    }, 0);
  }

  calculateDiscount(order: Order): number {
    const subtotal = this.calculateSubtotal(order);

    // no discount for regular customers
    if (order.customer.customerType === 'regular') {
      return 0;
    }

    // student discount
    if (order.customer.customerType === 'student') {
      return subtotal * 0.1;
    }

    // VIP discount
    if (order.customer.customerType === 'vip') {
      return subtotal * 0.2;
    }

    // senior discount
    if (order.customer.customerType === 'senior') {
      return subtotal * 0.15;
    }

    // employee discount
    if (order.customer.customerType === 'employee') {
      return subtotal * 0.3;
    }

    return 0;
  }

  calculateTotal(order: Order): number {
    const subtotal = this.calculateSubtotal(order);
    const discount = this.calculateDiscount(order);

    return subtotal - discount;
  }

  printReceipt(order: Order): void {
    const subtotal = this.calculateSubtotal(order);
    const discount = this.calculateDiscount(order);
    const total = this.calculateTotal(order);

    console.log(`Order: ${order.id}`);
    console.log(`Customer: ${order.customer.name}`);
    console.log(`Customer type: ${order.customer.customerType}`);
    console.log(`Subtotal: $${subtotal.toFixed(2)}`);
    console.log(`Discount: $${discount.toFixed(2)}`);
    console.log(`Total: $${total.toFixed(2)}`);
  }
}

// Example usage
const order: Order = {
  id: 'ord-1001',
  customer: {
    id: 'cus-1',
    name: 'Maya Chen',
    customerType: 'student',
  },
  items: [
    { name: 'Keyboard', unitPrice: 75, quantity: 1 },
    { name: 'Mouse', unitPrice: 25, quantity: 2 },
  ],
};

const checkout = new CheckoutService();

checkout.printReceipt(order);
