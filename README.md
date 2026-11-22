# SolvifAI UI

SolvifAI v2のUIを企画・実装するときに使うカタログです。
[カタログ](https://solvifai.github.io/solvifai-ui/)では動作例、使い方、Reactのコード例を確認できます。
モックを作る人やAIに [UIガイド](src/catalog/guidelines.md) を渡せます。

## ローカルで動かす

Node.js 22.12以上とnpmを使用します。

```sh
npm ci
npm run dev
```

`npm run typecheck` と `npm run build` で検証します。mainへのpushでGitHub ActionsがGitHub Pagesへ公開します。

## 掲載基準

掲載するUIは [SolvifAI本体の main（抽出時点）](https://github.com/solvifai/solvifai/tree/883844cef366e2adb4faed3a573fae40a0aa1882/frontend/src) の実装と利用箇所を基準にします。カタログ各項目に実装元へのリンクがあります。本体リポジトリの閲覧には権限が必要です。

- `src/ui/` は本体の共通部品や、画面内から取り出したUIの実装です。依存するルーター、API、アセットURLはカタログで動くように調整しています。
- `src/catalog/` は利用例と操作デモです。公開デモは架空の文言・データを使い、通信は模擬します。
- ファイルアイコンは本体と同じ素材を同梱しています。出典は [ファイルアイコンのREADME](public/assets/file-types/README.md) を参照してください。

## Patterns

- [複数選択と一括削除](https://solvifai.github.io/solvifai-ui/#file-list)、[検索結果が0件](https://solvifai.github.io/solvifai-ui/#pattern-search-empty)、[読み込み失敗と再読み込み](https://solvifai.github.io/solvifai-ui/#pattern-loading-retry)、[複数ファイル追加](https://solvifai.github.io/solvifai-ui/#pattern-file-upload) は本体の資料一覧の操作を切り出したものです。
- [自動保存](https://solvifai.github.io/solvifai-ui/#pattern-autosave) は編集後に保存を待ち、保存処理を直列化する流れを、ブラウザ内に保存するメモで示します。
- [日時フィルター](https://solvifai.github.io/solvifai-ui/#pattern-date-filter) は開始・終了を入力し、逆転時にもう一方を1分ずらす操作を示します。
- [通知ドロップダウン](https://solvifai.github.io/solvifai-ui/#pattern-app-header) と [折りたためるサイドナビ](https://solvifai.github.io/solvifai-ui/#pattern-side-nav) は本体のナビゲーションから該当操作を切り出したものです。
