type OrderItem = {
  name: string;
  unitPrice: number;
  quantity: number;
};

type Order = {
  id: string;
  customerEmail: string;
  items: OrderItem[];
};

class OrderReceipt {
  constructor(private order: Order) {}

  calculateSubtotal(): number {
    return this.order.items.reduce((total, item) => {
      return total + item.unitPrice * item.quantity;
    }, 0);
  }

  calculateTax(): number {
    return this.calculateSubtotal() * 0.1;
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateTax();
  }

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

  saveToDatabase(): void {
    const html = this.generateHtml();

    console.log('Saving receipt to database...');
    console.log(html);
  }

  emailToCustomer(): void {
    const html = this.generateHtml();

    console.log(`Sending receipt to ${this.order.customerEmail}`);
    console.log(html);
  }
}
