☆ 図解は拝借( ＾ ∀ ＾)

## Git Flow（ブランチベース）

![Git-Flow](./images/gitflow.jpeg)
https://atmarkit.itmedia.co.jp/ait/articles/1708/01/news015.html

### 概要

- master がプロダクション環境
  - プロダクション環境でバグが発生したとき hotfix ブランチを切って修正していく
- release がステージング環境
- develop が開発環境
  - ここから feature ブランチを切って機能開発していく

### メリット

- バージョン管理が容易
- 本番・ステージング・開発環境の仕切りが直感的で
  - あれ！？ここ本番環境！？的なミスが起こりにくい

### デメリット

- ブランチが長命化してしまうこと
  - コンフリクトによる開発効率低下が起こりやすい、
  - 大規模なマージによってバグやリグレッションが頻繁に発生する
  - ソフトウェアの状態を安定化する作業が必要になる
  - 「コードロック」または「コードフリーズ」の期間を用意する必要がある
  - マージ後のコードを徹底的にテストする必要がある
  - バグの修正も必要
- PR によるコードの品質管理が行いやすいが、ハイスキル者（レビュアー）に負荷が集中する

## GitHub Flow（トランクベース）

![GitHub-Flow](./images/githubflow.jpeg)
https://atmarkit.itmedia.co.jp/ait/articles/1708/01/news015.html

### 概要

- 見ての通り Git-Flow と比較してかなりシンプル

### メリット

- ブランチが短命化する
  - コンフリクトによる開発効率低下が起こりにくい
  - レビューコストが低くなる
- 常にリリース可能なブランチのみ存在するためデプロイまでが高速になる
  - CI の恩恵を最大限享受できる

主に開発効率において高いパフォーマンスを発揮可能との研究結果が出ている

> 2016 年（PDF）と 2017 年（PDF）の DevOps Research and Assessment（DORA）の分析結果は、チームが次のプラクティスに従うことで、より高いレベルのソフトウェアを配信し、運用パフォーマンス（配信速度、安定性、可用性）を改善できることを示しています。

> --- [トランクベース開発の実装方法](https://cloud.google.com/architecture/devops/devops-tech-trunk-based-development?hl=ja), [DevOps Research and Assessment 2016](https://services.google.com/fh/files/misc/state-of-devops-2016.pdf?hl=ja#page=31), [DevOps Research and Assessment 2017](https://services.google.com/fh/files/misc/state-of-devops-2017.pdf?hl=ja#page=40)

### デメリット

- ブランチベースでの開発と最も異なるのは「同期的な品質担保」が必要になること
  - ペアプロを行うか、他のどの作業よりもお互いのコードのレビューを優先するようにチーム内で合意の形成が必要
- feature フラグの存在
  - 実装途中のコードまでデプロイするのでフラグを導入する必要がある（＝実装に機能とは関係のないコードを含まなければならない）
  ```javascript
  // サンプル
  if （featureFlag） {
    // 機能がオン
  } else {
    // 機能がオフ
  }
  ```
  - [参照：フィーチャーフラグ（Feature Flag）はなぜ必要なのか？](https://codezine.jp/article/detail/14114)
- 小さなバッチで開発する方法をチームで学習している必要がある
  - [参照：DevOps プロセス: 小さいバッチ単位の作業](https://cloud.google.com/architecture/devops/devops-process-working-in-small-batches?hl=ja)
- ビルドとテストプロセスの高速化が必要
  - モノリスには向かない

## それぞれのメリデメ、採用場面など

- ブランチベースは厳密なコントロールが可能なので、oss や若手開発者が多いチーム、確立された製品がある保守段階で有用

> When Does Git Flow Work Best?

> When you run an open-source project.
> This style comes from the open-source world and it works best there. Since everyone can contribute, you want to have very strict access to all the changes. You want to be able to check every single line of code, because frankly you can’t trust people contributing. Usually, those are not commercial projects, so development speed is not a concern.

> When you have a lot of junior developers.
> If you work mostly with junior developers, then you want to have a way to check their work closely. You can give them multiple hints on how to do things more efficiently and help them improve their skills faster. People who accept pull requests have strict control over recurring changes so they can prevent deteriorating code quality.

> When you have an established product.
> This style also seems to play well when you already have a successful product. In such cases, the focus is usually on application performance and load capabilities. That kind of optimization requires very precise changes. Usually, time is not a constraint, so this style works well here. What’s more, large enterprises are a great fit for this style. They need to control every change closely, since they don’t want to break their multi-million dollar investment.

> -- [Trunk-based Development vs. Git Flow](https://www.toptal.com/software/trunk-based-development-git-flow)

- トランクベースはシンプルでリリースサイクルが早いため、スタートアップで継続的なイテレーションが必要な場面、ハイスキルな開発者が多いチームで有用

> When Can Git Flow Cause Problems?

> When you are just starting up.
> If you are just starting up, then Git flow is not for you. Chances are you want to create a minimal viable product quickly. Doing pull requests creates a huge bottleneck that slows the whole team down dramatically. You simply can’t afford it. The problem with Git flow is the fact that pull requests can take a lot of time. It’s just not possible to provide rapid development that way.

> When you need to iterate quickly.
> Once you reach the first version of your product, you will most likely need to pivot it few times to meet your customers’ need. Again, multiple branches and pull requests reduce development speed dramatically and are not advised in such cases.

> When you work mostly with senior developers.
> If your team consists mainly of senior developers who have worked with one another for a longer period of time, then you don’t really need the aforementioned pull request micromanagement. You trust your developers and know that they are professionals. Let them do their job and don’t slow them down with all the Git flow bureaucracy.

> -- [Trunk-based Development vs. Git Flow](https://www.toptal.com/software/trunk-based-development-git-flow)

## 参照

- [トランクベース開発について](https://rheb.hatenablog.com/entry/2021/08/24/トランクベース開発について?amp=1)
- [DevOps Research and Assessment 2016](https://services.google.com/fh/files/misc/state-of-devops-2016.pdf?hl=ja#page=31)
- [DevOps Research and Assessment 2017](https://services.google.com/fh/files/misc/state-of-devops-2017.pdf?hl=ja#page=40)
- [トランクベース開発 DevOps チーム間でこのバージョン管理が一般的なプラクティスである理由を確認する](https://www.atlassian.com/ja/continuous-delivery/continuous-integration/trunk-based-development)
- [1 日に 15 回本番デプロイを実現するトランクベース開発のコツ](https://developers.cyberagent.co.jp/blog/archives/31837/)
- [「高速な開発サイクルを実現するフィーチャーフラグ入門」連載一覧](https://codezine.jp/article/corner/869)
- [DevOps 技術: トランクベース開発](https://cloud.google.com/architecture/devops/devops-tech-trunk-based-development?hl=ja)
- [トランクベース開発調査まとめ](https://zenn.dev/dove/scraps/0c36d867618496)
- [Trunk-based Development vs. Git Flow](https://www.toptal.com/software/trunk-based-development-git-flow)
