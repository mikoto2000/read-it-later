---
title: 開発者向け飼料
author: mikoto2000
date: 2025/7/14
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

## Firebase プロジェクト

### プロジェクト作成

1. 作成
    - プロジェクト名: `read-it-later`
    - Firebase プロジェクトの AI アシスタンス: 有効
    - Google アナリティクス （Firebase プロジェクト向け）: 有効
    - Google アナリティクスの構成: `mikoto2000`
2. Authentication 構築
    - 追加のプロバイダ: `Google`
    - プロジェクトの公開名: `read-it-later`
    - プロジェクトのサポートメール: `mikoto2000@gmail.com`
3. Firestore Database 構築
    - ロケーション: `asia-northeast1 (Tokyo)`
    - セキュリティルール: テストモードで開始

### アプリ追加

1. `プロジェクトの設定` -> `マイアプリ` -> `Web`(アイコン)

