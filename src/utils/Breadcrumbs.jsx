import { Link } from "react-router-dom";

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
      <ol className="flex items-center gap-2">
        {items.map((it, i) => {
          const isLast = i === items.length - 1;
          const { label, to, onClick } = it || {}; // ← desestructuro del item

          return (
            <li key={i} className="flex items-center gap-2">
              {to && !isLast ? (
                <Link
                  to={to}
                  onClick={onClick}                       // ← usar el del item
                  className="text-gray-600 hover:text-green-700 hover:underline"
                >
                  {label}
                </Link>
              ) : (
                <span className="text-gray-500" aria-current={isLast ? "page" : undefined}>
                  {label}
                </span>
              )}
              {!isLast && <span className="text-gray-400">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
