const fs = require('fs');

// users in JSON file for simplicity, store in a db for production applications
let users = require('data/users.json');
const pathPosts = '_posts';

export default function save(name: string, data: string) {
    fs.writeFileSync(pathPosts + 'data/' + name, data);
}