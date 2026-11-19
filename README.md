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

## 構成

- `src/ui/` に既存のSolvifAI React UIをもとにしたコンポーネントとトークンを置きます。
- `src/catalog/` にカタログの説明、利用例、動作例を置きます。
- `src/ui/icons.tsx`、`src/ui/sidebar-icons.tsx`、`src/ui/{FolderIcon,PinIcon}.tsx` に本体のアイコンを、`public/` にブランド素材とフォルダの画像を置きます。
- `src/ui/FileTypeIcon.tsx` にファイル形式の対応と画像の配信元を置きます。Officeなどの画像は [Microsoft Fluent UI CDN](https://github.com/microsoft/fluentui-system-icons/tree/main/packages/react-icons-file-type) を、PDF画像は [Google Drive](https://developers.google.com/workspace/drive/api/reference/rest/v3/files#File.FIELDS.icon_link) の配信元を参照します。
- `src/catalog/guidelines.md` に人とAIで共有するUIルールを置きます。

AppButton、TextInputとFormField、SearchInput、SelectBox、Checkbox、Badge、Dialog、LoadingSpinner、SimpleEmptyState、SimpleBreadcrumb、RowActionMenu、TablePagination を収録しています。動作例は `src/ui/` の実装を直接使います。サンプルデータは架空です。[ファイル一覧サンプル](https://solvifai.github.io/solvifai-ui/#file-list) では、検索・行選択・三点メニュー・ページ送りをまとめて試せます。

基準はSolvifAIの `main` にある `frontend/src/components/{common,form,shadcn}` と `frontend/tailwind.config.js` です。抽出時に参照先をローカルに置き換え、フォーカス、入力エラー、読み上げ、ダイアログの開閉を補い、小さな文字のコントラストを調整しています。SelectBox は Excel の複数表設定で使う `MultiTableOutputSelect` のドロップダウンを共通化したものです。現時点でnpm配布や製品への取り込みは行っていません。

コンポーネントを追加する場合は、既存製品での利用箇所を確認し、用途、選び方、状態の例、コード例を揃えます。
