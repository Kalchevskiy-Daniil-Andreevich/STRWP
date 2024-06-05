function secondJob() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Произошла ошибка');
        }, 3000);
    });
}

secondJob().then(result => {
    console.log('Результат с помощью обработчиков Promise:', result);
}).catch(error => {
    console.error('Ошибка с помощью обработчиков Promise:', error);
});

async function handleResult() {
    try {
        const result = await secondJob();
        console.log('Результат с помощью async/await:', result);
    } catch (error) {
        console.error('Ошибка с помощью async/await:', error);
    }
}

handleResult();