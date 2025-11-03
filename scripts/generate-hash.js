import bcrypt from 'bcryptjs';

const password = 'Eli&Goose';
const hash = bcrypt.hashSync(password, 10);

console.log('Password:', password);
console.log('Hash:', hash);

