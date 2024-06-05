function firstJob(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello World');
        }, 2000);
    });
}

firstJob().then(result => {
    console.log('Результат с помощью обработчиков Promise:', result);
}).catch(error => {
    console.error('Ошибка с помощью обработчиков Promise:', error);
});

async function handleResult() {
    try {
        const result = await firstJob();
        console.log('Результат с помощью async/await:', result);
    } catch (error) {
        console.error('Ошибка с помощью async/await:', error);
    }
}

handleResult();

