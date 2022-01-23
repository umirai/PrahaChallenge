# 実装2
mysqldumpslowコマンドで以下の条件に合致するクエリを特定する（オプションが必要）
>ヒント：ロック時間が短い場合、mysqldumpslowだと0secと表示されてしまうかもしれません。pt-query-digestなども有名なログ集計ツールで、より多くの統計情報が簡単に得られます。

```shell
# 構文
# mysqldumpslow [オプション] [引数] [対象ファイル]

# 1. 最も頻度高くスロークエリに現れるクエリ
mysqldumpslow -s c -t 1 /tmp/slow.log

# 2. 実行時間が最も長いクエリ
mysqldumpslow -s t -t 1 /tmp/slow.log

# 3. ロック時間が最も長いクエリ
mysqldumpslow -s l -t 1 /tmp/slow.log

```

### オプションと引数（[参照](https://dev.mysql.com/doc/refman/5.6/ja/mysqldumpslow.html#option_mysqldumpslow_sort)）
  - `-s`: 並び替えオプション
    - `c`: Count順
    - `t`: Time順
    - `l`: Lock順
    - `r`: Rows順
  - `-t`: 取得数オプション
    - N: 数値