const bcrypt = require('bcryptjs');

const testPassword = 'Eli&Goose';
const storedHash = '$2b$10$rmyQ6mINe2vEGKB6z2jnUeM.zp59.XjtnHX4BSZnj41Bp1/W.W14e';

const matches = bcrypt.compareSync(testPassword, storedHash);

console.log('Testing password:', testPassword);
console.log('Against hash:', storedHash);
console.log('Match:', matches ? '✅ YES' : '❌ NO');

