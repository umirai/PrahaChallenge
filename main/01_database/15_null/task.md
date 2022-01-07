## １. SELECT 句の条件指定で以下の式を実行した時の結果を答える

- NULL = 0：null
- NULL = NULL：null
- NULL <> NULL：null
- NULL AND TRUE：null
- NULL AND FALSE：false
- NULL OR TRUE：true

Memo...

- null に対する、等号(＝)、等号否定(≠)、不等号(＜＞ ≦≧)を含む比較は、すべて null を返す：https://www.gixo.jp/blog/12326/
- null は、集計処理では、合計(sum)、最大(max)、最小(min)、件数(count)などの対象にならない：https://www.gixo.jp/blog/12529/
- 三値論理について
  - 考え方のコツとして、3 つの真理値の間に次のような優先順位があると考える
    - AND の場合 ： false ＞ unknown ＞ true
    - OR の場合 ： true ＞ unknown ＞ false
    - AND の演算に unknown が含まれた場合、結果が絶対に true にならない
    - 参照
      - [SQL への道 3 値論理編](https://qiita.com/devopsCoordinator/items/9c10410b50f8fcc2ba79)
      - [三値論理について](https://zenn.dev/indigo13love/articles/b3604502149b2f)

## ２. GitHub の issue に assignee を割り当てるような状況にて

- テーブル設計を見直す：modeling.pu / modeling.png を参照
- 果たして NULL がデータベースに存在することは本当に悪なのか：
  - 絶対NGの過激派と、できるだけNGの穏健派があるらしい（笑）
  - SQLアンチパターンと、達人に学ぶSQL徹底指南書では穏健派
  - 完全に廃絶するにこしたことはないが、さして重要ではない箇所にNULLが入っていても目を瞑るのが現場の肌感とのこと

## 3. DB の Null に関するクイズ

- SQL では boolean 値を true/false に unknown を加えた 3 値理論を採用している。イエスかノーか。
  - YES
- SQL 上では unknown という表現は 1 つだが、２種類の文脈で使用される。未知を意味する null と、もう一つはなにか。
  - 未知を意味する null（＝いずれわかる可能性があるもの）と、適用不能を意味する（＝そもそもわかる可能性がないもの）
