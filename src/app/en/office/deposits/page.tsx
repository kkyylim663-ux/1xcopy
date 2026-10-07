"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import styles from "./page.module.css";

const METHODS = [
  { id: "fpx", label: "Online Banking (FPX)", icon: "🏦", min: 30, max: 30000 },
  { id: "tng", label: "Touch 'n Go eWallet", icon: "💚", min: 10, max: 5000 },
  { id: "grabpay", label: "GrabPay", icon: "🟢", min: 10, max: 5000 },
  { id: "usdt", label: "USDT / Crypto", icon: "₿", min: 50, max: 999999 },
];

export default function DepositsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [method, setMethod] = useState("fpx");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!user) router.push("/en/user/login");
  }, [user, router]);

  if (!user) return null;

  const selectedMethod = METHODS.find(m => m.id === method);
  const quickAmounts = [50, 100, 200, 500, 1000];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.formBox}>
          <h1 className={styles.title}>Deposit Funds</h1>
          <p className={styles.balance}>Current balance: <strong>{user.currency} {user.balance.toFixed(2)}</strong></p>

          <div className={styles.section}>
            <h2 className={styles.sectionLabel}>Select Payment Method</h2>
            <div className={styles.methods}>
              {METHODS.map(m => (
                <button key={m.id} type="button" className={`${styles.methodBtn} ${method === m.id ? styles.methodActive : ""}`} onClick={() => setMethod(m.id)}>
                  <span className={styles.methodIcon}>{m.icon}</span>
                  <span className={styles.methodLabel}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionLabel}>Enter Amount ({user.currency})</h2>
            <div className={styles.quickAmounts}>
              {quickAmounts.map(a => (
                <button key={a} type="button" className={`${styles.quickBtn} ${amount === String(a) ? styles.quickActive : ""}`} onClick={() => setAmount(String(a))}>
                  {a}
                </button>
              ))}
            </div>
            <input
              type="number"
              className={styles.amountInput}
              placeholder={`Min ${selectedMethod?.min} — Max ${selectedMethod?.max?.toLocaleString()}`}
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>

          <button type="button" className={styles.submitBtn} disabled={!amount || Number(amount) < (selectedMethod?.min || 0)}>
            PROCEED TO PAYMENT
          </button>

          <p className={styles.note}>Deposits are processed instantly. There are no fees for deposits.</p>
        </div>
      </div>
    </div>
  );
}
