// treat this file as an ES Module rather than a loose script, locking it into its own local scope
export {};

// Individual product/service line on an order.
type OrderItem = {
  // Item name shown in receipt details.
  name: string;
  // Price per unit.
  unitPrice: number;
  // Purchased quantity.
  quantity: number;
};

// Aggregate order data required for receipt generation.
type Order = {
  // Unique order number.
  id: string;
  // Recipient email for delivery.
  customerEmail: string;
  // Ordered items.
  items: OrderItem[];
};

// This class handles pricing, HTML generation, persistence, and email delivery in one place.
class OrderReceipt {
  // Order context used by all calculations and rendering.
  constructor(private order: Order) {}

  // Computes subtotal before tax.
  calculateSubtotal(): number {
    return this.order.items.reduce((total, item) => {
      return total + item.unitPrice * item.quantity;
    }, 0);
  }

  // Applies a fixed 10% tax rate to subtotal.
  calculateTax(): number {
    return this.calculateSubtotal() * 0.1;
  }

  // Computes final amount including tax.
  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateTax();
  }

  // Renders receipt content as HTML.
  generateHtml(): string {
    const itemRows = this.order.items
      .map((item) => {
        return `
          <li>
            ${item.name}: ${item.quantity} x $${item.unitPrice}
          </li>
        `;
      })
      .join('');

    return `
      <h1>Receipt for Order ${this.order.id}</h1>
      <ul>
        ${itemRows}
      </ul>
      <p>Subtotal: $${this.calculateSubtotal().toFixed(2)}</p>
      <p>Tax: $${this.calculateTax().toFixed(2)}</p>
      <p>Total: $${this.calculateTotal().toFixed(2)}</p>
    `;
  }

  // Saves generated receipt content to persistence storage.
  saveToDatabase(): void {
    // Infrastructure behavior is tightly coupled to receipt composition.
    const html = this.generateHtml();

    console.log('Saving receipt to database...');
    console.log(html);
  }

  // Sends generated receipt content to the customer.
  emailToCustomer(): void {
    // Communication behavior is tightly coupled to receipt composition.
    const html = this.generateHtml();

    console.log(`Sending receipt to ${this.order.customerEmail}`);
    console.log(html);
  }
}
