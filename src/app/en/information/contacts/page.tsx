export default function ContactsPage() {
  return (
    <>
      <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "20px" }}>Contacts</h1>
      <p>Our customer support team is available 24/7 to assist you with any questions or concerns.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginTop: "24px" }}>
        {[
          { label: "Live Chat", value: "Available 24/7", desc: "Instant support via live chat", icon: "💬" },
          { label: "Email Support", value: "support@slotshub.com", desc: "Response within 2 hours", icon: "✉️" },
          { label: "Phone", value: "+60 3-2000-0000", desc: "Mon–Fri, 9AM–9PM MYT", icon: "📞" },
          { label: "Telegram", value: "@SlotsHubSupport", desc: "Direct message our support bot", icon: "✈️" },
        ].map(c => (
          <div key={c.label} style={{ padding: "20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px" }}>
            <div style={{ fontSize: "24px", marginBottom: "10px" }}>{c.icon}</div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{c.label}</div>
            <div style={{ fontSize: "13px", color: "rgb(61,165,255)", marginBottom: "4px" }}>{c.value}</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}
