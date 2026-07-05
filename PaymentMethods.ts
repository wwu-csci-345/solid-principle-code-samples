// treat this file as an ES Module rather than a loose script, locking it into its own local scope
export {};

type PaymentMethodType = 'credit-card' | 'paypal' | 'gift-card';

// Individual item line in an order.
type OrderItem = {
  // Item display name.
  name: string;
  // Price per unit before discounts/tax.
  unitPrice: number;
  // Quantity purchased.
  quantity: number;
};

// Checkout order payload.
type Order = {
  // Unique order identifier.
  id: string;
  // Purchased items included in payment.
  items: OrderItem[];
};

// Card details used for credit-card payments.
type CreditCardInfo = {
  // Full card number.
  cardNumber: string;
  // Expiry month (1-12).
  expirationMonth: number;
  // Expiry year.
  expirationYear: number;
  // Card verification value.
  cvv: string;
};

// Account details used for PayPal payments.
type PayPalInfo = {
  // PayPal account email.
  email: string;
};

// Details used for gift-card redemption.
type GiftCardInfo = {
  // Redeemable gift card code.
  cardCode: string;
};

// Generic payment request that includes one method-specific payload.
type PaymentRequest = {
  // Selected payment channel.
  methodType: PaymentMethodType;
  // Present when methodType is credit-card.
  creditCardInfo?: CreditCardInfo;
  // Present when methodType is paypal.
  paypalInfo?: PayPalInfo;
  // Present when methodType is gift-card.
  giftCardInfo?: GiftCardInfo;
};

// Result returned after attempting checkout.
type PaymentResult = {
  // True when the payment attempt succeeded.
  success: boolean;
  // Gateway-specific or synthetic transaction ID.
  transactionId?: string;
  // Human-readable error description for failed attempts.
  errorMessage?: string;
};

// Checkout branches on payment type, so every new method requires class modification.
class CheckoutService {
  // Calculates gross order total from line items.
  calculateTotal(order: Order): number {
    return order.items.reduce((total, item) => {
      return total + item.unitPrice * item.quantity;
    }, 0);
  }

  // Routes payment execution based on selected method type.
  checkout(order: Order, paymentRequest: PaymentRequest): PaymentResult {
    const total = this.calculateTotal(order);

    // Credit card flow.
    if (paymentRequest.methodType === 'credit-card') {
      if (!paymentRequest.creditCardInfo) {
        return {
          success: false,
          errorMessage: 'Missing credit card information.',
        };
      }

      console.log('Connecting to credit card processor...');
      console.log(
        `Charging card ending in ${paymentRequest.creditCardInfo.cardNumber.slice(-4)}`,
      );
      console.log(`Amount: $${total.toFixed(2)}`);

      return {
        success: true,
        transactionId: `cc-${order.id}`,
      };
    }

    // PayPal flow.
    if (paymentRequest.methodType === 'paypal') {
      if (!paymentRequest.paypalInfo) {
        return {
          success: false,
          errorMessage: 'Missing PayPal information.',
        };
      }

      console.log('Connecting to PayPal...');
      console.log(
        `Charging PayPal account: ${paymentRequest.paypalInfo.email}`,
      );
      console.log(`Amount: $${total.toFixed(2)}`);

      return {
        success: true,
        transactionId: `pp-${order.id}`,
      };
    }

    // Gift card flow.
    if (paymentRequest.methodType === 'gift-card') {
      if (!paymentRequest.giftCardInfo) {
        return {
          success: false,
          errorMessage: 'Missing gift card information.',
        };
      }

      console.log('Checking gift card balance...');
      console.log(
        `Redeeming gift card: ${paymentRequest.giftCardInfo.cardCode}`,
      );
      console.log(`Amount: $${total.toFixed(2)}`);

      return {
        success: true,
        transactionId: `gc-${order.id}`,
      };
    }

    return {
      success: false,
      errorMessage: 'Unsupported payment method.',
    };
  }
}

// Example usage
const order: Order = {
  id: 'ord-1001',
  items: [
    { name: 'Keyboard', unitPrice: 80, quantity: 1 },
    { name: 'Mouse', unitPrice: 25, quantity: 2 },
  ],
};

const checkoutService = new CheckoutService();

const result = checkoutService.checkout(order, {
  methodType: 'credit-card',
  creditCardInfo: {
    cardNumber: '4111111111111111',
    expirationMonth: 12,
    expirationYear: 2028,
    cvv: '123',
  },
});

console.log(result);
