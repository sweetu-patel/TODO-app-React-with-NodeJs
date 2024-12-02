import React, { forwardRef, useImperativeHandle, useRef } from "react";

const Modal = forwardRef(({ title, children, onSave, isSaveDisabled }, ref) => {
  // const { title, children, onSave, isSaveDisabled } = props;
  const refOpen = useRef(null);
  const refClose = useRef(null);

  const openModal = () => {
    refOpen.current.click();
  };

  // Expose openModal to parent via ref
  useImperativeHandle(ref, () => ({
    openModal: () => {
      refOpen.current.click();
    },
  }));

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    refClose.current.click();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={refOpen}
        hidden
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={isSaveDisabled}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Modal;
