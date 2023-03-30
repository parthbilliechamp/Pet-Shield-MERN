import React from "react";

export default function SuccessAlert({ alert }) {
  console.log(alert);
  return (
    <div>
      {alert && alert.message && alert.type === undefined && (
        <div>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{alert.message}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
            ></button>
          </div>
        </div>
      )}
      {alert && alert.message && alert.type && (
        <div>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{alert.message}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
            ></button>
          </div>
        </div>
      )}
    </div>
  );
}
