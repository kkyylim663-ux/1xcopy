export default function PaymentPage() {
  const methods = [
    { name: "Online Banking (FPX)", min: "MYR 30", max: "MYR 30,000", time: "Instant" },
    { name: "Touch 'n Go eWallet", min: "MYR 10", max: "MYR 5,000", time: "Instant" },
    { name: "Grab Pay", min: "MYR 10", max: "MYR 5,000", time: "Instant" },
    { name: "Bank Transfer", min: "MYR 100", max: "MYR 100,000", time: "1–3 Business Days" },
    { name: "Cryptocurrency (USDT)", min: "MYR 50", max: "Unlimited", time: "10–30 min" },
  ];
  return (
    <>
      <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "20px" }}>Payment Methods</h1>
      <p>SLOTSHUB supports a wide range of payment methods to ensure convenient deposits and withdrawals for all players.</p>
      <div style={{ marginTop: "24px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr>
              {["Method", "Min Deposit", "Max Deposit", "Processing Time"].map(h => (
                <th key={h} style={{ padding: "10px 12px", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.5px", textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {methods.map(m => (
              <tr key={m.name}>
                {[m.name, m.min, m.max, m.time].map((v, i) => (
                  <td key={i} style={{ padding: "12px", borderBottom: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.85)" }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: "28px 0 12px" }}>Withdrawal Policy</h2>
      <p>Withdrawals are processed within 24 hours for verified accounts. A minimum of MYR 50 is required per withdrawal. Please note that the first withdrawal must be made using the same method as the deposit.</p>
    </>
  );
}
