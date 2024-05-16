import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "../components/Config";
import axios from "axios";
import randomColor from "randomcolor";
import QRCode from "qrcode.react";

import Notification from "./notification";
import SocialShare from "./social-share";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";

function PollAdmin({ location }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ id: "", options: "", count: 0 }]);
  const [key, setKey] = useState("");
  const [pollID, setPollID] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [localkey, setLocalkey] = useState("");

  let totalvotes = 0;
  options.map((x) => {
    return (totalvotes += x.count);
  });

  const navigate = useNavigate();

  const [toast, setToast] = useState({
    snackbaropen: false,
    msg: "",
    not: "",
  });

  const snackbarclose = (event) => {
    setToast({
      snackbaropen: false,
    });
  };

  var cache = JSON.parse(localStorage.getItem(localkey));

  useEffect(() => {
    console.log("question:", question);
    setLocalkey(question.toLowerCase().trim().slice(0, 2) + pollID.slice(0, 4));

    if (cache != null && cache.id === pollID && cache.show === 0) {
      setToast({
        snackbaropen: true,
        msg: "Thank you for voting!",
        not: "success",
      });

      localStorage.setItem(
        localkey,
        JSON.stringify({ id: cache.id, selected: cache.selected, show: 1 })
      );
    }

    if (localStorage.getItem("polledited") == 0) {
      setToast({ snackbaropen: true, msg: "Changes saved!", not: "success" });
      localStorage.removeItem("polledited");
    }
  }, []);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    const key = new URLSearchParams(window.location.search).get("key");

    setPollID(id);
    setKey(key);

    axios
      .get(baseURL + `/polls/details/${id}`)
      .then(function (response) {
        const data = response.data;
        setQuestion(data.question);
        console.log("Setting from GET poll", data.question);

        let medium = [];
        data.options.map((option) => {
          medium.push(option);
          return medium;
        });

        setOptions(medium);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const deletePoll = () => {
    localStorage.removeItem(
      question.toLowerCase().trim().slice(0, 2) + pollID.slice(0, 4)
    );

    axios
      .delete(baseURL + "/polls/delete/" + key)
      .then((res) => {
        console.log("Delete poll:", res);
      })
      .catch((err) => {
        console.log(err);
      });

    localStorage.setItem("deletepoll", 0);
    navigate("/");
  };

  const ShowDelete = () => (
    <div
      className="w-100 justify-content-center d-flex align-items-center position-fixed fixed-top"
      style={{
        height: "100%",
        zIndex: 1,
        backgroundColor: "rgba(135,206,235 ,0.7)",
      }}
    >
      <div
        className="d-flex flex-column align-items-center bg-white rounded-lg"
        style={{ width: "30%" }}
      >
        <div className="w-100 d-flex flex-column px-4 pt-4">
          <h5>Delete Poll</h5>
          <span className="text-secondary">
            Are you sure you want to delete the poll?
          </span>

          <div className="px-3 py-3 d-flex justify-content-end">
            <button
              className="border-light rounded-lg shadow-lg px-4 py-2 "
              onClick={() => setShowDelete(false)}
            >
              Cancel
            </button>
            <button
              className="bg-danger border-0 rounded-lg shadow-lg text-light px-4 py-2 ml-3"
              onClick={deletePoll}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const QR = () => (
    <div
      className="w-100 justify-content-center d-flex align-items-center position-fixed fixed-top"
      onClick={() => {
        setShowQR(false);
      }}
      style={{
        height: "100%",
        zIndex: 1,
        backgroundColor: "rgba(135,206,235 ,0.7)",
      }}
    >
      <div className="d-flex flex-column align-items-center bg-white">
        <span className="fw-bold ">Scan QR Code</span>
        <QRCode
          value={`http://localhost:3000/poll-vote/?id=${pollID}`}
          size={290}
          level={"H"}
          includeMargin={true}
        />
      </div>
    </div>
  );

  const ShowButton = () => (
    <a
      className="bg-success text-decoration-none fw-bold mb-5 px-2 py-4 rounded-lg text-center text-white "
      href={"/poll-vote/?id=" + pollID}
    >
      Submit your vote
    </a>
  );

  const ShowSelection = () => (
    <span
      className="bg-info w-100 text-decoration-none fw-bold mb-5 px-2 py-3 rounded-lg text-center text-white "
      style={{
        wordWrap: "break-word",
      }}
    >
      You voted for {cache.selected}
    </span>
  );

  return (
    <div className="flex-container m-3">
      <div className="ui-container py-5 px-2">
        <div className="d-flex flex-row ">
          <h2 className="heading-2">Manage Poll</h2>
        </div>
        <div className="d-flex flex-row ">
          <div className="d-flex flex-column mb-4 me-4 mb-md-0 border">
            <p className="mt-4 mb-0 text-large text-secondary font-medium">
              Poll can be modified, if it has no votes!
            </p>
          </div>

          <div className="d-flex flex-column me-4 mb-md-0 border">
            {totalvotes === 0 ? (
              <a
                aria-label="Edit Poll?"
                href={"/edit-poll/?id=" + pollID + "&key=" + key}
                className="text-dark outline-none rounded hover-shadow text-warning border-0 bg-transparent p-3"
                // style={{ fontSize: "1.5rem" }}
                title="Modify"
                style={{ border: "1px solid red" }}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </a>
            ) : null}
          </div>

          <div className="d-flex flex-column me-4 mb-md-0 border">
            <button
              aria-label={"Delete Poll?"}
              role="alert"
              className="text-dark outline-none rounded hover-shadow text-danger border-0 bg-transparent p-3"
              // style={{ fontSize: "1.5rem" }}
              title="Delete"
              onClick={() => setShowDelete(true)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>

        <div className="mb-5 mb-md-5 pb-md-0 my-4">
          <h2
            className="mb-5 heading"
            style={{
              wordWrap: "break-word",
            }}
          >
            {question}
          </h2>

          <div className="d-flex w-100 flex-md-row flex-column ">
            <div className="d-flex flex-column col-12 col-md-6 col-lg-6">
              <div style={{ position: "relative" }}>
                <div>
                  {options.map((eachOption, index) => (
                    <div
                      className="py-0 bg-white px-3 rounded-lg shadow-lg position-relative"
                      key={index}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <div
                          className="d-flex align-items-center mt-2"
                          style={{ width: "88%" }}
                        >
                          <h4
                            className=" fw-bold text-dark"
                            style={{
                              wordWrap: "break-word",
                              width: "80%",
                            }}
                          >
                            {eachOption.options}
                          </h4>
                        </div>

                        <div className="d-flex align-items-center mt-2">
                          <h4 className="fw-bold text-dark">
                            {totalvotes === 0
                              ? 0
                              : ((eachOption.count / totalvotes) * 100).toFixed(
                                  0
                                )}
                            %
                          </h4>
                        </div>
                      </div>

                      <div className="rounded-lg">
                        <div
                          className="rounded-lg d-block mt-3"
                          style={{
                            width: `${
                              totalvotes === 0
                                ? 0
                                : (eachOption.count / totalvotes) * 100
                            }%`,
                            height: "0.5rem",
                            backgroundColor: `${randomColor()}`,
                          }}
                        >
                          &nbsp;
                        </div>
                      </div>
                      <p className="mt-3 text-green">
                        {eachOption.count} Votes
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="d-flex flex-column col-12 col-md-6 col-lg-6 mx-3 mb-0 rounded-lg ">
              <Notification
                switcher={toast.snackbaropen}
                close={snackbarclose}
                message={toast.msg}
                nottype={toast.not}
              />
              {cache != null ? (
                cache.id === pollID ? (
                  <ShowSelection />
                ) : (
                  <ShowButton />
                )
              ) : (
                <ShowButton />
              )}

              <div className="w-100 bg-white d-flex flex-column border-gray-300 border-top-0 rounded-lg self-start px-3 py-3 ">
                <div className="d-flex flex-column justify-content-between">
                  <div className="">
                    <p className="fw-normal text-secondary text-left mb-0 text-sm lg:text-base">
                      Total Votes
                    </p>
                    <h3 className="fw-bold text-dark">{totalvotes}</h3>
                  </div>

                  <div className="d-flex flex-row flex-column">
                    <p className="fw-bold d-md-inline-block mt-2 mb-4 text-primary-secondary text-left">
                      Share
                    </p>

                    <button
                      className="bg-warning fw-bold mb-4 px-0 py-2 rounded-lg text-center border-0 text-white me-3 "
                      onClick={() => {
                        setShowQR(true);
                      }}
                    >
                      <FontAwesomeIcon className="ms-3 me-3" icon={faQrcode} />
                      &nbsp;
                      <span className="d-md-inline-block ">
                        Share via QRcode
                      </span>
                    </button>

                    <SocialShare
                      url={"http://localhost:3000/poll-vote/?id=" + pollID}
                      question={question}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDelete ? <ShowDelete /> : null}
      {showQR ? <QR /> : null}
    </div>
  );
}

export default PollAdmin;
