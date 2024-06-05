function square(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof num !== 'number') {
                reject('Ошибка: ввод должен быть числом');
            } else {
                resolve(num * num);
            }
        }, 1000);
    });
}

function cube(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof num !== 'number') {
                reject('Ошибка: ввод должен быть числом');
            } else {
                resolve(num * num * num);
            }
        }, 1500); 
    });
}

function fourthPower(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof num !== 'number') {
                reject('Ошибка: ввод должен быть числом');
            } else {
                resolve(num * num * num * num);
            }
        }, 2000); 
    });
}

Promise.race([square(2), cube(3), fourthPower(4)])
    .then(result => {
        console.log('Первый результат:', result);
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });

Promise.any([square('test'), cube(15), fourthPower(4)])
    .then(result => {
        console.log('Первый разрешенный результат:', result);
    })
    .catch(errors => {
        console.error('Все обещания были отклонены:', errors);
    });
