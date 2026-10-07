"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SportsSidebar.module.css";

interface SportItem {
  href: string;
  label: string;
  icon?: string;
  count?: number;
}

interface SportsSidebarProps {
  title?: string;
  items: SportItem[];
}

export default function SportsSidebar({ title = "Sports", items }: SportsSidebarProps) {
  const pathname = usePathname();
  return (
    <aside className={styles.sidebar}>
      {title && <div className={styles.title}>{title}</div>}
      <nav>
        {items.map(item => (
          <Link key={item.href} href={item.href} className={`${styles.item} ${pathname?.startsWith(item.href) ? styles.active : ""}`}>
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span className={styles.label}>{item.label}</span>
            {item.count !== undefined && <span className={styles.count}>{item.count}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
