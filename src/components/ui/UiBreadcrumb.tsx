import { Link } from "react-router-dom";
import clsx from "clsx";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  activeClassName?: string;
}

export default function Breadcrumb({
  items,
  className,
  activeClassName,
}: BreadcrumbProps) {
  return (
    <nav
      className={clsx("text-sm font-bold text-secondary", className)}
    >
      <ol className="inline-flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isLink = item.path && !isLast;

          return (
            <li key={index} className="inline-flex items-center">
              {isLink ? (
                <Link
                  to={item.path as string}
                  className="hover:text-primary hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={clsx(
                    isLast && activeClassName
                  )}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <span className="mx-2">{">"}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}