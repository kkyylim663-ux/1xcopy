import Link from "next/link";
import styles from "./PromoStrip.module.css";

interface Props {
  title?: string;
  subtitle?: string;
  cta?: string;
  href?: string;
}

export default function PromoStrip({
  title = "SPECIAL OFFER",
  subtitle = "Register now and get exclusive bonuses",
  cta = "LEARN MORE",
  href = "/en/bonus/rules",
}: Props) {
  return (
    <section className={styles.strip}>
      <div className={styles.inner}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>{subtitle}</span>
        <Link href={href} className={styles.cta}>{cta}</Link>
      </div>
    </section>
  );
}
