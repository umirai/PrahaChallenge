# Task2

- PR と Issue のテンプレートをこのリポジトリに追加してみた
  - PR
    - `.github/PULL_REQUEST_TEMPLATE/`配下に md ファイルを追加
  - Issue
    - `.github/ISSUE_TEMPLATE/`配下に yml ファイルを追加
      - md ファイルでも追加できるがレガシーなスタイルなんだとか
      - yml ファイルで定義した Issue フォーム、バリデーションなど追加できて便利
      - ただしベータ版で public リポジトリにしか使えないっぽいので気を付ける
        > Note: Issue forms are currently in beta for public repositories on GitHub.com only.
- `CONTRIBUTIN.md`を追加すると PR 作成時にアラート表示できるらしいので試しに作ってみた
- ＊運用しながら改善していくべきなので追加したファイルはあくまでサンプル

## 参照

- PR
  - [リポジトリ用のプルリクエストテンプレートの作成
    ](https://docs.github.com/ja/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)
  - [Pull Request のテンプレートを作って効率よくレビューしよう！](https://dev.classmethod.jp/articles/pull-request-template/)
- Issue
  - [Issue テンプレートを作成する](https://docs.github.com/ja/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository#creating-issue-templates)
  - [Issue フォームの構文
    ](https://docs.github.com/ja/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)
