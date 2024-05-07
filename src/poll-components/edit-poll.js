import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "../components/Config";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBookmark,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function EditPoll({ location }) {
  const navigate = useNavigate();

  const [pollID, setPollID] = useState("");
  const [key, setKey] = useState("");
  const [questions, setQuestion] = useState({
    id: uuidv4(),
    question: "",
    error: false,
  });

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), options: "", error: false },
    { id: uuidv4(), options: "", error: false },
  ]);

  const [toast, setToast] = useState({
    snackbaropen: false,
    snackbar2open: false,
    Transition: Slide,
  });

  useEffect(() => {
    // var x = queryString.parse(location.search);
    // const id = x.id;

    const id = new URLSearchParams(window.location.search).get("id");
    const key = new URLSearchParams(window.location.search).get("key");

    setPollID(id);
    setKey(key);

    axios
      .get(baseURL + `/polls/getpoll/${id}`)
      .then(function (response) {
        const data = response.data;
        console.log("getpoll resp:", data);
        // console.log("question ===:", data.question);

        setQuestion({ question: data.question });

        let medium = [];
        data.options.map((option) => {
          medium.push(option);
          return medium;
        });

        setInputFields(medium);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const snackbarclose = (event) => {
    setToast({
      snackbaropen: false,
      snackbar2open: false,
    });
  };

  const showError = (value, error) => value.trim().length === 0 && error;

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyQuestion = questions.question.trim().length > 0;
    const emptyOptions = inputFields.every((obj) => {
      return obj.options.length > 0;
    });

    if (!emptyQuestion) {
      setQuestion({ ...questions, error: true });
    }

    if (!emptyOptions) {
      setInputFields(
        [...inputFields].map((object) => {
          if (object.options === "") {
            return {
              ...object,
              error: true,
            };
          } else {
            return object;
          }
        })
      );
    } else {
      const data = {
        question: questions,
        options: inputFields,
        pollID: pollID,
      };

      axios
        .post(baseURL + "/polls/editpoll", data)
        .then(function (response) {
          console.log("Poll ID:", response.data._id);
        })
        .catch(function (error) {
          console.log(error);
        });

      localStorage.setItem("polledited", 0);
      navigate(`/poll-admin/?id=${pollID}&key=${key}`); // todo later
    }
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setInputFields(newInputFields);
  };

  const handleQuestion = (id, event) => {
    setQuestion({ id: id, question: event.target.value });
  };

  const handleAddfields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), options: "", error: false },
    ]);
    setToast({ snackbar2open: true });
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const slideTransition = (props) => {
    return <Slide {...props} direction="down" />;
  };

  const handleClick = (Transition) => () => {
    setToast({ snackbaropen: true, Transition });
  };

  return (
    <div className="flex-container m-3">
      <div className="ui-container py-5 px-2">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mx-auto">
            <div className="d-flex justify-content-between flex-column flex-md-row align-items-baseline">
              <div>
                <h3>Edit Poll</h3>
                <p className="mt-4 mb-0 text-large text-secondary font-medium">
                  Edit below fields as you need.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-column question">
                <label className="mb-3 w-100 fw-bold content-text">
                  Poll Question
                </label>
                <TextField
                  {...(showError(questions.question, questions.error) && {
                    ...{
                      error: questions.error,
                      helperText: "Enter the question.",
                    },
                  })}
                  id={questions.id}
                  name="question"
                  multiline={true}
                  minRows={3}
                  className="textareastyle w-100 py-4 rounded-lg px-3 outline-none  border border-gray "
                  placeholder="Ex: What's your favorite TV show?"
                  defaultValue={questions.question}
                  onChange={(event) => handleQuestion(questions.id, event)}
                />
              </div>
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={toast.snackbaropen}
                onClose={snackbarclose}
                autoHideDuration={2000}
                TransitionComponent={toast.Transition}
                key={toast.Transition}
                action={[
                  <IconButton
                    arial-label="Close"
                    color="inherit"
                    onClick={snackbarclose}
                  >
                    x
                  </IconButton>,
                ]}
              >
                <MuiAlert onClose={snackbarclose} severity="success">
                  Successfully Updated!
                </MuiAlert>
              </Snackbar>

              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={toast.snackbar2open}
                onClose={snackbarclose}
                autoHideDuration={2000}
                action={[
                  <IconButton
                    arial-label="Close"
                    color="inherit"
                    onClick={snackbarclose}
                  >
                    x
                  </IconButton>,
                ]}
              >
                <MuiAlert onClose={snackbarclose} severity="info">
                  Option field added!
                </MuiAlert>
              </Snackbar>

              {inputFields.map((inputField, index) => (
                <div className="options mt-2 flex-column" key={inputField.id}>
                  <div className="flex align-items-center mb-3">
                    <div className="flex flex-column">
                      <label className="mb-3 w-100 content-text fw-bold">
                        Option {index + 1}
                      </label>
                      <div className="flex align-items-center justify-content-between">
                        <TextField
                          {...(showError(
                            inputField.options,
                            inputField.error
                          ) && {
                            ...{
                              error: inputField.error,
                              helperText: "Enter atleast 2 options",
                            },
                          })}
                          id={inputField.id}
                          name="options"
                          className=" py-3 rounded-lg px-3 textareastyle inputfield focus-shadow transition-all duration-200 text-gray-700 focus-outline-none  border border-gray-300 focus:shadow-outline"
                          placeholder={"Option" + (index + 1)}
                          value={inputField.options}
                          onChange={(event) =>
                            handleChangeInput(inputField.id, event)
                          }
                        />
                        <button
                          hidden={inputFields.length === 2}
                          onClick={() => handleRemoveFields(inputField.id)}
                          className="delete border-0 mx-2"
                          title="Delete"
                        >
                          <FontAwesomeIcon
                            className=" text-danger"
                            icon={faTrashAlt}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddfields}
                className="px-2 py-2 bg-dark text-white"
              >
                <span className="me-3">
                  Add another option&nbsp;
                  <FontAwesomeIcon className="ms-2" icon={faPlus} />
                </span>
              </button>
            </div>

            <div className="flex justify-content-center mt-2 pt-1">
              <button
                type="submit"
                className="bg-success text-white fw-bold border-0 rounded-lg px-3 py-3"
              >
                <FontAwesomeIcon className="me-2" icon={faBookmark} />
                &nbsp; Save Poll
              </button>
              &nbsp;&nbsp;
              <Link
                to={"/poll-admin/?id=" + pollID + "&key=" + key}
                className="text-decoration-none"
              >
                <span className="bg-danger text-light fw-bold border-0 rounded-lg px-4 py-3">
                  Cancel
                </span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPoll;
