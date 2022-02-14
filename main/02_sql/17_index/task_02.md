
# 実装１

### クエリメモ

```sql
-- 履歴初期化
TRUNCATE TABLE performance_schema.events_statements_history_long;

-- 履歴取得
SELECT EVENT_ID, TRUNCATE(TIMER_WAIT/1000000000000, 6) AS Duration, SQL_TEXT FROM performance_schema.events_statements_history_long;
```

### 1. WHERE句を1つだけ含むSELECTクエリを3つ考える（[DockerImageはこちら](https://hub.docker.com/r/genschsa/mysql-employees)）

1. `SELECT * FROM employees WHERE gender = 'M';`
2. `SELECT * FROM employees WHERE birth_date = '1960-09-12';`
3. `SELECT * FROM employees WHERE first_name = 'Jessie';`

### 2. クエリを実行して、取得に要した時間を測定する
1. 0.201939 sec
2. 0.110771 sec
3. 0.083707 sec

### 3. 上記のSELECTクエリを高速化するインデックスを作成
1. `CREATE INDEX gender_index ON employees(gender)`
2. `ALTER TABLE employees ADD INDEX birth_date_index (birth_date)`
3. `ALTER TABLE employees ADD INDEX first_name_index (first_name)`

### 4. インデックスを使って検索した場合どれだけ検索速度に差が出るか、測定
1. 0.306882 sec（遅くなった：カーディナリティの問題）
2. 0.001598 sec（約70倍速くなった）
3. 0.001050 sec（約80倍速くなった）

### 5. EXPLAINを使って、ちゃんとインデックスが使われていることを証明
1. keyにgender_indexが使用されていた
2. keyにbirth_date_indexが使用されていた
3. keyにfirst_name_indexが使用されていた

---

**perfromance_schema 確認手順**

```sql
-- 1. イベントの収集を有効化する
UPDATE setup_instruments SET ENABLED = 'YES', TIMED = 'YES' WHERE NAME LIKE '%statement/%';
UPDATE setup_consumers SET ENABLED = 'YES' WHERE NAME LIKE '%events_statements_%';

-- 2. 任意のクエリを実行
SELECT * FROM employees WHERE gender = 'M';

-- 3. performance_schemaから時間を取得する
SELECT
  EVENT_ID,
  TRUNCATE(TIMER_WAIT/1000000000000,6) AS Duration,
  SQL_TEXT
FROM
  performance_schema.events_statements_history_long
WHERE
  SQL_TEXT = "SELECT * FROM employees WHERE gender = 'M'";
```

- [パフォーマンススキーマの概要](https://thinkit.co.jp/article/10028)
- [MySQLでクエリの速度を計測する](https://collapse-natsu.com/post/mysql_query_speed)
- [setup_instruments（どのイベント情報を取得するかの設定）](https://dev.mysql.com/doc/refman/5.6/ja/performance-schema-setup-instruments-table.html)
- [setup_consumers（どのコンシューマーを有効化するかの設定）](https://dev.mysql.com/doc/refman/5.6/ja/performance-schema-pre-filtering.html#performance-schema-consumer-filtering)

<br>

**インデックスを追加する**

1. `CREATE INDEX [index] ON [table]([Column] [,Column...])`
2. `CREATE UNIQUE INDEX [index] ON [table]([Column] [,Column...])`
3. `ALTER TABLE [table] ADD INDEX [index] ([Column] [,Column...])`

- [インデックス追加の構文](https://www.dbonline.jp/mysql/index/index1.html)
- [その他の関連構文](https://qiita.com/kkyouhei/items/e3502ef632c48d94541d)

<br>

**EXPLAINについて**

- [MySQLのEXPLAIN（実行プラン）まとめ](https://qiita.com/tsurumiii/items/0b70f1a1ee0499be2002)