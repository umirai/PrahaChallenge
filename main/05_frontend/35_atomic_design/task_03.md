# アトミックデザインで起こりうる問題点

- 管理コスト・・・ここに尽きる

  - コンポーネントがあちこちに散らばっているため、コンポーネントが不要になった際も削除し忘れてどこからも参照されないまま残り続ける可能性
  - 分割粒度を正確に守り続けるにはチーム内で認識の統一が必要
  - ファイル数がめっちゃ増える
    - 状態管理をどうするか問題（props バケツリレー）

# アトミックデザインに代わるディレクトリ構成を考える

## 参照

- [GoogleDeveloperExpert のよしこさんの記事](https://zenn.dev/yoshiko/articles/99f8047555f700)
- [React のベストプラクティスを集めたリポジトリ](https://github.com/alan2207/bulletproof-react)

## ポイント

- page と template を一緒にする（レイアウトを共通化したい場面はそこまで多くないため）
- organism, molecule, atom の切り分けは、モデルに関心を持つか、持たないかで大別する
  - モデルに関心を持つ organism(=model), 持たない molecule&atom(=shared)
    - アトミックデザインの粒度を踏襲したければ、shared 配下を block,element などで分けてもいいかも

## 結論（仮）

```markdown
- src/
  - components/
    - global/ (shared に入れたいけど model に一部依存しているグローバル系のコンポーネント)
      - Header/
      - Footer/
    - page/ (page,template に対応)
      - Top/
        - Top.tsx: メインコンテンツ。非同期フェッチを呼べるのはここだけ。
        - Top.layout.tsx: メインコンテンツのラッパー。レイアウト定義、非同期フェッチの suspense を行う。
        - Top.module.css
        - Top.stories.tsx
        - index.ts: 認証の有無を管理
    - model/ (organism に対応、モデルに関心を持つ)
      - user/
        - UserAvatar/
          - UserAvatar.tsx
          - UserAvatar.module.css
          - UserAvatar.stories.tsx
          - index.ts
    - shared/ (molecule, atom に対応、モデルに関心を持たない）
      - Suspense/
      - ErrorBoundary/
```
