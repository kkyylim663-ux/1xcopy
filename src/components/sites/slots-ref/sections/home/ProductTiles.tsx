import Link from "next/link";
import type { HomeProduct } from "@/data/home";
import styles from "./ProductTiles.module.css";

interface Props {
  products: HomeProduct[];
}

export default function ProductTiles({ products }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.track}>
        {products.map((p) => (
          <Link key={p.id} href={p.href} className={styles.tile}>
            <span className={styles.icon} aria-hidden="true">{p.icon}</span>
            <span className={styles.label}>{p.label}</span>
            {p.badge && <span className={styles.badge}>{p.badge}</span>}
          </Link>
        ))}
      </div>
    </section>
  );
}
