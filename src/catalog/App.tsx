import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Command,
  Copy,
  Github,
  LayoutGrid,
  Menu,
  Palette,
  Shapes,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { SearchInput } from "../ui/SearchInput";
import { SimpleEmptyState } from "../ui/EmptyState";
import { categories, components, type Category, type ComponentEntry } from "./components";
import guide from "./guidelines.md?raw";
import guideUrl from "./guidelines.md?url&no-inline";
import { brandSymbolUrl, Icons } from "./Icons";
import { PatternPage, patterns } from "./Patterns";
import { CardPreview, previews } from "./previews";
import { sourceUrl } from "./sources";

const repository = "https://github.com/solvifai/solvifai-ui";
const categoryLinks = {
  すべて: "#category-all",
  操作: "#category-actions",
  入力: "#category-inputs",
  状態表示: "#category-feedback",
  データ表示: "#category-data",
  ナビゲーション: "#category-navigation",
} satisfies Record<Category, string>;

const links = [
  { href: "#components", label: "コンポーネント", icon: LayoutGrid },
  { href: "#tokens", label: "デザイントークン", icon: Palette },
  { href: "#icons", label: "SolvifAIアイコン", icon: Shapes },
  { href: "#guidelines", label: "UIガイド", icon: BookOpen },
];

function Sidebar({ hash, isOpen, close }: { hash: string; isOpen: boolean; close: () => void }) {
  const isCatalog =
    hash === "#catalog-list" || categories.some((category) => categoryLinks[category] === hash);
  return (
    <aside id="catalog-sidebar" className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <nav aria-label="カタログのメニュー">
        <div className="sidebar-label">概要</div>
        {links.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            aria-current={
              hash === href || (href === "#components" && isCatalog) ? "page" : undefined
            }
            onClick={close}
          >
            <Icon size={17} aria-hidden="true" />
            {label}
          </a>
        ))}
        <details className="sidebar-group" open>
          <summary className="sidebar-label">
            Patterns
            <ChevronDown size={14} aria-hidden="true" />
          </summary>
          <div className="sidebar-group-links">
            {patterns.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                aria-current={hash === href ? "page" : undefined}
                onClick={close}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </details>
        <details className="sidebar-group" open>
          <summary className="sidebar-label">
            Components
            <ChevronDown size={14} aria-hidden="true" />
          </summary>
          <div className="sidebar-group-links">
            {components.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={"#" + id}
                aria-current={hash === "#" + id ? "page" : undefined}
                onClick={close}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </details>
      </nav>
    </aside>
  );
}

function Catalog({ category }: { category: Category }) {
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const visible = components.filter(
    (entry) =>
      (category === "すべて" || entry.category === category) &&
      `${entry.name} ${entry.label} ${entry.description} ${entry.category}`
        .toLowerCase()
        .includes(search),
  );

  return (
    <section id="catalog-list" className="directory" aria-labelledby="directory-title">
      <div className="section-heading">
        <div>
          <h1 id="directory-title">コンポーネント</h1>
          <p>実際に操作して、使い分けとコード例を確認できます。</p>
        </div>
        <SearchInput
          className="catalog-search"
          value={query}
          onChange={setQuery}
          ariaLabel="コンポーネントを検索"
          placeholder="コンポーネントを検索"
        />
      </div>
      <nav className="filters" aria-label="コンポーネントの分類">
        {categories.map((item) => (
          <a
            key={item}
            href={categoryLinks[item]}
            aria-current={item === category ? "true" : undefined}
          >
            {item}
          </a>
        ))}
        <span role="status" className="result-count">
          {visible.length}件
        </span>
      </nav>
      {visible.length ? (
        <div className="component-grid">
          {visible.map((entry) => (
            <article className="component-card" key={entry.id}>
              <div className="card-preview" aria-hidden="true" inert>
                <CardPreview id={entry.id} />
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span className="card-icon">
                    <entry.icon size={16} />
                  </span>
                  {entry.category}
                </div>
                <h3>
                  <a href={"#" + entry.id}>
                    {entry.label}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </h3>
                <span className="component-name">{entry.name}</span>
                <p>{entry.description}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <SimpleEmptyState
          message="一致するコンポーネントがありません"
          subMessage="別のキーワードや分類を試してください。"
        />
      )}
    </section>
  );
}

function CopyCode({ text, label }: { text: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const icon = status === "copied" ? <Check size={15} /> : <Copy size={15} />;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };
  return (
    <div className="copy-control">
      <button className="copy-button" type="button" onClick={copy}>
        {icon}
        {label}
      </button>
      <span role="status">
        {status === "copied"
          ? "コピーしました"
          : status === "error"
            ? "コピーできませんでした"
            : ""}
      </span>
    </div>
  );
}

function Detail({ entry }: { entry: ComponentEntry }) {
  const Preview = previews[entry.id];
  return (
    <div className="document-page">
      <header className="document-heading">
        <h1>{entry.label}</h1>
        <code>{entry.name}</code>
        <p>{entry.description}</p>
      </header>
      <div className="preview-box">
        <div className="preview-bar">プレビュー</div>
        <div className="preview-stage">
          <Preview />
        </div>
        <div className="variant-list">
          {entry.variants.map((variant) => (
            <span key={variant}>{variant}</span>
          ))}
        </div>
      </div>
      <section className="document-section">
        <h2>使い方</h2>
        <ul>
          {entry.guidance.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>
      <section className="document-section">
        <h2>Reactコード例</h2>
        <div className="code-block">
          <div className="code-toolbar">
            <span>TSX</span>
            <CopyCode text={entry.code} label="コードをコピー" />
          </div>
          <pre tabIndex={0}>
            <code>{entry.code}</code>
          </pre>
        </div>
        <a className="source-link" href={repository + "/blob/main/src/ui/" + entry.file}>
          切り出した実装をGitHubで見る
          <ArrowUpRight size={15} />
        </a>
        <div>
          <a className="source-link" href={sourceUrl(entry.source)}>SolvifAI本体の実装元（権限が必要）</a>
        </div>
      </section>
      <a className="back-link" href="#components">
        <ArrowLeft size={16} />
        コンポーネント一覧へ
      </a>
    </div>
  );
}

const colorTokens = [
  { label: "ブランド", name: "brand-primary", value: "#327EE1" },
  { label: "アクセント", name: "brand-secondary", value: "#33AFDB" },
  { label: "本文", name: "text-primary", value: "#252525" },
  { label: "補足テキスト", name: "text-secondary", value: "#7C7C7C" },
  { label: "ページ背景", name: "background-bg", value: "#FBFBFB" },
  { label: "入力欄の境界線", name: "border-control", value: "#E9E9E9" },
] as const;

function Tokens() {
  return (
    <div className="document-page">
      <header className="document-heading">
        <h1>デザイントークン</h1>
        <p>SolvifAIの画面で使う、色と文字の基本値です。</p>
      </header>
      <section className="document-section">
        <h2>色</h2>
        <div className="token-grid">
          {colorTokens.map(({ label, name, value }) => (
            <div className="token" key={name}>
              <div
                className="token-swatch"
                style={{ backgroundColor: "var(--color-" + name + ")" }}
              />
              <div>
                <strong>{label}</strong>
                <code>{name}</code>
                <code>{value}</code>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="document-section">
        <h2>タイポグラフィ</h2>
        <div className="type-preview">
          <span>Aa あ</span>
          <div>
            <strong>Figtree / システムフォント</strong>
            <p>日本語は端末のフォントで表示します。</p>
          </div>
        </div>
      </section>
      <a className="source-link" href={repository + "/blob/main/src/ui/tokens.css"}>
        トークン定義をGitHubで見る
        <ArrowUpRight size={15} />
      </a>
    </div>
  );
}

const [guideRules, prompt] = guide.trim().split("## AIに渡すテンプレート");
const rules = [...guideRules.matchAll(/^\d+\. (.+)$/gm)].map((match) => match[1]);
const promptText = prompt.trim();

function Guidelines() {
  return (
    <div className="document-page">
      <header className="document-heading">
        <h1>UIガイド</h1>
        <p>SolvifAI v2の画面を作るときに、人とAIで共有するルールです。</p>
      </header>
      <section className="document-section">
        <h2>UIを作るときのルール</h2>
        <ol>
          {rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>
      <section className="document-section">
        <h2>AIに渡すテンプレート</h2>
        <div className="code-block">
          <div className="code-toolbar">
            <span>
              <Command size={15} />
              プロンプト
            </span>
            <CopyCode text={promptText} label="プロンプトをコピー" />
          </div>
          <pre className="prompt" tabIndex={0}>
            {promptText}
          </pre>
        </div>
        <a className="source-link" href={guideUrl} download="solvifai-ui-guide.md">
          Markdownをダウンロード
          <ArrowDownRight size={16} />
        </a>
      </section>
    </div>
  );
}

export function App() {
  const [hash, setHash] = useState(() => window.location.hash || "#components");
  const [mobileOpen, setMobileOpen] = useState(false);
  const entry = components.find(({ id }) => "#" + id === hash);
  const pattern = patterns.find(({ href }) => href === hash);
  const category = categories.find((item) => categoryLinks[item] === hash) ?? "すべて";
  const title =
    entry?.label ??
    pattern?.label ??
    links.find((link) => link.href === hash && hash !== "#components")?.label ??
    "";

  useEffect(() => {
    const onHash = () => {
      setMobileOpen(false);
      setHash(window.location.hash || "#components");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (title) document.getElementById("content")?.focus({ preventScroll: true });
    document.title = title ? `${title} | SolvifAI UI` : "SolvifAI UI";
    window.scrollTo(0, 0);
  }, [hash, title]);

  let content = <Catalog category={category} />;
  if (entry) content = <Detail key={entry.id} entry={entry} />;
  if (pattern) content = <PatternPage key={pattern.href} pattern={pattern} />;
  if (hash === "#tokens") content = <Tokens />;
  if (hash === "#guidelines") content = <Guidelines />;
  if (hash === "#icons") content = <Icons sourceBase={repository + "/blob/main/src/ui"} />;

  return (
    <>
      <a
        className="skip-link"
        href="#content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("content")?.focus();
        }}
      >
        本文へ移動
      </a>
      <header className="site-header">
        <div className="header-start">
          <button
            className="mobile-menu"
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-controls="catalog-sidebar"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <a className="wordmark" href="#components" onClick={() => setMobileOpen(false)}>
            <img className="brand-mark" src={brandSymbolUrl} alt="" />
            SolvifAI <span>UI</span>
          </a>
        </div>
        <a className="github-link" href={repository}>
          <Github size={18} aria-hidden="true" />
          GitHub
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </header>
      <Sidebar hash={hash} isOpen={mobileOpen} close={() => setMobileOpen(false)} />
      <main id="content" className="main" tabIndex={-1}>
        <div className="main-inner">
          {content}
          <footer className="site-footer">
            <span>SolvifAI UI</span>
            <a href={repository}>
              GitHubリポジトリ
              <ArrowRight size={15} />
            </a>
          </footer>
        </div>
      </main>
    </>
  );
}
