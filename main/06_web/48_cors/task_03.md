# 課題 3（実装）

[GitHub: express-server](https://github.com/umirai/express-server)

# 課題 4

作成した成果物に CURL で、「Simple request」に該当しない POST リクエストを送信

```
um@MirainoMacBook-Pro ~ % curl -X POST  localhost:3003
{"response":"POST Request Recieved"}%
um@MirainoMacBook-Pro ~ % curl -X POST -H "MY-TEST:hoge" -v "http://localhost:3003"
*   Trying 127.0.0.1:3003...
* Connected to localhost (127.0.0.1) port 3003 (#0)
> POST / HTTP/1.1
> Host: localhost:3003
> User-Agent: curl/7.79.1
> Accept: */*
> MY-TEST:hoge
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: http://localhost:3001
< Access-Control-Allow-Methods: POST
< Access-Control-Allow-Headers: MY-TEST
< Content-Type: application/json; charset=utf-8
< Content-Length: 36
< ETag: W/"24-MiHaYB6yKqm7NVp57s4TdfnfLDI"
< Date: Fri, 10 Jun 2022 03:15:24 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
* Connection #0 to host localhost left intact
{"response":"POST Request Recieved"}%
```

- CORS 制約は適用されるか？：されない
- なぜか？：CORS はブラウザのための仕組みだから
