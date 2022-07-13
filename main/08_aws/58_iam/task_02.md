# 2. 実装と問題回答

## ユーザー

### IAM 管理者ユーザーの作成・ログイン（完了）

<aside>
💡 **初回の設定**
ルートアカウントから、IAM管理者ユーザーの請求データへのアクセスを有効化する

</aside>

1. AWS アカウントに管理者グループ（Administors など）をセットアップする
2. Administors グループに AdministorAccess ポリシーをアタッチする
3. IAM ユーザーを作成し、Administors グループに追加する

![create-iam-user.png](./screenshots/create-iam-user.png)

### PowerUserAccess ポリシーを付与した IAM ユーザーを作成（完了）

**PowerUserAccess の説明**

> Provides full access to AWS services and resources, but does not allow management of Users and groups.

**IAM ダッシュボードでは次のエラーが表示される**

> この操作を実行するために必要な許可がありません。許可を追加するように管理者に依頼してください。

**理由**

PowerUserAccess ポリシーは前述の記載の通り「AWS サービスの全てのリソースにアクセスできるが、ユーザーやグループの管理はできない」ため。

### 問題回答

- ルートアカウントではなく IAM 管理者アカウントでログインする理由
  - 情報漏洩のリスク、情報漏洩時のリスクを少しでも低くするため
- IAM アカウントを使い回すリスク
  - 操作履歴を特定しにくくなる
- AdministorAccess ポリシーと PowerUserAccess ポリシーの違い

  ```json
  // AdministratorAccess
  {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": "*",
              "Resource": "*"
          }
      ]
  }

  // PowerUserAccess
  {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "NotAction": [
                  "iam:*",
                  "organizations:*",
                  "account:*"
              ],
              "Resource": "*"
          },
          {
              "Effect": "Allow",
              "Action": [
                  "iam:CreateServiceLinkedRole",
                  "iam:DeleteServiceLinkedRole",
                  "iam:ListRoles",
                  "organizations:DescribeOrganization",
                  "account:ListRegions"
              ],
              "Resource": "*"
          }
      ]
  }
  ```

  | ポリシー            | リソース | アクション         |
  | ------------------- | -------- | ------------------ |
  | AdministratorAccess | 全て許可 | 全て許可           |
  | PowerUserAccess     | 全て許可 | 細かく制御している |

- AWS 管理ポリシーとカスタマー管理ポリシーの使い分け
  - 編集不要でよくあるポリシーを付与したい場合は AWS 管理ポリシー
  - 実際のサービス運用で詳細に定義する場合はカスタマー管理ポリシー
    - ほとんどこっち？

## グループ

### Administoratorsグループの作成・ポリシー付与・ユーザー追加

ユーザーセクションで完了済み

### 問題回答

- ポリシーの直接付与と、グループ付与について
    - AdministratorAccessの場合は、グループによる管理が強く推奨されている

        > AWS アカウントに管理者グループを作成することは必須ではありませんが、強く推奨します。
        >

        [IAM の使用開始](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/getting-started.html)

    - 変更容易性が一番のメリット
