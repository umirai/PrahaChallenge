# 実装

```sql
-- 1. 適当なビューを作成
CREATE VIEW employees_men (emp_no, first_name, last_name, gender)
AS
SELECT emp_no, first_name, last_name, gender FROM employees;

-- 2. 通常通りの実行（0.196819 sec）
SELECT emp_no, first_name, last_name, gender FROM employees;

-- 3. ビューからの実行（0.149794 sec）
SELECT emp_no, first_name, last_name, gender FROM employees_men;

-- 4. パフォーマンスの変化
-- ちょっと速くなってる！！
```