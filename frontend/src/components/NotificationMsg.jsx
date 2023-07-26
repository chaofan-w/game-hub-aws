import * as React from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useDispatch } from "react-redux";
import { removeNotification } from "../features/notificationMsg/notificationsSlice";
import PropTypes from "prop-types";

const NotificationMsg = ({ severity, message }) => {
  const toastLiveExampleRef = React.useRef(null);
  const alertColors = {
    success: "--bs-success-rgb",
    warning: "--bs-warning-rgb",
    info: "--bs-info-rgb",
    alert: "--bs-danger-rgb",
  };

  React.useEffect(() => {
    const toastLiveExampleEl = toastLiveExampleRef.current;
    const toast = new bootstrap.Toast(toastLiveExampleEl, {
      autohide: false,
    });
    toast.show();
  }, []);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(removeNotification());
  };

  return (
    <div>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          ref={toastLiveExampleRef}
          id="liveToast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div
            className="toast-header"
            style={{
              backgroundColor: `rgba(var(${alertColors[severity]}),.5)`,
            }}
          >
            <strong className="me-auto">
              {severity[0].toUpperCase() + severity.slice(1).toLowerCase()}
            </strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={handleClick}
            ></button>
          </div>
          <div
            className="toast-body"
            style={{
              backgroundColor: `rgba(var(${alertColors[severity]}),.7)`,
            }}
          >
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

NotificationMsg.propTypes = {
  severity: PropTypes.string,
  message: PropTypes.string,
};

export default NotificationMsg;
