const FilterBtn = () => {
  return (
    <div className="my-2">
      <div
        className="container bg-black rounded-pill shadow-sm px-3 py-1 ms-0 d-flex justify-content-center"
        style={{ width: "8rem", "--bs-bg-opacity": ".4" }}
      >
        <button
          className="btn btn-outline border-0 d-flex justify-content-center align-items-center text-secondary fw-bold"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasFilter"
          aria-controls="offcanvasTop"
          style={{ width: "8rem", "--bs-bg-opacity": ".4" }}
        >
          <i className="bi bi-funnel me-2"></i>
          <small>Filter</small>
        </button>
      </div>
    </div>
  );
};

export default FilterBtn;
