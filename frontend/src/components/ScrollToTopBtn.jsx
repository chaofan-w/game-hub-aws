const ScrollToTopBtn = () => {
  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <button
      type="button"
      className="btn btn-floating btn-lg rounded-circle text-white justify-content-center align-items-center"
      id="btn-back-to-top"
      style={{
        width: "50px",
        height: "50px",
        position: "fixed",
        bottom: "10vh",
        right: "25px",
        backgroundColor: "rgba(var(--bs-secondary-rgb), 0.6)",
        display:
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
            ? "flex"
            : "none",
      }}
      onClick={backToTop}
    >
      <i className="bi bi-arrow-bar-up"></i>
    </button>
  );
};

export default ScrollToTopBtn;
