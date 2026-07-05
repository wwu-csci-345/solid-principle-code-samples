// treat this file as an ES Module rather than a loose script, locking it into its own local scope
export {};

type CustomerType = 'regular' | 'student' | 'vip';

// Customer profile attached to an order.
type Customer = {
  // Unique customer identifier.
  id: string;
  // Display name used on receipts.
  name: string;
  // Category used by discount rules.
  customerType: CustomerType;
};

// A single purchasable line item.
type OrderItem = {
  // Item name shown on the receipt.
  name: string;
  // Price per unit before discount.
  unitPrice: number;
  // Number of units purchased.
  quantity: number;
};

// Checkout payload containing customer and item list.
type Order = {
  // Unique order identifier.
  id: string;
  // Customer who placed the order.
  customer: Customer;
  // Purchased items.
  items: OrderItem[];
};

// CheckoutService centralizes discount policy behind conditional branches.
// New customer categories require modifying this class (OCP pressure).
class CheckoutService {
  // Sums line items to compute price before discounts.
  calculateSubtotal(order: Order): number {
    return order.items.reduce((total, item) => {
      return total + item.unitPrice * item.quantity;
    }, 0);
  }

  // Applies discount percentage based on customer type.
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

  // Computes final total after discount is subtracted.
  calculateTotal(order: Order): number {
    const subtotal = this.calculateSubtotal(order);
    const discount = this.calculateDiscount(order);

    return subtotal - discount;
  }

  // Prints subtotal/discount/total values for the order.
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
