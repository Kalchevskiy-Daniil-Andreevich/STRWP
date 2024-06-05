function thirdJob(data) {
    return new Promise((resolve, reject) => {
        if (typeof data !== 'number') {
            reject('error');
        } else if (data % 2 !== 0) {
            setTimeout(() => resolve('odd'), 1000);
        } else {
            setTimeout(() => reject('even'), 2000);
        }
    });
}

thirdJob(3).then(result => {
    console.log('Результат с помощью обработчиков Promise:', result);
}).catch(error => {
    console.error('Ошибка с помощью обработчиков Promise:', error);
});

async function handleResult() {
    try {
        const result = await thirdJob(4);
        console.log('Результат с помощью async/await:', result);
    } catch (error) {
        console.error('Ошибка с помощью async/await:', error);
    }
}

handleResult();