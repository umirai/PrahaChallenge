# Task2

## 実装結果

- DDD 課題に PR 作成時、統合テストを自動実行するワークフローを追加した（[Commit Log](https://github.com/umirai/ddd-challenge/commit/a32a2085465ab6d5ebb36e20381dab800bedb404)）

```json
// スクリプト
scripts: {
  // 省略
  "migrate:reset": "dotenv -e .env.dev -- prisma migrate reset --skip-seed",
  "migrate:seed": "dotenv -e .env.dev -- prisma migrate reset",
  "migrate:dev": "dotenv -e .env.dev -- prisma migrate dev",
  "migrate:test": "dotenv -e .env.test -- prisma migrate reset",
  "test": "yarn migrate:test && dotenv -e .env.test -- jest",
  "test:unit": "dotenv -e .env.test -- jest --testPathIgnorePatterns=integration",
  "test:integration": "yarn migrate:test && dotenv -e .env.test -- jest --testPathPattern=integration",
  "test:ci:integration": "dotenv -e .env.test -- jest --testPathPattern=integration"
}
```

```yml
name: Integration Test

on: pull_request

jobs:
  Integration-Test-Actions:
    runs-on: ubuntu-latest
    env:
      DATABASE_URL: postgresql://root:test@localhost:5433/postgres?schema=public
    services:
      postgres:
        image: postgres
        env:
          POSTGRES_USER: root
          POSTGRES_PASSWORD: test
          POSTGRES_DB: postgres
          POSTGRES_INITDB_ARGS: "--encoding=UTF-8"
          TZ: "Asia/Tokyo"
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5433:5432
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "16"
          cache: "yarn"
      - run: yarn
      - run: yarn prisma generate
      - run: yarn prisma migrate deploy
      - run: yarn prisma db seed
      - run: yarn test:ci:integration
```

- テストは無事通過した
  ![workflow-integration-test](./screenshots/workflow-integration-test.png)

## メモ

### ちょっとハマったこと

- [Prisma のこちらの設定](https://www.prisma.io/docs/guides/database/seed-database#how-to-seed-your-database-in-prisma)を実装していたため、`prisma migrate reset`を実行すると自動でシーディングできるようにしていた。
- 自動シーディングの際には CLI でインタラクティブなスクリプト（Yes or No を回答する）が実行されるため、ジョブ内で次のエラーが発生していた。
  ![actions-error-2](./screenshots/actions-error-2.png)
- ジョブでは DB リセット＋シーディング＋テスト実行を一挙に行う`yarn test:integration`を使用せずに、マイグレーションを`prisma migrate deploy` + `prisma db seed`に分けることで、インタラクティブなスクリプトじゃなくしたうえで、単純なテストを実行すると動いた
