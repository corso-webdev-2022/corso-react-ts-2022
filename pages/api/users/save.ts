const fs = require('fs');
const Nanoid = require('nanoid');

// users in JSON file for simplicity, store in a db for production applications
let users = require('data/users.json');

interface User {
    id: string;
    dateCreated: string;
    dateUpdated: string;
}

export const usersRepo = {
    getAll: () => users,
    getById: (id:string) => users.find((x:User) => x.id === id),
    find: (x:User) => users.find(x),
    create,
    update,
    delete: _delete
};

function create(user:User) {
    // generate new user id
    user.id = Nanoid.nanoid();

    // set date created and updated
    user.dateCreated = new Date().toISOString();
    user.dateUpdated = new Date().toISOString();

    // add and save user
    users.push(user);
    saveData();
}

function update(id: string, params: User) {
    const user = users.find((x:User) => x.id === id);

    // set date updated
    user.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(user, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id: string) {
    // filter out deleted user and save
    users = users.filter((x:User) => x.id !== id);
    saveData();
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
}