# 実装1

### 1. スロークエリログを有効化（対象：実行に0.1秒以上かかったクエリ）

```sql
-- sloq query log の有効化
set global slow_query_log = ON;

-- ログの出力方式をお好みで（デフォルトはファイル）

  -- 1. mysql.slow_log テーブルに保存する
  set global log_output = 'TABLE';

  -- 2. /tmp/slow.log ファイルへ出力する
  set global log_output = 'FILE';
  set global slow_query_log_file='/tmp/slow.log';

-- 0.1秒以上のクエリを出力する
set global long_query_time = 0.1;

-- 変更内容を確認（反映されていなかったら一度exitしてみるとよい）
SHOW VARIABLES LIKE 'slow_query%';
SHOW VARIABLES LIKE 'long%';
SHOW VARIABLES LIKE 'log_output%';
```

- [スロークエリの確認方法](https://ptune.jp/tech/how-to-check-mysql-slow-query/)
- [Mysql slow queryの設定と解析方法](https://masayuki14.hatenablog.com/entry/20120704/1341360260)

### 2. 実行時間0.1秒以下のクエリを3つ実行（スロークエリログに記録されないことを確認）

```sql
-- 確認方法
-- SELECT * FROM mysql.slow_log;

-- 1.
SELECT * FROM employees WHERE emp_no = 499999;

-- 2.
SELECT * FROM titles WHERE emp_no = 49999;

-- 3.
SELECT E.*, T.* FROM employees AS E LEFT JOIN titles AS T ON E.emp_no = T.emp_no WHERE E.emp_no = 499999;
```

### 3. 実行時間0.1秒以上のクエリを3つ実行（スロークエリログに記録されることを確認）


```sql
-- 確認方法
-- SELECT * FROM mysql.slow_log;

-- 1. query_time: 00:00:00.233575
SELECT * FROM employees;

-- 2. query_time: 00:00:00.172064
SELECT * FROM employees WHERE gender = 'M';

-- 3. query_time: 00:00:01.757705
SELECT * FROM salaries;
```