# 課題２

Content-type に application/x-www-form-urlencoded を指定した時と、application/json を指定した時の違い

1. applicatin/json: data, json に値が含まれる

```
{
  "args": {},
  "data": "{\"name\": \"hoge\"}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "16",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.79.1",
    "X-Amzn-Trace-Id": "Root=1-62961a00-3038eb8c484922556074e20b"
  },
  "json": {
    "name": "hoge"
  },
  "origin": "XXX.XXX.XXX.XX",
  "url": "https://httpbin.org/post"
}
```

2. application/x-www-form-urlencoded: data,json に値が含まれず、form に値が含まれる

```
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "{\"name\": \"hoge\"}": ""
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "16",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.79.1",
    "X-Amzn-Trace-Id": "Root=1-62961bc1-2f7253a820a8962f60bb8549"
  },
  "json": null,
  "origin": "XXX.XXX.XXX.XX",
  "url": "https://httpbin.org/post"
}
```
