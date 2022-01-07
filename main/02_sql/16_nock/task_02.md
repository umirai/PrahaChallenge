# 問題回答

- **GROUP BY した上で絞り込みを行う際の「WHERE」と「HAVING」の挙動の違いは何か。**

  - `WHERE`：絞り込み前の条件指定
  - `HAVING`：絞り込み後の条件指定

- **SQL の文脈において DDL、DML、DCL、TCL とは何か。**
  - `DDL（Data Definition Language）`：データ定義言語。DB のテーブル、ビュー、インデックスなどの作成や変更をする SQL のこと。
  - `DML（Data Manipulation Language）`：データ操作言語。DB 内で CRUD を行う SQL のこと。
  - `DCL（Data Control Langugage）`：データ制御言語。DB へのアクセス権の制御や状態管理を行う SQL のこと。
    - GRANT 文（権限を与える）、REVOKE 文（権限を奪う）など
  - `TCL（Transaction Control Language）`：トランザクション制御言語。トランザクションを制御する SQL のこと。
    - BEGIN TRANSACTION 文（トランザクションの開始）、COMMIT 文（トランザクションの確定）、ROLLBACK 文（トランザクションの破棄）など
    - DB 製品によっては、これらを DCL に含める場合もある

  **参照：**[DDL、DML、DCL、TCLについて](https://johobase.com/sql-instruction-type/)