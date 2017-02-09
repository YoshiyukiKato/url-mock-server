module.exports = { 
  '_' : "hoge",
  'a' : {
    '_' : "fuga",
    'b' : {
      '_' : "piyo",
      '?' : {
        'q3=v3' : 'foo',
        'q4=v4' : 'bar',
        'q3=v3&q4=v4' : 'foobar'
      }
    },
    '?' : {
      'q1=v1' : 'boo',
      'q2=v2' : 'baz',
      'q1=v1&q2=v2' : 'boobaz'
    }
  }
};