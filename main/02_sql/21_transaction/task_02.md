# 実装

### 独立阻害要因を実際に試してみる

```sql
-- 現在の分離レベルを確認（デフォルトではREPEATABLE-READになっていた）
mysql1> SELECT @@GLOBAL.tx_isolation, @@tx_isolation;
+-----------------+
| @@tx_isolation  |
+-----------------+
| REPEATABLE-READ |
+-----------------+
1 row in set, 1 warning (0.00 sec)

-- 設定を変更（すべての独立阻害要因を再現するため、READ UNCOMMITTEDに）
mysql1> SET GLOBAL TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
Query OK, 0 rows affected (0.00 sec)

-- 変更が適用されていることを確認
mysql1> SELECT @@GLOBAL.tx_isolation, @@tx_isolation;
+-----------------------+------------------+
| @@GLOBAL.tx_isolation | @@tx_isolation   |
+-----------------------+------------------+
| READ-UNCOMMITTED      | READ-UNCOMMITTED |
+-----------------------+------------------+
1 row in set, 2 warnings (0.00 sec)



-- Dirty Read
mysql1> START TRANSACTION;
Query OK, 0 rows affected (0.00 sec)

mysql1> UPDATE employees SET birth_date = '2022-01-22' WHERE emp_no = 499999;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql2> START TRANSACTION;
Query OK, 0 rows affected (0.00 sec)

mysql2> SELECT * FROM employees WHERE emp_no = 499999;
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
| 499999 | 1958-05-01 | Sachin     | Tsukuda   | M      | 1997-11-30 |
+--------+------------+------------+-----------+--------+------------+
1 row in set (0.00 sec)



-- Non-repeatable read
mysql1> START TRANSACTION;
Query OK, 0 rows affected (0.00 sec)

mysql1> SELECT * FROM employees WHERE emp_no = 499999;
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
| 499999 | 1958-05-01 | Sachin     | Tsukuda   | M      | 1997-11-30 |
+--------+------------+------------+-----------+--------+------------+
1 row in set (0.00 sec)

mysql2> START TRANSACTION;
Query OK, 0 rows affected (0.00 sec)

mysql2> UPDATE employees SET birth_date = '2022-01-22' WHERE emp_no = 499999;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql2> COMMIT;

mysql1> SELECT * FROM employees WHERE emp_no = 499999;
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
| 499999 | 2022-01-22 | Sachin     | Tsukuda   | M      | 1997-11-30 |
+--------+------------+------------+-----------+--------+------------+
1 row in set (0.00 sec)



-- Phantom read
mysql1> START TRANSACTION;
Query OK, 0 rows affected (0.00 sec)

mysql1> SELECT COUNT(emp_no) FROM employees;
+---------------+
| COUNT(emp_no) |
+---------------+
|        300024 |
+---------------+
1 row in set (0.12 sec)

mysql2> START TRANSACTION;
Query OK, 0 rows affected (0.00 sec)

mysql2> INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (500000, '1995-09-12', 'Mirai', 'Umeda', 'M', '2022-01-22');
Query OK, 1 row affected (0.00 sec)

mysql2> COMMIT;
Query OK, 1 row affected (0.00 sec)

mysql1> SELECT COUNT(emp_no) FROM employees;
+---------------+
| COUNT(emp_no) |
+---------------+
|        300025 |
+---------------+
1 row in set (0.05 sec)
```

### 参照
- [第47回　トランザクション分離レベルを変更する](https://gihyo.jp/dev/serial/01/mysql-road-construction-news/0047)
- [[RDBMS][SQL]トランザクション分離レベルについて極力分かりやすく解説](https://qiita.com/PruneMazui/items/4135fcf7621869726b4b)