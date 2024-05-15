import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import baseURL from "./components/Config";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
// import { ThemeContext } from "./ThemeContext";

function FileEditDialog({
  fileKey,
  showEditDialog,
  loadList,
  initialDescription,
}) {
  const [descriptionUpd, setDescriptionUpd] = useState(initialDescription);
  const [errors, setErrors] = useState({});

  const updateFile = () => {
    setErrors({}); // clear all errors

    const formData2 = {};
    let errorFound = false;
    if (descriptionUpd.length > 0) {
      formData2.description = descriptionUpd;
    } else {
      setErrors({ descriptionUpd: "Please enter description" });
      errorFound = true;
    }

    if (errorFound) return false;

    axios
      .patch(baseURL + "/files/modify/" + fileKey, formData2)
      .then((response) => {
        if (response.data.success) {
          loadList();
          showEditDialog(false);
        } else {
          alert("Error while updating record");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="d-flex w-100 justify-content-center align-items-center position-fixed fixed-top"
      style={{
        height: "100%",
        zIndex: 1,
        backgroundColor: "rgba(135,206,235,0.7)",
      }}
    >
      <div className="d-flex flex-column align-items-center bg-white rounded-lg">
        <div className="d-flex flex-column w-100 px-4 py-2 border bg-black text-white border-red">
          <h5>Modify Description</h5>
        </div>
        <div className="d-flex flex-column w-100 px-4 pt-4">
          <div className="form-group mb-3">
            <label htmlFor="descriptionUpd">Description</label>
            <input
              type="text"
              name="descriptionUpd"
              id="descriptionUpd"
              value={descriptionUpd}
              className="form-control rounded-0"
              placeholder="Enter description"
              autoComplete="off"
              onChange={(e) => setDescriptionUpd(e.target.value)}
            />

            <div className="invalid-feedback d-block">
              {errors.descriptionUpd ? errors.descriptionUpd : ""}
            </div>
          </div>

          <div className="d-flex justify-content-end px-3 py-3">
            <button
              className="border-light rounded-lg shadow-lg px-4 py-2 me-3"
              onClick={() => showEditDialog(false)}
            >
              Cancel
            </button>
            &nbsp;
            <button
              className="border-light rounded-lg shadow-lg bg-danger text-light px-4 py-2 ms-3"
              onClick={updateFile}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileEditDialog;
