function square(num) {
    return new Promise((resolve, reject) => {
        if (typeof num !== 'number') {
            reject('Ошибка: ввод должен быть числом');
        } else {
            resolve(num * num);
        }
    });
}

function cube(num) {
    return new Promise((resolve, reject) => {
        if (typeof num !== 'number') {
            reject('Ошибка: ввод должен быть числом');
        } else {
            resolve(num * num * num);
        }
    });
}

function fourthPower(num) {
    return new Promise((resolve, reject) => {
        if (typeof num !== 'number') {
            reject('Ошибка: ввод должен быть числом');
        } else {
            resolve(num * num * num * num);
        }
    });
}

Promise.all([square(2), cube(3), fourthPower(4)])
    .then(results => {
        console.log('Результаты вычислений:', results);
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });

square('test')
    .then(result => {
        console.log('Квадрат числа:', result);
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
