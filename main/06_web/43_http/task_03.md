# 課題３ 以下のユースケースでどの HTTP メソッドを使うか考える

- Twitter のフォロー関係の破棄は PUT?PATCH?DELETE?
  - PATHC?
- 取引の取り消しは PUT?PATCH?DELETE?
  - 履歴を残す（ライフサイクルがあるもの）だろうから PUT?
- お気に入りリストからの削除は PUT?PATCH?DELETE?
  - DELETE
