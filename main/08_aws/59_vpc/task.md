## サブネット is 何

> 大きなネットワークの中にある小さなネットワーク。

[サブネットとは｜「分かりそう」で「分からない」でも「分かった」気になれる IT 用語辞典](https://wa3.i-3-i.info/word11973.html)

## パブリックサブネット

- インターネット通信ができるサブネット
- web サーバーなどを設置する

## プライベートサブネット

- インターネット通信ができないサブネット
- インターネット通信不要のＤＢサーバーなどを設置する
- パブリックサブネットからインターネット通信したい場合はどうする？

  > パブリックサブネットに存在するネットワークアドレス変換 (NAT) ゲートウェイを使用して、インターネットにアクセスできます。

  👉  パブリックサブネットからアウトバウンドはできるが、インバウンドは受け付けない

  [パブリックサブネットとプライベートサブネットを持つ VPC (NAT)](https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/VPC_Scenario2.html)

## VPC とインターネット通信について

- VPC ネットワークにインターネットゲートウェイ（IGW）をアタッチすることで、VPC 内のサブネットでインターネット接続が可能に
- サブネットのルートテーブルで IGW に向けたルーティングを設定して使う
- IGW は AWS が自動でスケールしてくれるので可用性が高い

## VPC にプライベートサブネットとパブリックサブネットをマルチ AZ で構築する

<aside>
✅ プライベートサブネットを2つ、パブリックサブネット2つ、合計4つのサブネットを2つのAZに作成する

</aside>

- [x] VPC の作成
- [x] ap-northeast-3a でパブリックサブネット・プライベートサブネットを作成
- [x] ap-northeast-3b でパブリックサブネット・プライベートサブネットを作成
- [x] ルートテーブルの作成
- [x] ルートテーブルをサブネットにアタッチ
- [x] IGW を作成
- [x] IGW をルートテーブルにアタッチ

## パブリックサブネットに SSH 接続可能な EC2 インスタンスを構築

- [x] EC2 インスタンス（praha-server-1）を作成
  - [x] パブリック IP の自動割り当てを有効化
  - [x] SSH 接続のみ許可するセキュリティグループを作成し、マイ IP のみを許可するインバウンドルールを適用

```bash
# SSH接続完了
❯ ssh -i "praha-server-1.cer" ec2-user@13.208.190.155
Last login: Sat Jul 16 00:27:44 2022 from 180-144-174-120f1.osk2.eonet.ne.jp

       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
5 package(s) needed for security, out of 14 available
Run "sudo yum update" to apply all updates.

[ec2-user@ip-10-0-1-28 ~]$
```

## プライベートサブネットにも EC2 インスタンスを構築（完了）

- [x] EC2 インスタンスを作成

## パブリックサブネットの EC2 インスタンスからのみ SSH 接続可能にする

- [x] SSH 接続のみ許可するセキュリティグループを作成し、praha-server-1 の IP のみを許可するインバウンドルールを適用
- [x] ローカルから praha-server-1 に秘密鍵を転送して SSH 接続

  ```bash
  # 秘密鍵を転送
  # scp -i [転送するファイル] [転送先のファイル名] [転送先]:[転送先ディレクトリ]
  ~/aws
  ❯ scp -i praha-server-1.cer praha-server-1.cer ec2-user@13.208.190.155:
  praha-server-1.cer                             100% 1678   312.7KB/s   00:00

  # ログイン
  ~/aws
  ❯ ssh -i praha-server-1.cer ec2-user@13.208.190.155
  Last login: Sat Jul 16 00:37:30 2022 from 180-144-174-120f1.osk2.eonet.ne.jp

         __|  __|_  )
         _|  (     /   Amazon Linux 2 AMI
        ___|\___|___|

  https://aws.amazon.com/amazon-linux-2/
  5 package(s) needed for security, out of 14 available
  Run "sudo yum update" to apply all updates.

  # 秘密鍵が転送されていることを確認
  [ec2-user@ip-10-0-1-28 ~]$ ls
  praha-server-1.cer
  [ec2-user@ip-10-0-1-28 ~]$
  ```

- [x] praha-server-1 から praha-server-2 に ssh 接続

  ```bash
  # 続き（2号機のインスタンスへの接続はプライベートIPを使用する）
  [ec2-user@ip-10-0-1-28 ~]$ ssh -i praha-server-1.cer ec2-user@10.0.2.157

         __|  __|_  )
         _|  (     /   Amazon Linux 2 AMI
        ___|\___|___|

  https://aws.amazon.com/amazon-linux-2/
  [ec2-user@ip-10-0-2-157 ~]$
  ```

## ローカルからプライベートサブネットにアクセスできないことを確認

```bash
# ちゃんとタイムアウトした
~/aws
❯ ssh -i praha-server-1.cer ec2-user@10.0.2.157
ssh: connect to host 10.0.2.157 port 22: Operation timed out
```
