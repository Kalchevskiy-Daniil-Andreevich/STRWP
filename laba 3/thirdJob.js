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



module.exports = thirdJob;
