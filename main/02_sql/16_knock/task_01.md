# SQL10 本ノック

### 1. 常連顧客の特定

>1996 年に 3 回以上注文した（Orders が 3 つ以上紐づいている）Customer の ID と、注文回数を取得する。最もよく注文してくれた Customer は？

```sql
SELECT
  CustomerID
  , COUNT(OrderID) AS OrderCount
FROM
  [Orders]
WHERE
  OrderDate BETWEEN '1996-01-01' AND '1996-12-31'
  GROUP BY CustomerID
  HAVING OrderCount >= 3
  ORDER BY OrderCount DESC;
```

**回答**
- CustomerID 65, 63, 20 が 6 回で 1 位タイ

**ポイント**
- GROUP BY、HAVING、ORDER BY の実行順序

<br>

### 2. 注文時の最大注文詳細数

> 過去最も多くの OrderDetail が紐づいた Order を取得する。何件の OrderDetail が紐づいていた？

```sql
SELECT
  Temp.OrderID
  , MAX(Temp.OrderDetailCount)
FROM
  (SELECT
    O.OrderID,
    COUNT(D.OrderDetailID) AS OrderDetailCount
  FROM
    [Orders] AS O
    LEFT JOIN OrderDetails AS D
      ON O.OrderID = D.OrderID
  GROUP BY O.OrderID) AS Temp;
```

**回答**
- 5 件

**ポイント**
- GROUP BY + COUNT したテーブルをサブクエリとして、MAX関数 を使う

**参照**
- [サブクエリを使う](https://qiita.com/Kuzira_Kuzira/items/3106748174ef7fb6d907)

  <br>

### 3. お世話になっている運送会社の特定

>過去最も多くの Order が紐づいた Shipper を特定する。

```sql
SELECT ShipperID, COUNT(ShipperID) AS ShippingCount
FROM [Orders]
GROUP BY ShipperID ORDER BY ShippingCount DESC;
```
**回答**
- ShipperID 2 が 1 位（74 回）

<br>

### 4. 重要市場の把握

>売上が高い順番に Country を並べる：「売上」＝「OrderDetails の Quantity」*「Products の Price」

```sql
SELECT
  ROUND(SUM(D.Quantity * P.Price)) AS Sales
  , C.Country
FROM
  [Orders] AS O
    LEFT JOIN Customers AS C
      ON O.CustomerID = C.CustomerID
    LEFT JOIN OrderDetails AS D
      ON O.OrderID = D.OrderID
    LEFT JOIN Products AS P
      ON D.ProductID = P.ProductID
GROUP BY C.Country
ORDER BY Sales DESC;
```

<br>

### 5. 国ごとの売上を年毎で集計

>Web SQL で「年だけ」を取得するためには strftime を使う。

```sql
SELECT
    ROUND(SUM(D.Quantity * P.Price)) AS Sales
    , strftime('%Y', O.OrderDate) AS OrderYear
    , C.Country
FROM
  [Orders] AS O
    LEFT JOIN Customers AS C
      ON O.CustomerID = C.CustomerID
    LEFT JOIN OrderDetails AS D
      ON O.OrderID = D.OrderID
    LEFT JOIN Products AS P
      ON D.ProductID = P.ProductID
GROUP BY OrderYear, C.Country
ORDER BY C.Country ASC;
```

**GROUP BY について**
- 複数条件指定は、カンマ区切り
- 左側のカラムから集計される
- グルーピング対象外のカラムは、SUM などで集約しなければ、一番上のレコード値が表示される

<br>

### 6. 社員区分に「若手」を追加

>Employee テーブルに「Junior」カラム（boolean）を追加して、若手に分類される Employee レコードの場合は true にする（Junior の定義：誕生日が 1960 年以降）

```sql
-- カラム追加
ALTER TABLE Employees ADD Junior Boolean DEFAULT false;

-- 更新
UPDATE Employees SET Junior = 1 WHERE BirthDate > '1960-01-01';
```

**構文**

- カラム追加

  `ALTER TABLE [Table] ADD [Column] [Type] DEFAULT [Value];`

- 更新<

  `UPDATE [Table] SET [Column] = [Value] [, [Column] = [Value]] [WHERE...];`

<br>

### 7. 利用回数の多い運送会社の特定

>「long_relation」カラム（boolean）を Shipper テーブルに追加し、過去70回以上 Order に関わった Shipper の long_relation を true にする。

```sql
-- カラム追加
ALTER TABLE Shippers ADD LongRelation Boolean DEFAULT false;

-- 過去70回以上Orderに関わったShipperを特定
SELECT
  ShipperID
  , COUNT(ShipperID) AS ShippingCount
FROM
  Orders
GROUP BY ShipperID
HAVING ShippingCount >= 70;

-- 更新
UPDATE Shipper SET LongRelation = true;
```

<br>

### 8. 各社員が最後に担当した注文の特定

>それぞれの Employee が最後に担当した Order と、その日付を取得する

```sql
SELECT EmployeeID , MAX(OrderDate)
FROM [Orders]
GROUP BY EmployeeID ORDER BY EmployeeID ASC;
```

<br>

### 9. NULLの扱い

- Customer テーブルで任意の１レコードの CustomerName を NULL にする
  ```sql:8-1
  UPDATE Customers SET CustomerName = null WHERE CustomerID = 1;
  ```
- CustomerName が存在するユーザを取得するクエリを作成する
  ```sql:8-2
  SELECT * FROM Customers WHERE CustomerName IS NOT NULL;
  ```
- CustomerName が存在しないユーザを取得するクエリを作成する
  ```sql:8-3
  SELECT * FROM Customers WHERE CustomerName IS NULL;
  ```

<br>

### 10. JOINの違い

- `EmployeeId = 1` の従業員のレコードを、Employee テーブルから削除する。

  ```sql:10-1
  DELETE FROM Employees WHERE EmployeeID = 1;
  ```

- Orders と Employees を JOIN して、注文と担当者を取得する。

  ```sql
  -- 削除されたEmloyeeId=1 が担当した Orders を表示しない版
  SELECT
    O.OrderID
    , O.CustomerID
    , O.EmployeeID
    , O.OrderDate
    , O.ShipperID
  FROM
    Orders AS O
      INNER JOIN Employees AS E
        ON O.EmployeeID = E.EmployeeID;

  -- 削除されたEmloyeeId=1 が担当した Orders を表示する版
  SELECT
    O.OrderID
    , O.CustomerID
    , E.EmployeeID
    , O.OrderDate
    , O.ShipperID
  FROM
    Orders AS O
      LEFT JOIN Employees AS E
        ON O.EmployeeID = E.EmployeeID
  WHERE
    E.EmployeeID IS NULL;
  ```
