商品（menus）テーブル
id・メニュー名・価格 id・持ち帰り OK フラグ

価格（prices）テーブル
id・価格

顧客（customers）テーブル
id・氏名・電話番号

注文（orders）テーブル
id・顧客 id・合計金額・受注日

注文内容（order_details）テーブル
注文 id・商品 id・数量・ワサビ抜きフラグ・大シャリフラグ

キャンペーン（campaigns）テーブル
id・キャンペーン名・開始日・終了日

キャンペーン内容（campaign_details）テーブル
キャンペーン id・商品 id・割引価格
