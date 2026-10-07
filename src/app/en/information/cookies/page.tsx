export default function CookiesPage() {
  return (
    <>
      <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "20px" }}>Cookie Policy</h1>
      <p>SLOTSHUB uses cookies and similar technologies to improve your experience on our platform. This policy explains what cookies are, how we use them, and your choices.</p>
      <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: "24px 0 12px" }}>What Are Cookies?</h2>
      <p>Cookies are small text files placed on your device when you visit a website. They help the site remember your preferences, keep you logged in, and provide analytics data.</p>
      <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: "24px 0 12px" }}>Types of Cookies We Use</h2>
      <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <li><strong style={{ color: "#fff" }}>Essential Cookies</strong> — Required for the platform to function. These cannot be disabled.</li>
        <li><strong style={{ color: "#fff" }}>Analytics Cookies</strong> — Help us understand how players use the platform so we can improve it.</li>
        <li><strong style={{ color: "#fff" }}>Preference Cookies</strong> — Remember your settings such as language and odds format.</li>
        <li><strong style={{ color: "#fff" }}>Marketing Cookies</strong> — Used to show you relevant promotions. You can opt out.</li>
      </ul>
      <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: "24px 0 12px" }}>Managing Cookies</h2>
      <p>You can control cookies through your browser settings. Disabling cookies may affect the functionality of the platform. You can also opt out of marketing cookies via your account settings.</p>
    </>
  );
}
