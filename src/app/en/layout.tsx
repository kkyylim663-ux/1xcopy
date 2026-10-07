"use client";
import Header from "@/components/sites/slots-ref/shell/Header";
import Footer from "@/components/sites/slots-ref/shell/Footer";
import FloatingButtons from "@/components/sites/slots-ref/shell/FloatingButtons";
import { AuthProvider } from "@/lib/auth";
import styles from "./layout.module.css";

export default function LangLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className={styles.root}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
        <FloatingButtons />
      </div>
    </AuthProvider>
  );
}
