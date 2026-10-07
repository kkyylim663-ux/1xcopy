"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import styles from "./page.module.css";
import { Suspense } from "react";

const BONUS_OPTIONS = [
  {
    value: "CASINO",
    label: "Casino + 1xGames",
    desc: "Welcome package up to 9888 MYR + 350 FS",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.bonusIcon}>
        <rect x="8" y="14" width="32" height="22" rx="3" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.15)"/>
        <circle cx="24" cy="25" r="6" fill="white" opacity="0.9"/>
        <path d="M14 10 L24 6 L34 10" stroke="white" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="25" r="2.5" fill="#1d4268"/>
      </svg>
    ),
  },
  {
    value: "SPORT_SINGLE",
    label: "Sport Single",
    desc: "100% up to 808 MYR — only 3 bets for your bonus!",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.bonusIcon}>
        <circle cx="24" cy="24" r="16" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.15)"/>
        <path d="M24 8 C24 8 18 14 18 24 C18 34 24 40 24 40" stroke="white" strokeWidth="1.5"/>
        <path d="M24 8 C24 8 30 14 30 24 C30 34 24 40 24 40" stroke="white" strokeWidth="1.5"/>
        <path d="M8 24 L40 24" stroke="white" strokeWidth="1.5"/>
        <path d="M10 16 L38 16" stroke="white" strokeWidth="1"/>
        <path d="M10 32 L38 32" stroke="white" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    value: "SPORTS_ESPORTS",
    label: "Sports and esports bonus",
    desc: "First deposit bonus up to 588 MYR",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.bonusIcon}>
        <circle cx="24" cy="24" r="16" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.15)"/>
        <path d="M16 20 L24 14 L32 20 L32 30 L16 30 Z" stroke="white" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="24" r="3" fill="white" opacity="0.9"/>
      </svg>
    ),
  },
  {
    value: "NONE",
    label: "Reject bonuses",
    desc: "Make your choice later",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.bonusIcon}>
        <circle cx="24" cy="24" r="16" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="rgba(255,255,255,0.06)"/>
        <path d="M17 17 L31 31 M31 17 L17 31" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const COUNTRIES = [
  { code: "MY", label: "Malaysia" },
  { code: "SG", label: "Singapore" },
  { code: "ID", label: "Indonesia" },
  { code: "TH", label: "Thailand" },
  { code: "PH", label: "Philippines" },
  { code: "VN", label: "Vietnam" },
  { code: "MM", label: "Myanmar" },
  { code: "BN", label: "Brunei" },
];

const REG_TABS = [
  { value: "email", label: "By e-mail" },
  { value: "phone", label: "By phone" },
  { value: "1click", label: "One-click" },
  { value: "social", label: "Social networks and messengers" },
];

function RegistrationForm() {
  const router = useRouter();
  const { register } = useAuth();
  const searchParams = useSearchParams();

  const initialBonus = searchParams.get("bonus") || "CASINO";
  const initialCurrency = searchParams.get("currency") || "MYR";

  const [bonus, setBonus] = useState(initialBonus);
  const [tab, setTab] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [promo, setPromo] = useState("");
  const [currency, setCurrency] = useState(initialCurrency);
  const [country, setCountry] = useState("MY");
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
      <div className={styles.container}>
        {/* Left: Bonus panel */}
        <div className={styles.bonusPanel}>
          {BONUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              className={`${styles.bonusItem} ${bonus === opt.value ? styles.bonusItemActive : ""}`}
              onClick={() => setBonus(opt.value)}
            >
              <span className={styles.bonusIconWrap}>{opt.icon}</span>
              <span className={styles.bonusText}>
                <strong className={styles.bonusLabel}>{opt.label}</strong>
                <span className={styles.bonusDesc}>{opt.desc}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Right: Form panel */}
        <div className={styles.formPanel}>
          <h1 className={styles.title}>REGISTRATION</h1>

          {/* Tabs */}
          <div className={styles.tabs}>
            {REG_TABS.map(t => (
              <button
                key={t.value}
                type="button"
                className={`${styles.tab} ${tab === t.value ? styles.tabActive : ""}`}
                onClick={() => setTab(t.value)}
              >
                {t.value === "email" && (
                  <svg viewBox="0 0 16 12" fill="currentColor" className={styles.tabIcon}>
                    <rect x="0" y="0" width="16" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M0 2 L8 7 L16 2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                  </svg>
                )}
                {t.value === "phone" && (
                  <svg viewBox="0 0 14 14" fill="currentColor" className={styles.tabIcon}>
                    <rect x="2" y="0" width="10" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2"/>
                    <circle cx="7" cy="11.5" r="0.8" fill="currentColor"/>
                  </svg>
                )}
                {t.value === "1click" && (
                  <svg viewBox="0 0 14 16" fill="currentColor" className={styles.tabIcon}>
                    <path d="M7 0 L2 9 L6 9 L5 16 L12 7 L8 7 Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
                )}
                {t.value === "social" && (
                  <svg viewBox="0 0 16 14" fill="currentColor" className={styles.tabIcon}>
                    <circle cx="5" cy="7" r="3" fill="none" stroke="currentColor" strokeWidth="1.2"/>
                    <circle cx="12" cy="4" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.2"/>
                    <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M8 6 L10 5 M8 8 L10 9" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                )}
                {t.label}
              </button>
            ))}
          </div>

          {/* Form content */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {tab === "email" && (
              <>
                <div className={styles.row2}>
                  <div className={styles.floatField}>
                    <span className={styles.floatLabel}>Select country</span>
                    <div className={styles.selectWithFlag}>
                      <span className={styles.flagBadge}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://flagcdn.com/20x15/${country.toLowerCase()}.png`}
                          width="20"
                          height="15"
                          alt={country}
                        />
                      </span>
                      <select
                        className={styles.floatSelectFlag}
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                      >
                        {COUNTRIES.map(c => (
                          <option key={c.code} value={c.code}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className={styles.floatField}>
                    <span className={styles.floatLabel}>Select currency</span>
                    <select
                      className={styles.floatSelect}
                      value={currency}
                      onChange={e => setCurrency(e.target.value)}
                    >
                      <option value="MYR">Malaysian ringgit (MYR)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="SGD">Singapore Dollar (SGD)</option>
                    </select>
                  </div>
                </div>

                <div className={styles.floatField}>
                  <input
                    type="email"
                    className={styles.floatInput}
                    placeholder=" "
                    id="reg-email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <label htmlFor="reg-email" className={styles.inputLabel}>Email*</label>
                </div>

                <div className={styles.floatField}>
                  <input
                    type={showPwd ? "text" : "password"}
                    className={styles.floatInput}
                    placeholder=" "
                    id="reg-pwd"
                    autoComplete="new-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <label htmlFor="reg-pwd" className={styles.inputLabel}>Password*</label>
                  <button type="button" className={styles.pwdIconBtn} onClick={() => {
                    const p = Math.random().toString(36).slice(-10) + "A1!";
                    setPassword(p);
                    setShowPwd(true);
                  }} aria-label="Generate password" title="Generate password">
                    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                      <path d="M8 1 C5.2 1 3 3.2 3 6 C3 7.5 3.6 8.8 4.6 9.7 L3 14 L8 12 L13 14 L11.4 9.7 C12.4 8.8 13 7.5 13 6 C13 3.2 10.8 1 8 1 Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                      <circle cx="8" cy="6" r="2" fill="currentColor" opacity="0.7"/>
                    </svg>
                  </button>
                  <button type="button" className={styles.eyeIconBtn} onClick={() => setShowPwd(v => !v)} aria-label="Toggle password visibility">
                    {showPwd ? (
                      <svg viewBox="0 0 18 14" fill="none" width="16" height="14">
                        <path d="M1 7 C3 2 6 0 9 0 C12 0 15 2 17 7 C15 12 12 14 9 14 C6 14 3 12 1 7 Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                        <circle cx="9" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                        <line x1="2" y1="1" x2="16" y2="13" stroke="currentColor" strokeWidth="1.3"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 18 14" fill="none" width="16" height="14">
                        <path d="M1 7 C3 2 6 0 9 0 C12 0 15 2 17 7 C15 12 12 14 9 14 C6 14 3 12 1 7 Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                        <circle cx="9" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                      </svg>
                    )}
                  </button>
                </div>

                <div className={styles.floatField}>
                  <input
                    type="text"
                    className={styles.floatInput}
                    placeholder="Promo code (if you have one)"
                    id="reg-promo"
                    autoComplete="off"
                    value={promo}
                    onChange={e => setPromo(e.target.value)}
                  />
                </div>
              </>
            )}

            {tab === "phone" && (
              <>
                <div className={styles.row2}>
                  <div className={styles.floatField}>
                    <span className={styles.floatLabel}>Select country</span>
                    <select className={styles.floatSelect} value={country} onChange={e => setCountry(e.target.value)}>
                      <option value="MY">Malaysia (+60)</option>
                      <option value="SG">Singapore (+65)</option>
                      <option value="ID">Indonesia (+62)</option>
                      <option value="TH">Thailand (+66)</option>
                    </select>
                  </div>
                  <div className={styles.floatField}>
                    <span className={styles.floatLabel}>Select currency</span>
                    <select className={styles.floatSelect} value={currency} onChange={e => setCurrency(e.target.value)}>
                      <option value="MYR">Malaysian ringgit (MYR)</option>
                      <option value="USD">US Dollar (USD)</option>
                    </select>
                  </div>
                </div>
                <div className={styles.phoneFieldRow}>
                  <div className={styles.dialPrefix}>+60</div>
                  <div className={`${styles.floatField} ${styles.phoneInputField}`}>
                    <input
                      type="tel"
                      className={`${styles.floatInput} ${styles.floatInputPhone}`}
                      placeholder=" "
                      id="reg-phone"
                      autoComplete="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                    <label htmlFor="reg-phone" className={styles.inputLabel}>Phone number*</label>
                  </div>
                </div>
                <div className={styles.floatField}>
                  <input
                    type={showPwd ? "text" : "password"}
                    className={styles.floatInput}
                    placeholder=" "
                    id="reg-pwd-phone"
                    autoComplete="new-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <label htmlFor="reg-pwd-phone" className={styles.inputLabel}>Password*</label>
                  <button type="button" className={styles.eyeIconBtn} onClick={() => setShowPwd(v => !v)} aria-label="Toggle password visibility">
                    <svg viewBox="0 0 18 14" fill="none" width="16" height="14">
                      <path d="M1 7 C3 2 6 0 9 0 C12 0 15 2 17 7 C15 12 12 14 9 14 C6 14 3 12 1 7 Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                      <circle cx="9" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                    </svg>
                  </button>
                </div>
              </>
            )}

            {tab === "1click" && (
              <div className={styles.oneClickWrap}>
                <div className={styles.floatField}>
                  <span className={styles.floatLabel}>Select currency</span>
                  <select className={styles.floatSelect} value={currency} onChange={e => setCurrency(e.target.value)}>
                    <option value="MYR">Malaysian ringgit (MYR)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
                <p className={styles.oneClickNote}>
                  Create an account with just one click. Your currency and password will be generated automatically.
                </p>
              </div>
            )}

            {tab === "social" && (
              <div className={styles.socialBtns}>
                <button type="button" className={`${styles.socialBtn} ${styles.socialGoogle}`}>
                  <svg viewBox="0 0 18 18" width="18" height="18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
                  Continue with Google
                </button>
                <button type="button" className={`${styles.socialBtn} ${styles.socialTelegram}`}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.269c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.952z"/></svg>
                  Continue with Telegram
                </button>
                <button type="button" className={`${styles.socialBtn} ${styles.socialFacebook}`}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                  Continue with Facebook
                </button>
              </div>
            )}

            {error && <p className={styles.error}>{error}</p>}

            {tab !== "social" && (
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "REGISTERING…" : "REGISTER"}
              </button>
            )}

            <p className={styles.terms}>
              By clicking this button you confirm that you have read and agree to the{" "}
              <Link href="/en/information/rules" className={styles.termsLink}>Terms and Conditions</Link>{" "}
              and{" "}
              <Link href="/en/information/rules/privacy_policy" className={styles.termsLink}>Privacy Policy</Link>{" "}
              of the company and confirm that you are of legal age
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function RegistrationPage() {
  return (
    <Suspense fallback={null}>
      <RegistrationForm />
    </Suspense>
  );
}
