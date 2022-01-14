## 1. 複数の親テーブルを参照して、二重目的の外部キーを使用するときに発生する問題（#6. ポリモーフィック関連）

- 外部キーを設定できない（＝外部キーではテーブルを 1 つのみ指定しなければならない）
- よって参照整合性制約を定義できない
- ポリモーフィック関連を許容する例
  - 特定の実績ある ORM を使用する場合で、かつ、まだ存在していない親テーブルとの関連を子テーブル側で定義する必要がある場合

## 2. どのようにテーブル設計を見直せばこの問題を解決できるか

- 共通の親テーブル作る
  - modeling.pu / modeling.png を参照

# 3. ポリモーフィック関連に陥りそうな例を考える

- EC サイトで、顧客が住所と請求先住所を持つ場合