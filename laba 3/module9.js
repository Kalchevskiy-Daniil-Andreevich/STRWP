const { v4: uuidv4 } = require('uuid');

function validateCard(cardNumber) {
    return typeof cardNumber === 'string' && cardNumber.length === 16;
}

function createOrder(cardNumber) {
    return new Promise((resolve, reject) => {
        if (!validateCard(cardNumber)) {
            reject(new Error("Card is not valid"));
        } else {
            setTimeout(() => {
                const orderId = uuidv4();
                resolve(orderId);
            }, 5000);
        }
    });
}

function proceedToPayment(orderId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.5) {
                resolve("Payment successful");
            } else {
                reject(new Error("Payment failed"));
            }
        }, 2000);
    });
}

module.exports = {
    validateCard,
    createOrder,
    proceedToPayment
};
