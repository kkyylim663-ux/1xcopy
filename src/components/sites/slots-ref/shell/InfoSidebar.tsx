"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./InfoSidebar.module.css";

const INFO_LINKS = [
  { href: "/en/information/about", label: "About Company" },
  { href: "/en/information/rules", label: "Rules & Conditions" },
  { href: "/en/information/rules/privacy_policy", label: "Privacy Policy" },
  { href: "/en/information/payment", label: "Payment Methods" },
  { href: "/en/information/contacts", label: "Contacts" },
  { href: "/en/information/cookies", label: "Cookie Policy" },
];

export default function InfoSidebar() {
  const pathname = usePathname();
  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>Information</div>
      <nav>
        {INFO_LINKS.map(link => (
          <Link key={link.href} href={link.href} className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
