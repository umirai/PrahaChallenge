# [このコード](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgAoFcoIBZwM4oDeAUMsugVAJIAmAXMnmFKAOanIAOUA9jegjC0GTFiHZlmcEHkRhgPEAxJkyeAUgg0tDZuggcyCHgFtOAGwiQaAQTAMAInEgcAvsXfFQkWIhSo4AE8TCHAAJQhjKBoIzh5kFWRWKwwsXAI8ACFAhgAKCmhhRmY2AEpkAF4APjRMHHwIAG0AXQ9iYgRzfDxatIaAZWgAN2AkBI5OdAAjc1HkYxk9QR4oXO5gIecUTiCQ8MiVmIg4hgDg0LAIqKO48sJPMkmZucm+gnzKItE2ABouXn4gi+JXEd0M80UTGQcHM5lS9QylWQYGwwDwADodud9tdYjx0ckwPD0hAsoEPoUaKVwQsoTsmMSGkiYXC6iSMTBQDRcmtytUuJiAQIhDRKhUKv8+MLaMgAGSygVSGRyBQgdHqBCabRU8HAGDINb4Ilshpg1SqFG8ADuyBAEBtAFEoLxVgByQDKDIA7BkAYqqAQZVAPYMgCkGQBODIALBkAUQyAVQZAH4MgAA5X2ABTTAFnagHMGQCaDIBAf9d1PND1UAHp88hAD8xgFNFQDSRoAs30AsgyAawZAEwJgACGNweIA)に潜む問題点

### やっていること
- `allPurchases`: 購入履歴を全て取得
- `pastPurchases`: 指定商品IDで、購入済みの商品を絞り込む
- `pasPurchases`が見つかればエラーを返し、見つからなければ購入手続きに進む

### 問題点
- 購入クラスに、購入履歴検証の責務が混入している（SRPに反く）
- 購入条件が加わった場合、クラス内のメソッドを修正しなければならない（OCPに反く）

### 変更するなら
- [x] MUST｜SRPに準拠するため、購入可能条件を切り出したい
- [ ] WANT｜OCPに準拠するため、購入可能条件を修正せずに追加のみで対応したい
- [ ] WANT｜DIPに準拠するため、条件チェックはインターフェース呼び出しで対応したい

### 変更後のコード
```typescript
interface Purchase {
  userId: string
  productId: string
  transaction: {
    succeeded: true
    completedAt: Date
  }
}

interface PaymentRecordRepo {
  getPurchasesBy: (userId: string) => Purchase[]
}

const checkPaymentRecord = (userId: string, paymentRecordRepo: PaymentRecordRepo): void => {
  const allPurchases = paymentRecordRepo.getPurchasesBy(userId);
  const pastPurchase = allPurchases.find((p) => p.productId === productId && p.transaction.succeeded);
  return pastPurchase.length === 0;
}

class PurchaseService {
  public constructor(private checkPaymentRecord: boolean) {}

  public purchase(productId: string) {
    if (checkPaymentRecord) {
      throw new Error('この商品はおひとりさま一品限定です！')
    }

    // 購入手続きに進む
  }
}

// 実行
const check = checkPaymentRecord('mirai128', new PaymentRecordRepo());
const purchaseService = new PurchaseService(check);
```

