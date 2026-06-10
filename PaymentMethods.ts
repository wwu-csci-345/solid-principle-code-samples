type PaymentMethodType = 'credit-card' | 'paypal' | 'gift-card';

type OrderItem = {
  name: string;
  unitPrice: number;
  quantity: number;
};

type Order = {
  id: string;
  items: OrderItem[];
};

type CreditCardInfo = {
  cardNumber: string;
  expirationMonth: number;
  expirationYear: number;
  cvv: string;
};

type PayPalInfo = {
  email: string;
};

type GiftCardInfo = {
  cardCode: string;
};

type PaymentRequest = {
  methodType: PaymentMethodType;
  creditCardInfo?: CreditCardInfo;
  paypalInfo?: PayPalInfo;
  giftCardInfo?: GiftCardInfo;
};

type PaymentResult = {
  success: boolean;
  transactionId?: string;
  errorMessage?: string;
};

class CheckoutService {
  calculateTotal(order: Order): number {
    return order.items.reduce((total, item) => {
      return total + item.unitPrice * item.quantity;
    }, 0);
  }

  checkout(order: Order, paymentRequest: PaymentRequest): PaymentResult {
    const total = this.calculateTotal(order);

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
