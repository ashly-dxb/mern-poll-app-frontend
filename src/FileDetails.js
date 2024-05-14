import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "./components/Config";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeContext } from "./ThemeContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

function FileDetails() {
  const [auth, setAuth] = useState(false);

  const [fileDetails, setFileDetails] = useState({});
  const [previewURL, setPreviewURL] = useState("");
  const [documentType, setDocumentType] = useState("");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   axios
  //     .get(baseURL + "/users/checkauth")
  //     .then((result) => {
  //       if (result.data.valid) {
  //         console.log("Auth is valid in FileDetails page");
  //         setAuth(true);
  //       } else {
  //         setAuth(false);
  //         navigate("/login");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, [navigate]);

  useEffect(() => {
    const fileID = new URLSearchParams(window.location.search).get("id");
    axios
      .get(baseURL + `/files/details/${fileID}`)
      .then(function (response) {
        setFileDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const downloadFile = (filename) => {
    // const response = await axios.get(baseURL + `/files/download/${filename}`, {
    //   responseType: "blob",
    // });
    // const file = window.URL.createObjectURL(new Blob([response.data]));
    window.open(baseURL + `/files/download/${filename}`);
  };

  const previewFile = (filename) => {
    axios(baseURL + `/files/preview/${filename}`, {
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const file = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        const fileURL = URL.createObjectURL(file);
        const extension = filename.substring(filename.lastIndexOf(".") + 1);

        console.log(fileURL);
        console.log(extension);

        var documentType;

        if (extension === "jpg") {
          documentType = "image/x-citrix-jpeg";
        }
        if (extension === "pdf") {
          documentType = "application/pdf";
        }
        if (extension === "docx") {
          documentType =
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        }

        setPreviewURL(fileURL);
        setDocumentType(documentType);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex-container m-3">
      <div className="ui-container py-5 px-2">
        <div className="col-md-8 p-2 border">
          <div className="headerStrip">
            <h3>File Details</h3>
          </div>

          <div className="row">
            <div className="col text-end">
              <button
                className="px-3 py-2 my-2 bg-dark text-white"
                onClick={() => navigate(-1)}
              >
                <FontAwesomeIcon icon={faArrowAltCircleLeft} color="red" />
                &nbsp; Back
              </button>
            </div>
          </div>

          <div className="row mb-2 py-2">
            <div className="col-md-4">Filename</div>
            <div className="col-md-8">{fileDetails.filename}</div>
          </div>

          <div className="row mb-2 py-2">
            <div className="col-md-4">Original name</div>
            <div className="col-md-8">{fileDetails.originalname}</div>
          </div>

          <div className="row mb-2 py-2">
            <div className="col-md-4">Description</div>
            <div className="col-md-8">{fileDetails.description}</div>
          </div>

          <div className="row mb-2 py-2">
            <div className="col-md-4">Upload date</div>
            <div className="col-md-8">{fileDetails.uploadedDate}</div>
          </div>

          <div className="row">
            <div className="col-md-4 float-start">&nbsp;</div>
            <div className="col-md-8 float-end">
              <button
                className="px-2 py-2 my-2 bg-primary border-0 text-white"
                onClick={() => downloadFile(fileDetails.filename)}
              >
                <FontAwesomeIcon icon={faDownload} color="white" />
                &nbsp; Download
              </button>
            </div>
          </div>

          {/* <button
            className="px-2 py-2 my-2 bg-primary border-0 text-white"
            onClick={() => previewFile(fileDetails.filename)}
          >
            Preview
          </button> */}

          <div className="row">
            {/* <iframe
              width="400"
              height="400"
              frameBorder="0"
              src={`https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(
                previewURL
              )}`}
            ></iframe> */}

            {/* <object
              data={previewURL}
              type={documentType}
              width="400"
              height="500"
            ></object> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileDetails;
