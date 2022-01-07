- シャリの大小を選べる
  注文内容（order_details）テーブルに is_large フラグを追加（0 でシャリサイズ変更なし、1 でシャリサイズ大）

- セット商品とは別に、寿司ネタの売上数をカウントする
  order_details で商品ごとに数量（quantity）をカウントする
  セット商品のうち、寿司の盛り合わせのものもカウントに入れる必要がある場合、menus テーブルに is_combination_plate（盛り合わせフラグ）を追加し、combination_menus（盛り合わせ内容）テーブルを追加する
