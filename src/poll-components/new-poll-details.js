import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import baseURL from "../components/Config";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Notification from "./notification";
import Slide from "@material-ui/core/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function NewPollDetails({ location }) {
  const [pollID, setPollID] = useState("");
  const [key, setKey] = useState("");

  const [toast, setToast] = useState({
    snackbaropen: false,
    msg: "",
    not: "",
    Transition: Slide,
  });

  const snackbarclose = (event) => {
    setToast({ snackbaropen: false });
  };

  useEffect(() => {
    // var x = queryString.parse(location.search);
    // const id = x.id;

    const id = new URLSearchParams(window.location.search).get("id");

    const data = { id: id };
    axios
      .post(baseURL + "/polls/links", data)
      .then(function (response) {
        console.log("LINK_RESP:", response.data);
        const pollID = response.data.pollID;
        setPollID(pollID);
        setKey(response.data._id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("pollcreated") == 0) {
      setToast({ snackbaropen: true, msg: "Poll created.", not: "success" });
      localStorage.removeItem("pollcreated");
    }
  });

  const slideTransition = (props) => {
    return <Slide {...props} direction="down" />;
  };

  const handleClick = (Transition) => () => {
    setToast({
      snackbaropen: true,
      msg: "Copied to Clipboard!",
      not: "info",
      Transition,
    });
  };

  return (
    <div className="flex-container m-3" style={{ paddingTop: "10px" }}>
      <div className="ui-container py-5 ">
        <div className="bg-white w-75 d-flex flex-column border border-gray mx-auto  rounded-lg shadow-lg">
          <div className="px-5 pt-5 pb-4 ">
            <div className="d-flex flex-column">
              <h5 className="text-primary-dark">The link to your poll is:</h5>

              <div className="d-flex w-100">
                <Notification
                  switcher={toast.snackbaropen}
                  close={snackbarclose}
                  message={toast.msg}
                  nottype={toast.not}
                />

                <CopyToClipboard text={"localhost:3000/poll/?id=" + pollID}>
                  <input
                    type="text"
                    name="lin"
                    id="pollURL"
                    className="w-100 cursor-pointer outline-none py-2 my-3 border px-4 bg-gray-200 text-secondary rounded"
                    readOnly={true}
                    value={"localhost:3000/poll/?id=" + pollID}
                    onClick={handleClick(slideTransition)}
                  />
                </CopyToClipboard>
              </div>
            </div>

            <div className="d-flex flex-column mt-5 py-4 border-top border-gray">
              <h5 className="text-primary-dark ">
                The <span className="font-weight-bold">admin</span> link to
                manage your poll is:
              </h5>

              <div className="d-flex w-100">
                <div className="w-100 position-relative py-2 px-4 my-3 border rounded cursor-pointer">
                  <input
                    type="text"
                    name="lin"
                    id="link"
                    className="w-100 bg-transparent border-0 outline-none"
                    readOnly={true}
                    value={
                      "localhost:3000/poll-admin/?id=" + pollID + "&key=" + key
                    }
                  />
                  <CopyToClipboard
                    text={
                      "localhost:3000/poll-admin/?id=" + pollID + "&key=" + key
                    }
                  >
                    <div
                      className="bg-dark text-white text-center d-flex align-items-center justify-content-center hover-bg-gray font-weight-bold w-30 "
                      style={{ opacity: "0.9" }}
                      onClick={handleClick(slideTransition)}
                    >
                      Click to copy
                    </div>
                  </CopyToClipboard>
                </div>
              </div>

              <p className="text-sm mt-2 d-flex align-items-center text-warning py-1 font-weight-bold">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                &nbsp;Do not share this link with your participants!
              </p>
            </div>
          </div>

          <div className="d-flex px-5 py-4 w-100">
            <div className="ml-auto d-flex align-items-center">
              <a
                className="font-weight-bold border-right border-dark mx-2 pr-4"
                target="_blank"
                href={"/poll/?id=" + pollID}
              >
                Visit your poll
              </a>
              <a
                className="font-weight-bold border-right border-dark mx-2 pr-4"
                target="_blank"
                href={"/poll-admin/?id=" + pollID + "&key=" + key}
              >
                Visit admin page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPollDetails;
