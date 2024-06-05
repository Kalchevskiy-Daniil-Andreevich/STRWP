const { validateCard, createOrder, proceedToPayment } = require('./module9');

describe('validateCard function', () => {

    //[test]
    test('should return true for a valid card', () => {
        const validCardNumber = "1234567890123456";
        expect(validateCard(validCardNumber)).toBe(true);
    });

    //[test]
    test('should return false for an invalid card', () => {
        const invalidCardNumber = "1234";
        expect(validateCard(invalidCardNumber)).toBe(false);
    });
});

describe('createOrder function', () => {

    //[test]
    test('should create an order successfully', async () => {
        const orderId = await createOrder("1234567890123456");
        expect(orderId).toBeDefined();
    });

    //[test]
    test('should reject with an error for an invalid card', async () => {
        await expect(createOrder("1234")).rejects.toThrow("Card is not valid");
    });
});

describe('proceedToPayment function', () => {

    //[test]
    test('should proceed to payment successfully', async () => {
        const paymentResult = await proceedToPayment("validOrderId");
        expect(paymentResult).toBe("Payment successful");
    });


    //[test]
    test('should reject with an error for a failed payment', async () => {
        await expect(proceedToPayment("invalidOrderId")).rejects.toThrow("Payment failed");
    });
});
