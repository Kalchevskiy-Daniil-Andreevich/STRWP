function firstJob() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello World');
        }, 2000);
    });
}

module.exports = firstJob;
