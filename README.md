# url-mock-server
Simple mock server providing json-based routing.

## install

## usage
```js
import MockServer from "url-mock-server"

const ms = new MockServer({
  "_" : "hoge", // / -> hoge
  "a" : {
    "_" : "fuga",// /a -> fuga
    "b" : "piyo" // /a/b -> piyo
  },
  "?" : {
    "q1=v1" : "boo", // /a?q1=v1 -> boo
    "q2=v2" : "baz", // /a?q2=v2 -> baz
    "q1=v1&q2=v2" : "boobaz" // /a?q1=v1&q2=v2 -> boobaz
  }
});

ms.listen(3000);
```

## license
MIT