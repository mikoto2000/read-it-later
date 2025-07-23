---
title: 開発者向け資料
author: mikoto2000
date: 2025/7/23
---

# プロジェクト作成メモ

## Vite プロジェクト

```sh
node ➜ /workspaces/RAT (main) $ npm create vite@latest
Need to install the following packages:
create-vite@7.0.3
Ok to proceed? (y) y


> npx
> create-vite

│
◇  Project name:
│  read-it-later
│
◇  Select a framework:
│  Vanilla
│
◇  Select a variant:
│  TypeScript
│
◇  Scaffolding project in /workspaces/RAT/read-it-later...
│
└  Done. Now run:

  cd read-it-later
  npm install
  npm run dev
```

## Supabase プロジェクト

### プロジェクト作成

- Project name: `read-it-later`
- Database Password: generate したやつ
- Region: `Northeast Asia (Tokyo)

### テーブル作成

1. 左メニューの `SQL Editor` を開く
2. `uuid-ossp` 拡張モジュールの有効化
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```
3. `bookmark` テーブル作成
   ```sql
   create table bookmark (
     id UUID primary key default uuid_generate_v4(),
     user_id UUID not null default auth.uid(),
     title text not null,
     url text not null
   );
   ```

### RLS Policy 作成

1. 左メニューの `Table Editor` を開く
2. `bookmark` -> `RLS disabled` 押下 -> `Enable RLS for this table` 押下 -> `Enable RLS` 押下
3. `Add RLS policy` 押下 -> `Create policy` 押下
4. この手順で後述の `INSERT`, `SELECT`, `UPDATE`, `DELETE` を設定していく

#### INSERT

Templates から `INSERT Enable insert for authenticated users only` を選択 -> `Save policy`

#### SELECT

Templates から `SELECT Enable users to view their own data only` を選択 -> `Save policy`

#### UPDATE

Templates の `UPDATE Policy with table joins` をベースに、自分自身のレコードしか UPDATE できないように修正

- Policy Name: `Enable users to UPDATE  their own data only`
- Target Roles: authenticated
- Use options above to edit:
  ```sql
  alter policy "Enable users to UPDATE their own data only"
  on "public"."bookmark"
  to authenticated
  using (
    (user_id = auth.uid())
  );
  alter policy Enable update for users based on email
  on "public"."bookmark"
  rename to "Enable users to UPDATE their own data only";
  ```

#### DELETE

Template から `DELETE Enable delete for users based on user_id` 選択 -> `Save policy`

- Target Roles: authenticated

### GitHub でサインインを有効化

1. 左メニューの `Authentication` を開く
2. `Sign In / Providers` -> `Auth Providers` -> `GitHub` を選択
3. `Callback URL (for OAuth)` をメモ

この画面は開いたままで `GitHub OAuth アプリ設定` を実施


## GitHub OAuth アプリ設定

1. GitHub のプロファイルページ -> 自分のアイコン -> Settings を選択
2. 左メニューの `Developer settings` を選択
3. `OAuth Apps` -> `New OAuth App` ボタン押下
4.`Register a new OAuth app` 画面が表示されるので必要事項を記入し、 `Register application` を押下。
    - Application name: `read-it-later`
    - Homepage URL: `https://github.com/mikoto2000/read-it-later`
    - Application description: `後で読むサービス`
    - Authorization callback URL: セクション「GitHub でサインインを有効化」でメモした `Callback URL (for OAuth)` を入力
5. `read-it-later` の General 画面になるので、以下操作を実施
    - `Clien Id` をセクション「GitHub でサインインを有効化」画面の `Client ID` へコピー
    - `Generate a new client secret` ボタンを押下し、生成されたキーをセクション「GitHub でサインインを有効化」画面の `Client Secret` へコピー
    - セクション「GitHub でサインインを有効化」画面の `Save` ボタン押下

