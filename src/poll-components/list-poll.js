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
  faSpinner,
  faRefresh,
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
        setPolls(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
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
    setShowDelete(false);

    axios
      .post(baseURL + "/polls/deletepoll", { key: key })
      .then((response) => {
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
        <div className="clearfix w-100 border-0 border-black headerStrip">
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

        <div className="d-flex flex-md-row w-100 py-3 fw-bold">
          <div className="flex-column col-4 text-wrap">Question</div>
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
              className="rowStriped d-flex flex-md-row w-100 my-2 align-items-center border border-secondary"
              key={index}
            >
              {/* <div className="flex-column col-4">{poll.pollID}</div> */}
              <div className="flex-column col-4 xxxx">{poll.question}</div>
              <div className="flex-column col-2 xxxx">{poll.createdDate}</div>
              <div className="flex-column col-1 xxxx mx-5 text-end">
                {poll.totalVotes}
              </div>

              <div className="flex-column col-1">
                <Link
                  to={"/poll-vote/?id=" + poll.pollID}
                  className="p-2 outline-none rounded hover-shadow border-0 bg-transparent"
                  title="Do Vote"
                  aria-label="Do Vote?"
                >
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </div>

              <div className="flex-column col-1">
                <Link
                  to={"/edit-poll/?id=" + poll.pollID + "&key=" + poll._id}
                  className="p-2 outline-none rounded hover-shadow border-0 bg-transparent"
                  title="Edit"
                  aria-label="Edit Poll"
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Link>
              </div>

              <div className="flex-column col-1">
                <button
                  className="p-2 outline-none rounded hover-shadow text-danger border-0 bg-transparent"
                  title="Delete"
                  aria-label={"Delete Poll?"}
                  onClick={() => {
                    setShowDelete(true);
                    setKey(poll._id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>

              <div className="flex-column col-1">
                <Link
                  to={"/poll-result/?id=" + poll.pollID}
                  className="p-2 outline-none rounded hover-shadow text-success border-0 bg-transparent"
                  title="View Results"
                  aria-label="View Results?"
                >
                  <FontAwesomeIcon icon={faBook} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {showDelete ? <ShowDelete /> : null}
    </div>
  );
}

export default ListPoll;
