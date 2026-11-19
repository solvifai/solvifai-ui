interface SimpleBreadcrumbProps {
  items: { label: string; href?: string }[];
  className?: string;
}

export function SimpleBreadcrumb({ items, className = "" }: SimpleBreadcrumbProps) {
  return (
    <nav aria-label="パンくずリスト" className={`text-xs ${className}`}>
      <ol className="flex items-center gap-1.5 text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden="true">&gt;</span>}
            {item.href ? (
              <a href={item.href} className="text-blue-900 hover:underline">
                {item.label}
              </a>
            ) : (
              <span
                aria-current={index === items.length - 1 ? "page" : undefined}
                className="text-gray-900"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
