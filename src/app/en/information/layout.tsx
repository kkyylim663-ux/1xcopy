import { Suspense } from "react";
import InfoSidebar from "@/components/sites/slots-ref/shell/InfoSidebar";
import styles from "./layout.module.css";

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Suspense fallback={null}><InfoSidebar /></Suspense>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
