# 実装２

### 1. テーブルに対してINSERT文でデータを追加する。その際、処理に費やされた時間を記録しておく。

```sql
INSERT INTO employees VALUES (1000000, '1995-09-12', 'Mirai', 'Umeda', 'M', '2022-01-01')
```
→ 0.003589 sec

### 2. テーブルに作成したINDEXを全て削除する

```sql
ALTER TABLE employees DROP INDEX gender_index;
ALTER TABLE employees DROP INDEX birth_date_index;
ALTER TABLE employees DROP INDEX first_name_index;
```

### 3. 再度、上記のINSERT文で似たようなデータを追加し、その際処理に費やされた時間を記録しておく。

```sql
INSERT INTO employees VALUES (2000000, '1995-09-12', 'Mirai', 'Umeda', 'M', '2022-01-01')
```
→ 0.003416 sec（ほんのちょっと速くなった笑）

### 4. INDEXがある場合とない場合で、INSERTにかかる時間にはどのような変化があったか。その理由を説明する。

インデックスの再構築がなくなるので基本は早くなる。

### 5. 上記の処理速度の変化はDELETE文にも生じるか。理由と併せて説明。

生じる。インデックスの再構築はInsert, Update, Deleteで行われるため。
**要はインデックスは検索パフォーマンと引き換えにメンテナンスパフォーマンスを損なっている。**