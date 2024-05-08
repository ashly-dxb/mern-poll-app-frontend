import { useEffect, useState } from "react";
import baseURL from "../components/Config";
import axios from "axios";
import randomColor from "randomcolor";
import QRCode from "qrcode.react";

import Notification from "./notification";
import SocialShare from "./social-share";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";

function PollResult({ location }) {
  const [pollID, setPollid] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ id: "", options: "", count: 0 }]);
  const [showQR, setShowQR] = useState(false);
  const [localkey, setLocalkey] = useState("");

  let totalvotes = 0;
  options.map((x) => {
    return (totalvotes += x.count);
  });

  const [toast, setToast] = useState({ snackbaropen: false, msg: "", not: "" });

  const snackbarclose = (event) => {
    setToast({
      snackbaropen: false,
    });
  };

  var cache = JSON.parse(localStorage.getItem(localkey));

  useEffect(() => {
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
  }, [question, pollID, cache, localkey]);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    console.log("ID from URL: ", id);

    setPollid(id);

    axios
      .get(baseURL + `/polls/getpoll/${id}`)
      .then(function (response) {
        const data = response.data;
        setQuestion(data.question);

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
      className="bg-success text-decoration-none fw-bold px-2 py-2 rounded-lg text-center text-white "
      href={"/poll-vote/?id=" + pollID}
    >
      Submit your Vote
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
        <div className="mb-5 my-4 ">
          <h2
            className="heading"
            style={{
              wordWrap: "break-word",
            }}
          >
            {question}
          </h2>

          <div className="d-flex w-100 flex-md-row flex-column">
            <div className="d-flex flex-column col-12 col-md-6 col-lg-6">
              <div style={{ position: "relative" }}>
                <div>
                  {options.map((eachOption) => (
                    <div
                      className="py-0 bg-white px-3 rounded-lg shadow-lg position-relative"
                      key={eachOption.id}
                    >
                      <div className="d-flex justify-content-between">
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

                      <div className="rounded-lg ">
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
      {showQR ? <QR /> : null}
    </div>
  );
}

export default PollResult;
