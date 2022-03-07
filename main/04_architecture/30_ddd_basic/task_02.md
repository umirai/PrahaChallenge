## 境界づけられたコンテキストの実例（例：「商品」という名前の概念を製造部門と経理部門が扱う際、同じ「価格」というプロパティだとしても、製造部門だと原価、経理部門だと注文金額の意味を持つ、など）

EC サイトにおける「ユーザー」の概念で、ユーザーから見て住所は自分の住所、配送業者から見て住所は配送先の意味になる。

## 以下のプロパティを持つ「Human」エンティティを作成

- 血液型
- 生年月日
- 名前

```typescript
type BloodType = "a" | "b" | "ab" | "o";

interface IHumanProps {
  id: string;
  birthDate: Date;
  bloodType: BloodType;
  name: string;
}

class Human {
  private readonly id: string;
  private birthDate: Date;
  private bloodType: BloodType;
  private name: string;

  public constructor(props: IHumanProps) {
    if (props.id === undefined) {
      throw new Error("IDが設定されていません。");
    }
    if (props.birthDate === undefined) {
      throw new Error("birthDateが設定されていません。");
    }
    if (props.bloodType === undefined) {
      throw new Error("bloodTypeが設定されていません。");
    }
    if (props.name === undefined) {
      throw new Error("nameが設定されていません。");
    }

    this.id = props.id;
    this.birthDate = props.birthDate;
    this.bloodType = props.bloodType;
    this.name = props.name;
  }
}
```

## 先ほど作成した「Human」エンティティの各プロパティを値オブジェクトに置き換える（それぞれの値オブジェクトには以下のルールが存在）

- 血液型：a,b,o,ab 以外の値は設定できない
- 生年月日：20 歳以上の生年月日しか設定できない
- 名前：20 文字未満でなければいけない

```typescript
/**
 * BirthDate
 */
class BirthDateVO {
  private readonly value: Date;

  public constructor(birthDate: Date) {
    if (birthDate === null || birthDate === undefined) {
      throw new Error("誕生日が設定されていません。");
    }

    if (this.age(birthDate) <= 20) {
      throw new Error("20歳未満は登録できません。");
    }

    this.value = birthDate;
  }

  private age(birthDate: Date): number {
    // 日付から年齢を算出する処理
  }
}

/**
 * BloodType
 */
type BloodType = "a" | "b" | "ab" | "o";
class BloodTypeVO {
  private readonly value: BloodType;

  public constructor(bloodType: BloodType) {
    if (bloodType === null || bloodType === undefined) {
      throw new Error("血液型が設定されていません。");
    }

    this.value = bloodType;
  }
}

/**
 * Name
 */
class NameVO {
  private readonly value: string;

  public constructor(name: string) {
    if (name.length >= 20) {
      throw new Error("名前は20文字未満で登録してください。");
    }

    this.value = name;
  }
}

/**
 * Human
 */
interface IHumanProps {
  id: string;
  birthDate: BirthDateVO;
  bloodType: BloodTypeVO;
  name: NameVO;
}
class Human {
  private readonly id: string;
  private birthDate: BirthDateVO;
  private bloodType: BloodTypeVO;
  private name: NameVO;

  public constructor(props: IHumanProps) {
    if (props.id === undefined) {
      throw new Error("IDが設定されていません。");
    }

    this.id = props.id;
    this.birthDate = props.birthDate;
    this.bloodType = props.bloodType;
    this.name = props.name;
  }
}

// import import { uuid } from 'uuidv4';
// const props: IHumanProps = {
//   id: uuidv4(),
//   birthDate: new BirthDateVO(new Date('1995-09-12')),
//   bloodType: new BloodTypeVO('a'),
//   name: new NameVO('umedamirai'),
// }
// const human = new Human(props);
// console.log(human);
```
