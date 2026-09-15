export const ogImageAlt =
  "NullPointer Hub — websites that look expensive, priced like they aren't";
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png" as const;

export function OgImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0a0e14",
        backgroundImage:
          "radial-gradient(circle at 82% 18%, rgba(52,211,153,0.22), transparent 45%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          textTransform: "uppercase",
          letterSpacing: "6px",
          fontSize: "22px",
          fontWeight: 700,
          color: "#8e99a8",
        }}
      >
        Web design for Malaysian SMEs
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "36px",
          fontSize: "148px",
          fontWeight: 800,
          letterSpacing: "-4px",
          color: "#f3f5f7",
        }}
      >
        null
        <span style={{ color: "#34d399" }}>.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "20px",
          maxWidth: "820px",
          fontSize: "34px",
          lineHeight: 1.4,
          color: "#c5cbd3",
        }}
      >
        Websites that look expensive, priced like they aren&apos;t.
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "56px",
          fontSize: "26px",
          fontWeight: 700,
          color: "#f3f5f7",
        }}
      >
        NullPointer Hub
      </div>
    </div>
  );
}
