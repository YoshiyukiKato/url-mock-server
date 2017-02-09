const Server = require("../dest");
const server = new Server({ 
  '_' : "hoge",
  'a' : {
    '_' : "fuga",
    'b' : {
      '_' : "piyo",
      '?' : {
        'q3=v3' : 'r3',
        'q4=v4' : 'r4',
        'q3=v3&q4=v4' : 'r34'
      }
    },
    '?' : {
      'q1=v1' : 'br1',
      'q2=v2' : 'r2',
      'q1=v1&q2=v2' : 'r12'
    }
  }
});
server.run();