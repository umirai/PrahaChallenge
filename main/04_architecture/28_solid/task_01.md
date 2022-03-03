## SOLID原則の各要素を、易しく説明（これらを守ることで、どのようなメリットがあるか）
#### S (Single Responsibility Principle): 単一責任の原則
- 1つのモジュールの責務は、1つにすべきであるという原則。
  - 「責務を明確に」
  - 責務が明確であれば、改修の際、影響範囲の把握が容易に。
  - かつ他の無関係な動作に影響を与えない。
  - 結果的にバグが少なく、開発速度も向上する。
#### O (Open-Closed Principle): 開放閉鎖の原則
- 動作の拡張に対して開放的で、動作の変更に対して閉鎖的であるべきという原則。
  - 「追加するけど、変更しない」
    - 既存コードを変更しないという意味ではなく、既存コードの機能を変更しないの意
  - 稼働中の既存のプログラムに影響を与えることなく、機能追加できる。
  - 既存コードの品質検査（レビュー）を再実行する必要がない
#### L (Liskov Substitution Principle): リスコフの置換原則
- サブタイプの振る舞い＝スーパータイプの振る舞いであるべきという原則。
  - is-a 関係はクラス継承以外でも成り立つ。実装継承（extends）ではなくインターフェイス実装（implements）の間でもサブタイプは成り立つ。
  - 正しい is-a 関係を示すための原則（＝継承を行うべきかどうかの判断指針にする）
    - 原則に反く場合：
      - 共通箇所をインターフェイス化 or 抽象クラス化する
      - is-a 関係は解消して、コンポジション（委譲）に切り替える
#### I (Interface Segregation Principle): インターフェイス分離の原則
- インターフェイスの使用者にとって不要なメソッドに依存させてはいけないという原則。
  - 「自分が使うメソッドにだけ依存せよ」
  - 細かい単位でインターフェイスを分離して、自分の関心ごとのみ扱えるようにしておく
#### D (Dependency Inversion Principle): 依存性逆転の原則
- 上位モジュールは下位モジュールに依存してはならないという原則。
  - 「抽象（インターフェイス）に依存せよ」
    - 同時に、抽象は実装の詳細に依存してはならない。

<br>

## 単一責任の原則と、単純にファイルを細かく分解する違い
- ファイルを細かく分解しても、その中に含まれる１つのモジュールが複数の責務を負っていた場合、単一責任の原則に背く。
- 反対にファイル内のコード量が大きく、その中に複数のモジュールが存在していても、モジュールの責務が複数にまたがっていない場合は、単一責任の原則には背かない。

## Open-Closed-Principleの実例を一つ考えて、作成（TS Playgroundで書けるような簡単なサンプルで可）
```typescript
enum Grade {
    JUNIOR = "Junior",
    SENIOR = "Senior",
}

interface IEmployee {
    grade: Grade;
    salary: number;
    calculateBonus: () => number;
}

class JuniorEngineer implements IEmployee {
    private BONUS_COEFFICIENT = 1.5;
    grade = Grade.JUNIOR;

    constructor(public salary: number) {}

    calculateBonus() {
        return this.salary * this.BONUS_COEFFICIENT;
    }
}

class SeniorEngineer implements IEmployee {
    private BONUS_COEFFICIENT = 2;
    grade = Grade.SENIOR;

    constructor(public salary: number) {}

    calculateBonus() {
        return this.salary * this.BONUS_COEFFICIENT;
    }
}

class BonusManager {
    calculate(employees: IEmployee[]) {
        return employees.reduce((total, employee) => {
            return total + employee.calculateBonus();
        }, 0);
    }
}

const employees = [new JuniorEngineer(100), new JuniorEngineer(150), new SeniorEngineer(300)];

const bonusManager = new BonusManager();
console.log(bonusManager.calculate(employees))
```

## リスコフの置換原則に違反した場合、どのような不都合が生じるか
- 仮にスーパークラスA、サブクラスBにおいて、メソッドの振る舞いが異なる場合、呼び出し元で条件分岐が必要になる（＝開放閉鎖の原則に違反する）
  - クラスで定義したメソッドが下流で変更されてしまうことで、メンテナビリティの大幅低下につながる
  - [サンプル](https://zenn.dev/chida/articles/5373e135be11f0)

## インターフェースを用いる設計上のメリット
- 一部の変更の影響が多岐に渡るという状況を避けられる
- 設計がシンプルになることで属人化を避けられる

## どんな時に依存性の逆転を用いる必要が生じるか
- クラスで単体テストをしたいとき

## デメトルの法則について易しく説明（この法則を守ることで、どのようなメリットがあるか）
- あるオブジェクトは、自分以外のことをたくさん知りすぎちゃいけないよというお話。別名「最小知識の法則」。
  - 暗黙の依存をつくるべきではないということ
  - たくさんのフィールド識別子（ドット）を見かけたら赤信号。ドットはひとつまで。
  - 「尋ねるな、命じろ」
  - これ以外のメソッドを実行しちゃいけない：
    1. オブジェクト自身のメソッド
    2. 自身にパラメータとして渡されたオブジェクトXのメソッド
    3. 自身の内部でインスタンス化されたオブジェクトYのメソッド
    4. 自身が保持しており、直接アクセスできるオブジェクトZのメソッド

    **※ オブジェクトX/Y/Zが戻したオブジェクトのメソッドは呼び出してはいけない**
  - この法則を守ると：
    - 単体テストが楽になる（モックいっぱいつくらなくていい）
    - 改修が楽になる（他のオブジェクトの仕様変更の影響を受けにくくなる）

## デメトルの法則を意識して書かれたコードを確認して、これだけでは保守性に対して効果が無いことを説明（[コード](https://www.typescriptlang.org/play?#code/MYGwhgzhAEAKCuAnYALSBTaBvAsAKGmgAdEBLANzABdMB9eCdRASQBMAuaCKsgOwHN8hEhWp0SAe1bxgVNp259BBaMAm9FMqhMQAKBk3lcepAQBpiiKVqOLT-AJTYhhV1RSkIAOnqMWraABeaAN-F1dod08fSWlZNiDLa3jWFwBffBcAeizoQAbTQC65QBgGQGUGQDEGQBCGQGMGQDMGfnQqGkQsxkamQCSGQCztQEr-QHUGGsAhBkAlBkAYhkAHBkBxhkBDhkAJhkBrhkA7BkBVm0BxJUBrBkB7BkBVBMBZ5V7APwZAbQZAZIZACIZAWwZAQH-AWAYXIngAIxBSYGh6qhC-Nl0nXBUIxANJC8SIeby+QypFQZFT3J4vLgNT6Q3SkVi-cJuME+UIJYJo9J3R7PV7vJJxOSsH7Of6uQFUYGg6K0WI2KGEGHCYkI1rktmo9E0iKEKLg1kpRIE6H4NJAA)）
たしかにプロパティを直接参照しなくなったけど、呼び出し側からすれば外部の変数を参照する状況は変わっていない。疎結合ではない。

## デメテルの法則を守る意味・効果について、ペアと議論
- 疎結合になり、よい
- 自然とドメインロジックが抽象化されて、よい
- ある程度大きな規模でよろしくないコードをリファクタリングすることはかなり難しそうな印象