const bcrypt = require('bcryptjs');

// Test the password hash directly
const password = 'Bike2453';
const hash = '$2b$10$qDd.EUN5ivsHqc0fbF/qPe01iildgFb69skWAYMXPpjV98iWKXzRO';

console.log('Testing password hash...');
console.log('Password:', password);
console.log('Hash:', hash);

const result = bcrypt.compareSync(password, hash);
console.log('Match result:', result);

if (!result) {
  console.log('\n❌ PASSWORD DOES NOT MATCH HASH!');
  console.log('Generating new hash...');
  const newHash = bcrypt.hashSync(password, 10);
  console.log('New hash:', newHash);
  console.log('Testing new hash:', bcrypt.compareSync(password, newHash));
} else {
  console.log('\n✅ PASSWORD MATCHES HASH!');
}

