const fs = require('fs');

// users in JSON file for simplicity, store in a db for production applications
const pathPosts = './public/';

export default async function save(name: string, data: string) {
    fs.writeFileSync(pathPosts + 'mdx/' + name, data);
    return;
}