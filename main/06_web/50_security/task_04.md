# 課題 4

[OWASP Top 10](https://cheatsheetseries.owasp.org/IndexTopTen.html)にある、代表的かつ深刻な脆弱性から自身の実装にレビューを行う

- A01 Broken Access Control（アクセス制御に関する脆弱性）
- A02 Cryptographic Failures（暗号技術に関する障害、機密データ漏洩など）
- A03 Injection（インジェクション関連）
- A04 Insecure Design（設計やアーキテクチャ関連）
- A05 Security Misconfiguration（設定ミス）
- A06 Vulnerable and Outdated Components（セキュリティ的な問題のあるコンポーネント・・・ライブラリのこと？）
- A07 Identification and Authentication Failures（認証関連）
- A08 Software and Data Integrity Failures（ソフトウェアとデータの整合性に関する障害）
- A09 Security Logging and Monitoring Failures（ログ・監視関連）
- A10 Server Side Request Forgery (SSRF)

## A04 Cryptographic Failures（暗号技術に関する障害、機密データ漏洩など）

- [] アプリケーションによって処理、保存、または送信されたデータを分類します。プライバシー法、規制要件、またはビジネスニーズに従って、機密性の高いデータを特定します。
- [x] 機密データを不必要に保存しないでください。できるだけ早く破棄するか、PCIDSS 準拠のトークン化または切り捨てを使用してください。保持されていないデータは盗むことができません。
- [x] 保存されているすべての機密データを必ず暗号化してください。
- [] 最新の強力な標準アルゴリズム、プロトコル、およびキーが適切に配置されていることを確認します。適切なキー管理を使用します。
- [] Forward Secrecy（FS）暗号を使用した TLS、サーバーによる暗号の優先順位付け、安全なパラメーターなどの安全なプロトコルを使用して、転送中のすべてのデータを暗号化します。HTTP Strict Transport Security（HSTS）などのディレクティブを使用して暗号化を適用します。
- [x] 機密データを含む応答のキャッシュを無効にします。
- [] データ分類に従って、必要なセキュリティ管理を適用します。
- [x] 機密データの転送に FTP や SMTP などのレガシープロトコルを使用しないでください。
- [] Argon2、scrypt、bcrypt、PBKDF2 などのワークファクター（遅延ファクター）を備えた強力なアダプティブおよびソルトハッシュ関数を使用してパスワードを保存します。
- [] 初期化ベクトルは、動作モードに適したものを選択する必要があります。多くのモードでは、これは CSPRNG（暗号的に安全な疑似乱数ジェネレーター）を使用することを意味します。ナンスを必要とするモードの場合、初期化ベクトル（IV）は CSPRNG を必要としません。いずれの場合も、IV を固定キーに 2 回使用しないでください。
- [x] 暗号化だけでなく、常に認証された暗号化を使用してください。
- [x] キーは暗号的にランダムに生成され、バイト配列としてメモリに格納される必要があります。パスワードを使用する場合は、適切なパスワードベースの鍵導出関数を使用して鍵に変換する必要があります。
- [] 必要に応じて暗号のランダム性が使用されていること、および予測可能な方法で、またはエントロピーが低い状態でシードされていないことを確認してください。最新の API のほとんどは、セキュリティを得るために開発者が CSPRNG をシードする必要はありません。
- [x] MD5、SHA1、PKCS 番号 1 v1.5 など、廃止された暗号化機能やパディングスキームは避けてください。
- [] 構成と設定の有効性を個別に確認します。

### 気になる、あとで読む

- [OWASP に学ぶパスワードの安全なハッシュ化](https://dev.classmethod.jp/articles/modern-password-hashing-owasp-way/)
- [コンテンツセキュリティポリシーのチートシート](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [PHP の設定に関するチートシート](https://cheatsheetseries.owasp.org/cheatsheets/PHP_Configuration_Cheat_Sheet.html)
- [GitHub: awesome-php-security](https://github.com/guardrailsio/awesome-php-security)
