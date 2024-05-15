import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "./components/Config";
import axios from "axios";
import FileEditDialog from "./FileEditDialog";

import "bootstrap/dist/css/bootstrap.min.css";
// import { ThemeContext } from "./ThemeContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPencilAlt,
  faBook,
  faSpinner,
  faRefresh,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

function FileUpload() {
  const [errors, setErrors] = useState({});

  const [uploadFiles, setUploadFiles] = useState([]);
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [key, setKey] = useState(null);
  const [descriptionVal, setDescriptionVal] = useState("");

  const changeFiles = (e) => {
    setUploadFiles(e.target.files);
  };

  // const navigate = useNavigate();
  // axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   axios
  //     .get(baseURL + "/users/checkauth")
  //     .then((result) => {
  //       if (result.data.valid) {
  //         console.log("Auth is valid in upload page");
  //         setAuth(true);
  //       } else {
  //         setAuth(false);
  //         navigate("/login");
  //       }
  //     })
  //     .catch((err) => console.log(err));

  // }, [navigate]);

  useEffect(() => {
    loadList();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const file of uploadFiles) {
      formData.append("uploadedfiles", file);
    }

    setErrors({}); // clear all errors

    let errorFound = false;

    if (uploadFiles.length < 1) {
      setErrors({ uploadFile: "Please choose a file" });
      errorFound = true;
    }

    if (description.length < 5) {
      setErrors({ description: "Minimum 5 characters required" });
      errorFound = true;
    }

    if (description.length > 0) {
      formData.append("description", description);
    } else {
      setErrors({ description: "Please enter Description" });
      errorFound = true;
    }

    if (errorFound) return false;
    setUploading(true); // only set it here after all validations

    axios
      .post(baseURL + "/files/uploadfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // const filenames = response.data.files.map((file) => file.filename);
        // const fileName = response.data.filename;
        loadList();
        clearForm(event);

        setUploading(false);
      })
      .catch((err) => console.log(err));
  };

  const clearForm = (event) => {
    setDescription("");

    Array.from(event.target).forEach((target) => {
      target.value = "";
    });
  };

  const loadList = () => {
    setIsLoading(true);

    axios
      .get(baseURL + "/files/list")
      .then(function (response) {
        setFileList(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
      });
  };

  const ShowDeleteDialog = () => (
    <div
      className="d-flex w-100 justify-content-center align-items-center position-fixed fixed-top border"
      style={{
        height: "100%",
        zIndex: 1,
        backgroundColor: "rgba(135,206,235,0.7)",
      }}
    >
      <div className="d-flex flex-column align-items-center bg-white rounded-lg">
        <div className="d-flex flex-column w-100 px-4 py-2 border bg-black text-white border-red">
          <h5>Delete File</h5>
        </div>
        <div className="d-flex flex-column w-100 px-4 pt-4">
          <span className="text-secondary">
            Are you sure you want to delete the file?
          </span>

          <div className="d-flex justify-content-end px-3 py-3">
            <button
              className="border-light rounded-lg shadow-lg px-4 py-2 me-3"
              onClick={() => setShowDelete(false)}
            >
              Cancel
            </button>
            &nbsp;
            <button
              className="border-light rounded-lg shadow-lg bg-danger text-light px-4 py-2 ms-3"
              onClick={deleteFile}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const deleteFile = () => {
    setShowDelete(false);

    axios
      .delete(baseURL + "/files/delete/" + key)
      .then((response) => {
        if (response.data.success) {
          loadList();
        } else {
          alert("Error occured while deleting record");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex-container m-3">
      <div className="ui-container py-5 px-2">
        <div className="row">
          <div className="col-md-3">
            <div className="col-md-12 p-2 border">
              <div className="headerStrip">
                <h3>Upload File</h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3 pt-3">
                  <label htmlFor="uploadFile">Choose File</label>
                  <input
                    type="file"
                    name="uploadFile"
                    id="uploadFile"
                    className="form-control rounded-0"
                    onChange={changeFiles}
                  />

                  <div className="invalid-feedback d-block">
                    {errors.uploadFile ? errors.uploadFile : ""}
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="form-control rounded-0"
                    placeholder="Enter description"
                    autoComplete="off"
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <div className="invalid-feedback d-block">
                    {errors.description ? errors.description : ""}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 rounded-0"
                >
                  &nbsp;
                  {uploading ? (
                    <>
                      <FontAwesomeIcon
                        icon={uploading ? faSpinner : faUpload}
                        color="white"
                        className="fa-1x spinner"
                        alt="uploading"
                        title="uploading"
                      />
                      &nbsp; Uploading ...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faUpload} color="white" />
                      &nbsp; Upload
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-9">
            <div className="d-flex flex-md-row w-100 py-3 fw-bold">
              <div className="flex-column col-md-2 col-sm-1 col-1 d-none d-lg-block">
                Filename
              </div>
              <div className="flex-column col-md-2 col-sm-3 col-5">
                Original Name
              </div>
              <div className="flex-column col-md-2 col-sm-1 col-1 d-none d-lg-block">
                Description
              </div>
              <div className="flex-column col-md-2 col-sm-3 col-4">
                Upload Date
              </div>
              <div className="flex-column col-md-2 col-sm-2 col-3">
                <FontAwesomeIcon
                  icon={isLoading ? faSpinner : faRefresh}
                  className="fa spinner flex-column"
                  alt="Refresh"
                  title="Refresh"
                  onClick={loadList}
                  role="button"
                />
              </div>
            </div>

            {fileList.map((file, index) => {
              return (
                <div
                  className="rowStriped d-flex flex-md-row my-1 align-items-center rounded"
                  key={index}
                >
                  <div className="flex-column col-md-2 col-sm-1 col-1 d-none d-lg-block">
                    {file.filename}
                  </div>
                  <div className="flex-column col-md-2 col-sm-3 col-5">
                    {file.originalname}
                  </div>
                  <div className="flex-column col-md-2 col-sm-1 col-1 d-none d-lg-block">
                    {file.description}
                  </div>
                  <div className="flex-column col-md-2 col-sm-3 col-4">
                    {moment(file.uploadedDate).format("YYYY-MM-DD HH:mm")}
                  </div>
                  <div className="flex-column col-md-2 col-sm-2 col-3">
                    <Link
                      className="p-2 outline-none rounded hover-shadow border-0 bg-transparent"
                      aria-label="Edit File"
                      title="Edit"
                      onClick={() => {
                        setShowEdit(true);
                        setKey(file._id);
                        setDescriptionVal(file.description);
                      }}
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </Link>

                    <button
                      className="p-2 outline-none rounded hover-shadow text-danger border-0 bg-transparent"
                      aria-label="Delete File"
                      title="Delete"
                      onClick={() => {
                        setShowDelete(true);
                        setKey(file._id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>

                    <Link
                      to={"/file-details/?id=" + file._id}
                      className="p-2 outline-none rounded hover-shadow text-success border-0 bg-transparent"
                      aria-label="Details"
                      title="View Details"
                    >
                      <FontAwesomeIcon icon={faBook} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showDelete ? <ShowDeleteDialog /> : null}
      {showEdit ? (
        <FileEditDialog
          fileKey={key}
          showEditDialog={setShowEdit}
          loadList={loadList}
          initialDescription={descriptionVal}
        />
      ) : null}
    </div>
  );
}

export default FileUpload;
