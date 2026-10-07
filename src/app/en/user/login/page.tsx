"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [tab, setTab] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(tab === "email" ? email : phone, password);
      router.push("/en/office/account");
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.formBox}>
          <h1 className={styles.title}>LOG IN</h1>

          <div className={styles.tabs}>
            <button type="button" className={`${styles.tab} ${tab === "email" ? styles.tabActive : ""}`} onClick={() => setTab("email")}>E-mail or ID</button>
            <button type="button" className={`${styles.tab} ${tab === "phone" ? styles.tabActive : ""}`} onClick={() => setTab("phone")}>Phone number</button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {tab === "email" ? (
              <input type="text" className={styles.input} placeholder="E-mail or ID" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} />
            ) : (
              <div className={styles.phoneRow}>
                <button type="button" className={styles.dialCode}>+60</button>
                <input type="tel" className={`${styles.input} ${styles.inputPhone}`} placeholder="12 345 67891" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            )}

            <div className={styles.pwdWrap}>
              <input type={showPwd ? "text" : "password"} className={styles.input} placeholder="Password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" className={styles.showPwd} onClick={() => setShowPwd(v => !v)} aria-label="Toggle password">{showPwd ? "🙈" : "👁"}</button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.actionRow}>
              <button type="button" className={styles.forgotLink}>Forgot your password?</button>
              <button type="submit" className={styles.submitBtn} disabled={loading}>{loading ? "…" : "LOG IN"}</button>
            </div>
          </form>

          <div className={styles.divider}><span>or sign in with</span></div>

          <div className={styles.socialRow}>
            <button type="button" className={`${styles.socialBtn} ${styles.socialGoogle}`}>G</button>
            <button type="button" className={`${styles.socialBtn} ${styles.socialTelegram}`}>✈</button>
            <button type="button" className={`${styles.socialBtn} ${styles.socialFacebook}`}>f</button>
          </div>

          <div className={styles.regPrompt}>
            Don&apos;t have an account?{" "}
            <Link href="/en/registration" className={styles.regLink}>Register now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
