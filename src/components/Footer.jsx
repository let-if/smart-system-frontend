const Footer = () => {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        // left: ,
        width: "100%",
        height: "45px",
        backgroundColor: "#111827",
        color: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        fontSize: "13px",
        zIndex: 1000,
      }}
    >
      <span>© 2026 ASTU Smart Complaint & Issue Tracking System</span>

      <span style={{ opacity: 0.7 ,paddingRight:"30px"}}>
        Version 1.0
      </span>
    </footer>
  );
};

export default Footer;