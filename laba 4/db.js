let database = [
    { id: 1, name: 'John', bday: '2004-02-12' },
    { id: 2, name: 'Alice', bday: '2005-05-15' }
];

function generateId() {
    return database.length > 0 ? database[database.length - 1].id + 1 : 1;
}

const DB = {
    select: async function () {
        return database;
    },

    insert: async function (data) {
        const newData = { id: generateId(), ...data };
        database.push(newData);
        return newData;
    },

    update: async function (data) {
        const index = database.findIndex(item => item.id === data.id);
        if (index !== -1) {
            database[index] = { ...database[index], ...data };
            return database[index];
        }
        return null;
    },

    delete: async function (id) {
        const index = database.findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
            const deletedData = database.splice(index, 1);
            return deletedData[0];
        }
        return null;
    }
};

module.exports = DB;