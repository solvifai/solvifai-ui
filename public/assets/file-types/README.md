# File type icons

These PNG files were downloaded unchanged from Microsoft's official Fluent UI
CDN and Google's official Drive icon service on 2026-09-09. They are served locally,
with no runtime CDN request.

The catalog serves these PNGs under its GitHub Pages base path.

Office application icons (the current colorful app artwork, 48 × 48):

- `pptx.png`: [PowerPoint PNG](https://res.cdn.office.net/files/fabric-cdn-prod_20260623.001/assets/brand-icons/product/png/powerpoint_48x1.png)
- `docx.png`: [Word PNG](https://res.cdn.office.net/files/fabric-cdn-prod_20260623.001/assets/brand-icons/product/png/word_48x1.png)
- `xlsx.png`: [Excel PNG](https://res.cdn.office.net/files/fabric-cdn-prod_20260623.001/assets/brand-icons/product/png/excel_48x1.png)

PDF uses Google Drive's red file icon with a white "PDF" label (64 × 64):

- `pdf.png`: [Google Drive PDF PNG](https://drive-thirdparty.googleusercontent.com/64/type/application/pdf)
- [Drive file icon documentation](https://developers.google.com/workspace/drive/api/reference/rest/v3/files#File.FIELDS.icon_link)

Source URL for the remaining file type icons (48 × 48):
`https://res.cdn.office.net/files/fabric-cdn-prod_20260623.001/assets/item-types/48/<filename>.png`

Files: `txt`, `csv`, `photo`, `audio`, `video`, `genericfile`.

Official references:

- [Fluent UI file type icons](https://github.com/microsoft/fluentui/tree/master/packages/react-file-type-icons)
- [CDN base URL](https://github.com/microsoft/fluentui/blob/master/packages/style-utilities/src/cdn.ts)
- [Asset paths and supported sizes](https://github.com/microsoft/fluentui/blob/master/packages/react-file-type-icons/src/initializeFileTypeIcons.tsx)

Icons and trademarks belong to their respective owners.
