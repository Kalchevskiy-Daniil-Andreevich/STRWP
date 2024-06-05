const { v4: uuidv4 } = require('uuid');

function validateCard(cardNumber) {
    console.log("Validating card:", cardNumber);
    return Math.random() < 0.5; 
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
    console.log("Proceeding to payment for order:", orderId);
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

createOrder("1234567890123456")
    .then(orderId => {
        console.log("Order created successfully with ID:", orderId);
        return proceedToPayment(orderId);
    })
    .then(paymentResult => {
        console.log(paymentResult);
    })
    .catch(error => {
        console.error(error.message);
    });

async function orderAndPay() {
    try {
        const orderId = await createOrder("1234567890123456");
        console.log("Order created successfully with ID:", orderId);
        const paymentResult = await proceedToPayment(orderId);
        console.log(paymentResult);
    } catch (error) {
        console.error(error.message);
    }
}

orderAndPay();
