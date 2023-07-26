import { useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CartBtn = () => {
  const itemCounts = useSelector(selectCartItems).length;
  const navigate = useNavigate();
  const handleClickCartBtn = () => {
    navigate("/cart");
  };

  return (
    <button
      className="btn text-secondary position-relative p-0 me-2 border-0"
      onClick={handleClickCartBtn}
      disabled={itemCounts === 0}
    >
      <i className="bi bi-bag-fill fs-3"></i>
      <small className="position-absolute top-50 start-50 translate-middle badge mt-1">
        {itemCounts}
      </small>
    </button>
  );
};

export default CartBtn;
