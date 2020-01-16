var gravatar = require('gravatar');

var url = gravatar.url('khajimcom1@gmail.com', { s: '200', r: 'pg', d: 'mm' });
console.log(url);
