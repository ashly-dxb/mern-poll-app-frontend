import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseURL from "../components/Config";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

// courtesy: https://www.youtube.com/watch?v=sSw91BPsVUQ

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPencilAlt,
  faBook,
  faUser,
  faList,
  faSpinner,
  faRefresh,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

function ListPoll() {
  const [polls, setPolls] = useState([]);
  const [key, setKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    loadList();
  }, []);

  const loadList = () => {
    setIsLoading(true);

    axios
      .get(baseURL + "/polls/listpoll")
      .then(function (response) {
        console.log(response.data);
        setPolls(response.data);

        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);

        setIsLoading(false);
      });
  };

  const ShowDelete = () => (
    <div
      className="w-100 justify-content-center d-flex align-items-center position-fixed fixed-top"
      style={{
        height: "100%",
        zIndex: 1,
        backgroundColor: "rgba(135,206,235,0.7)",
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
              className="border-light rounded-lg shadow-lg px-4 py-2 me-3"
              onClick={() => setShowDelete(false)}
            >
              Cancel
            </button>
            &nbsp;
            <button
              className="bg-danger border-light rounded-lg shadow-lg text-light px-4 py-2 ms-3"
              onClick={deletePoll}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const deletePoll = () => {
    // localStorage.removeItem(
    //   question.toLowerCase().trim().slice(0, 2) + pollID.slice(0, 4)
    // );

    setShowDelete(false);

    axios
      .post(baseURL + "/polls/deletepoll", { key: key })
      .then((response) => {
        console.log("Delete poll:", response);
        if (response.data.success) {
          loadList();
        } else {
          alert("Some error occured while deleting record");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    localStorage.setItem("deletepoll", 0);
  };

  return (
    <div className="flex-container m-3">
      <div className="ui-container py-5 px-2">
        <div className="xxx">
          <div className="">
            <div className="clearfix w-100 border-0 border-black">
              <div className="float-start">
                <h3>Polls List</h3>
              </div>
              <div className="float-end">
                <Link
                  className="rounded-lg shadow-lg me-3"
                  onClick={() => loadList()}
                >
                  <FontAwesomeIcon
                    icon={isLoading ? faSpinner : faRefresh}
                    className="fa-2x spinner"
                    alt="Refresh"
                    title="Refresh"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="d-flex flex-row justify-content-between bg-grey border border-black">
            <div>Left</div>
            <div>Right</div>
          </div> */}

          <div className="d-flex flex-md-row w-100 py-3 fw-bold">
            <div className="flex-column col-4 text-wrap">Poll Question</div>
            <div className="flex-column col-2">Created Date</div>
            <div className="flex-column col-1 mx-5 text-end">Votes</div>
            <div className="flex-column col-1"></div>
            <div className="flex-column col-1"></div>
            <div className="flex-column col-1"></div>
            <div className="flex-column col-1"></div>
          </div>

          {polls.map((poll, index) => {
            return (
              <div
                className="rowStriped d-flex flex-md-row w-100 py-1 my-2 align-items-center border border-secondary rounded"
                key={index}
              >
                {/* <div className="flex-column col-4">{poll.pollID}</div> */}
                <div className="flex-column col-4">{poll.question}</div>
                <div className="flex-column col-2 fs-6">{poll.createdDate}</div>
                <div className="flex-column col-1 fs-5 mx-5 text-end">
                  {poll.totalVotes}
                </div>

                <div className="flex-column col-1">
                  <a
                    aria-label="Do Vote?"
                    href={"/poll/?id=" + poll.pollID}
                    className="p-2 outline-none rounded hover-shadow border-0 bg-transparent"
                    style={{ fontSize: "1.5rem" }}
                    title="Do Vote"
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </a>
                </div>

                <div className="flex-column col-1">
                  <a
                    aria-label="Edit Poll?"
                    href={"/edit-poll/?id=" + poll.pollID + "&key=" + poll._id}
                    className="p-2 outline-none rounded hover-shadow border-0 bg-transparent"
                    style={{ fontSize: "1.5rem" }}
                    title="Edit"
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </a>
                </div>
                <div className="flex-column col-1">
                  <button
                    aria-label={"Delete Poll?"}
                    href={"/edit-poll/?id=" + poll.pollID + "&key=" + poll._id}
                    className="p-2 outline-none rounded hover-shadow text-danger border-0 bg-transparent"
                    style={{ fontSize: "1.5rem" }}
                    title="Delete"
                    onClick={() => {
                      setShowDelete(true);
                      setKey(poll._id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
                <div className="flex-column col-1">
                  <a
                    aria-label="View Results?"
                    href={"/poll-result/?id=" + poll.pollID}
                    className="p-2 outline-none rounded hover-shadow text-success border-0 bg-transparent"
                    style={{ fontSize: "1.5rem" }}
                    title="View Results"
                  >
                    <FontAwesomeIcon icon={faBook} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showDelete ? <ShowDelete /> : null}
    </div>
  );
}

export default ListPoll;
