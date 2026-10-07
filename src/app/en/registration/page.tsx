"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import styles from "./page.module.css";

const BONUS_OPTIONS = [
  { value: "sports", label: "100% First Sports Deposit Bonus", sub: "up to 588 MYR" },
  { value: "casino", label: "Welcome Casino Package", sub: "up to 9888 MYR + 350 Free Spins" },
  { value: "both", label: "All-In-One Bonus", sub: "Sports + Casino combined" },
  { value: "none", label: "No bonus", sub: "Register without bonus" },
];

const REG_TABS = [
  { value: "email", label: "E-mail" },
  { value: "phone", label: "Phone" },
  { value: "1click", label: "1 Click" },
  { value: "social", label: "Social" },
];

export default function RegistrationPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [bonus, setBonus] = useState("casino");
  const [tab, setTab] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [promo, setPromo] = useState("");
  const [currency, setCurrency] = useState("MYR");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!password) { setError("Please enter a password"); return; }
    setLoading(true);
    try {
      await register({ email, phone, password, currency, bonusType: bonus, promoCode: promo });
      router.push("/en/office/account");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.formBox}>
          <h1 className={styles.title}>REGISTRATION</h1>

          {/* 奖金选择 */}
          <div className={styles.bonusRow}>
            {BONUS_OPTIONS.map(opt => (
              <label key={opt.value} className={`${styles.bonusOpt} ${bonus === opt.value ? styles.bonusOptActive : ""}`}>
                <input type="radio" name="bonus" value={opt.value} checked={bonus === opt.value} onChange={() => setBonus(opt.value)} className={styles.hiddenRadio} />
                <strong>{opt.label}</strong>
                <span>{opt.sub}</span>
              </label>
            ))}
          </div>

          {/* 注册方式 tabs */}
          <div className={styles.tabs}>
            {REG_TABS.map(t => (
              <button key={t.value} type="button" className={`${styles.tab} ${tab === t.value ? styles.tabActive : ""}`} onClick={() => setTab(t.value)}>
                {t.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {tab === "email" && (
              <>
                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label className={styles.label}>Country</label>
                    <input type="text" className={styles.input} placeholder="Malaysia" defaultValue="Malaysia" readOnly />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Currency</label>
                    <select className={styles.input} value={currency} onChange={e => setCurrency(e.target.value)}>
                      <option value="MYR">MYR — Malaysian Ringgit</option>
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                      <option value="SGD">SGD — Singapore Dollar</option>
                    </select>
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email</label>
                  <input type="email" className={styles.input} placeholder="Email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Password</label>
                  <div className={styles.pwdRow}>
                    <input type={showPwd ? "text" : "password"} className={styles.input} placeholder="Password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="button" className={styles.showPwd} onClick={() => setShowPwd(v => !v)} aria-label="Toggle password">{showPwd ? "🙈" : "👁"}</button>
                    <button type="button" className={styles.generatePwd} onClick={() => { const p = Math.random().toString(36).slice(-10) + "A1!"; setPassword(p); setShowPwd(true); }}>Generate</button>
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Promo code (optional)</label>
                  <input type="text" className={styles.input} placeholder="Promo code (if you have one)" autoComplete="off" value={promo} onChange={e => setPromo(e.target.value)} />
                </div>
              </>
            )}

            {tab === "phone" && (
              <>
                <div className={styles.field}>
                  <label className={styles.label}>Phone number</label>
                  <div className={styles.phoneRow}>
                    <span className={styles.dialCode}>+60</span>
                    <input type="tel" className={`${styles.input} ${styles.inputPhone}`} placeholder="12 345 67891" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Password</label>
                  <div className={styles.pwdRow}>
                    <input type={showPwd ? "text" : "password"} className={styles.input} placeholder="Password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="button" className={styles.showPwd} onClick={() => setShowPwd(v => !v)} aria-label="Toggle password">{showPwd ? "🙈" : "👁"}</button>
                  </div>
                </div>
              </>
            )}

            {tab === "1click" && (
              <div className={styles.oneClick}>
                <p>Create an account with just one click. Currency and password will be generated automatically.</p>
                <div className={styles.field}>
                  <label className={styles.label}>Currency</label>
                  <select className={styles.input} value={currency} onChange={e => setCurrency(e.target.value)}>
                    <option value="MYR">MYR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>
            )}

            {tab === "social" && (
              <div className={styles.socialBtns}>
                <button type="button" className={`${styles.socialBtn} ${styles.socialGoogle}`}>Continue with Google</button>
                <button type="button" className={`${styles.socialBtn} ${styles.socialTelegram}`}>Continue with Telegram</button>
                <button type="button" className={`${styles.socialBtn} ${styles.socialFacebook}`}>Continue with Facebook</button>
              </div>
            )}

            {error && <p className={styles.error}>{error}</p>}

            {tab !== "social" && (
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "REGISTERING…" : "REGISTER"}
              </button>
            )}

            <p className={styles.terms}>
              By registering you agree to our{" "}
              <Link href="/en/information/rules" className={styles.termsLink}>Terms and Conditions</Link>{" "}
              and{" "}
              <Link href="/en/information/rules/privacy_policy" className={styles.termsLink}>Privacy Policy</Link>
            </p>
          </form>

          <div className={styles.loginPrompt}>
            Already have an account?{" "}
            <Link href="/en/user/login" className={styles.loginLink}>Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
