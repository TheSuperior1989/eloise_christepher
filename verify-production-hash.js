const bcrypt = require('bcryptjs');

const hash = '$2b$10$qDd.EUN5ivsHqc0fbF/qPe01iildgFb69skWAYMXPpjV98iWKXzRO';
const password = 'Bike2453';

console.log('Testing password:', password);
console.log('Against hash:', hash);
console.log('');

const result = bcrypt.compareSync(password, hash);
console.log('✅ PASSWORD MATCHES:', result);

// Also test with bcrypt.compare (async)
bcrypt.compare(password, hash).then(asyncResult => {
  console.log('✅ ASYNC PASSWORD MATCHES:', asyncResult);
});

