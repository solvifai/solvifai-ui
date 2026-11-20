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

AppButton、TextInputとFormField、SearchInput、SelectBox、Checkbox、Badge、Dialog、LoadingSpinner、SimpleEmptyState、SimpleBreadcrumb、RowActionMenu、TablePagination、Table、FileChipList、AvatarGroup、SaveStatusIndicator、OptionGroup、Tabs、AppToaster、Tooltip、Radio、Toggle、Accordion、FileUpload、ProgressBar、SteppedForm、TextArea、DatePicker、DateTimePicker、ResizeDivider、AlertBanner、Skeleton、Drawer を収録しています。動作例は `src/ui/` の実装を直接使います。

Patterns では、架空のファイル一覧やメモで共通UIを組み合わせた操作を試せます。

- [複数選択と一括削除](https://solvifai.github.io/solvifai-ui/#file-list) — ファイルを選び、ダイアログで件数と対象を確認してから削除します。
- [検索結果が0件](https://solvifai.github.io/solvifai-ui/#pattern-search-empty) — 一致しない検索語から始まり、「検索をクリア」で一覧に戻れます。
- [読み込み失敗と再試行](https://solvifai.github.io/solvifai-ui/#pattern-loading-retry) — 最初の読み込みは失敗し、「再試行」でサンプルの一覧が表示されます。
- [自動保存](https://solvifai.github.io/solvifai-ui/#pattern-autosave) — メモはこのブラウザに自動保存されます。失敗を再現して、入力を保持したまま保存を再試行できます。

基準はSolvifAIの `main` にある `frontend/src/components/{common,form,shadcn}` と `frontend/tailwind.config.js` です。抽出時に参照先をローカルに置き換え、フォーカス、入力エラー、読み上げ、ダイアログの開閉を補い、小さな文字のコントラストを調整しています。SelectBox は Excel の複数表設定で使う `MultiTableOutputSelect` のドロップダウンを共通化したものです。現時点でnpm配布や製品への取り込みは行っていません。

コンポーネントを追加する場合は、既存製品での利用箇所を確認し、用途、選び方、状態の例、コード例を揃えます。

Tabs は資料選択モーダル、AppToaster は本体の Sonner 設定、Tooltip は成果物ヘッダーの補足表示がベースです。

Radio は本体のフォルダ分類、Toggle は手引きパネルの高精度設定、Accordion は編集ガイドの開閉がベースです。

FileUpload はフォーマット作成時のPPTXアップロード、ProgressBar はスライド生成時の進捗表示、SteppedForm は成果物作成フォームがベースです。

TextArea と DatePicker はプロジェクト編集の概要・期間入力、DateTimePicker はログ管理の分単位の日時入力、ResizeDivider はフォーマット編集画面のパネル幅調整がベースです。DatePicker と DateTimePicker は共通のカレンダーを使い、DateTimePicker は時刻を指定してから確定します。

AlertBanner はプロジェクト編集の再取得エラー、Skeleton は一括編集の修正案作成中表示、Drawer は成果物編集のバージョン履歴を開く右サイドパネルがベースです。
