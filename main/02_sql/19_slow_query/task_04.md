# 質問回答1
> 1. LIMIT 1で遅いのはなぜか？

LIMITは最終的に一件を表示するだけで、それ以前の検索は全て行なっているからだよ。

<br>

> 2. 下記クエリを、WHEREで絞るか、ONで絞るか（INNER JOINなら結果は変わらないが、LEFT OUTER JOINならどうか）

`SELECT * FROM employees e JOIN salaries s ON e.emp_no = s.emp_no WHERE gender = "M" AND birth_date > "1960-01-01"`

### `ON` で絞った方がいい理由
新人くんの検証通り内部結合ではパフォーマンスに差はない。外部結合の場合は、ONで絞り込むと条件に合致しないデータも取得してしまうので、その先輩が間違っているのだと思う。

### `JOIN WHERE` で絞る
結合後の絞り込み。条件に合致するデータだけ取得する。

### `JOIN ON` で絞る
結合前の絞り込み。外部結合の場合は条件に合致しないデータも取得する。


### 参照
- [SQL記述者全員が理解すべきSELECT文の論理的な処理順序のお話](https://qiita.com/k_0120/items/a27ea1fc3b9bddc77fa1)
- [JOIN ON で絞り込み条件を入れるのと、JOIN ONの後WHERE句で絞り込み条件を入れるのとでは、結果が違う件](https://atsuizo.hatenadiary.jp/entry/2016/12/12/163921)
- [SQL JOINの結合条件とWHEREの条件の違いと使い分け](https://zukucode.com/2017/08/sql-join-where.html)
- [[SQL] JOIN句があるSQLで条件をON句に書く場合とWHERE句に書く場合の違い](https://oracle.programmer-reference.com/sql-join-on-where/)