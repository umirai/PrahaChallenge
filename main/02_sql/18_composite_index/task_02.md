# 実装１

### クエリメモ

```sql
-- 履歴初期化
TRUNCATE TABLE performance_schema.events_statements_history_long;

-- 履歴取得
SELECT EVENT_ID, TRUNCATE(TIMER_WAIT/1000000000000, 6) AS Duration, SQL_TEXT FROM performance_schema.events_statements_history_long;
```

### 1. WHERE句を2つ以上含むSELECTクエリを3つ考える（[DockerImageはこちら](https://hub.docker.com/r/genschsa/mysql-employees)）

1. `SELECT * FROM employees WHERE first_name = 'Adel' AND last_name = 'Masada';`
2. `SELECT * FROM employees WHERE gender = 'M' AND DATE_FORMAT(birth_date, '%Y') = 1960;`
3. `SELECT * FROM salaries WHERE salary >= 100000 AND to_date = '9999-01-01';`

### 2. クエリを実行して、取得に要した時間を測定する
1. 0.085786 sec
2. 0.114959 sec
3. 0.821497 sec

### 3. 上記のSELECTクエリを高速化する複合インデックスを作成
1. `ALTER TABLE employees ADD INDEX name_index(first_name, last_name);`
2. `ALTER TABLE employees ADD INDEX birth_date_gender_index(birth_date, gender);`
3. `ALTER TABLE salaries ADD INDEX salary_to_date_index(salary, to_date);`

### 4. 複合インデックスを使って検索した場合どれだけ検索速度に差が出るか、測定
1. 0.001814 sec（約47倍）
2. 0.129391 sec（遅くなったw）
3. 0.759729 sec（ちょっと早くなったw）

### 5. EXPLAINを使って、ちゃんと複合インデックスが使われていることを証明
1. name_indexが使われていた
2. birth_date_gender_indexは使われておらず、テーブルをフルスキャンしていた！
3. salary_to_date_indexが使われていた

### おまけ
3番が遅いので調べてみると「task_01.md」の下記メモに反していた。

>範囲検索（>,>=,<,<=）より等価検索（=）を先に設定する

次の通り修正してみる。

```sql
-- 1. インデックスを削除して、等価条件で先に絞り込む形で計測する
ALTER TABLE salaries DROP INDEX salary_to_date_index;
SELECT * FROM salaries WHERE to_date = '9999-01-01' AND salary >= 100000;

-- 2. インデックスを張り直して（順番も入れ替えて）、再計測
ALTER TABLE salaries ADD INDEX to_date_salary_index(to_date, salary);
SELECT * FROM salaries WHERE to_date = '9999-01-01' AND salary >= 100000;

-- 結果
1. 0.862788 sec
2. 0.053216 sec
-> 約16倍早くなった！わーい笑
```

こんなに変わるとは・・・おわり。

---

- [効果のないインデックス---「性別」に付けても効果なし](https://xtech.nikkei.com/it/article/COLUMN/20070919/282317/)
- [SQL インデックスが効かない場合の原因と対処法](https://omachizura.com/2016/08/sql-index.html)
- [インデックスが使えない検索条件](https://qiita.com/NagaokaKenichi/items/44cabcafa3d02d9cd896)