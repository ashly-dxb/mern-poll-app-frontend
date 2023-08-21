import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "../components/Config";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Notification from "./notification";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBolt,
  faTrashAlt,
  faSpider,
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function CreatePoll() {
  const navigate = useNavigate();
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
    msg: "",
    not: "",
    Transition: Slide,
  });

  const snackbarclose = (event) => {
    setToast({
      snackbaropen: false,
    });
  };

  const showError = (value, error) => value.trim().length === 0 && error;

  useEffect(() => {
    if (localStorage.getItem("deletepoll") == 0) {
      setToast({ snackbaropen: true, msg: "Poll deleted!", not: "success" });
      localStorage.removeItem("deletepoll");
    }
  }, [setToast]);

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
          } else return object;
        })
      );
    } else {
      const data = { question: questions, options: inputFields };

      axios
        .post(baseURL + "/polls/createpoll", data)
        .then(function (response) {
          handleClick(slideTransition);
          //   history.push(`/new-poll-details/?id=${questions.id}`);
          navigate(`/new-poll-details/?id=${questions.id}`);
        })
        .catch(function (error) {
          console.log(error);
        });

      localStorage.setItem("pollcreated", 0);
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

    setToast({ snackbaropen: true, msg: "Added another field!", not: "info" });
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
    setToast({
      snackbaropen: true,
      msg: "Success! Poll submitted",
      not: "success",
      Transition,
    });
  };

  return (
    <div className="flex-container m-3" style={{ paddingTop: "10px" }}>
      <div className="ui-container py-5 px-5">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="xxxx">
            <div className="d-flex justify-content-between flex-column flex-md-row align-items-baseline">
              <div>
                <h3>Create Poll</h3>
                <p className="mt-4 mb-0 text-large text-secondary font-medium">
                  Fill the below form to create a poll
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="d-flex flex-column ">
                <label className="mb-3 w-100 font-weight-bold content-text">
                  Poll Question
                </label>
                <TextField
                  {...(showError(questions.question, questions.error) && {
                    ...{
                      error: questions.error,
                      helperText: "Enter the question",
                    },
                  })}
                  id={questions.id}
                  name="question"
                  multiline={true}
                  minRows={3}
                  autoFocus={true}
                  className=" w-100 py-4 bg-light rounded-lg px-3 outline-none  border border-gray "
                  placeholder="Ex: What's your favorite TV show?"
                  value={questions.question}
                  onChange={(event) => handleQuestion(questions.id, event)}
                />
              </div>

              <Notification
                switcher={toast.snackbaropen}
                close={snackbarclose}
                message={toast.msg}
                nottype={toast.not}
              />

              {inputFields.map((inputField, index) => (
                <div className="options mt-2 flex-column " key={inputField.id}>
                  <div className=" mb-3">
                    <div className="d-flex flex-column">
                      <label className="mb-3 w-100 content-text font-weight-bold">
                        Option {index + 1}
                      </label>
                      <div className="">
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
                          className=" py-3 rounded-lg px-3 bg-light inputfield focus-shadow  focus-outline-none  border "
                          placeholder={"Option" + (index + 1)}
                          value={inputField.options}
                          onChange={(event) =>
                            handleChangeInput(inputField.id, event)
                          }
                        />

                        <button
                          hidden={inputFields.length === 2}
                          onClick={() => handleRemoveFields(inputField.id)}
                          className=" delete ml-2 border-0 mx-2"
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
                <span className="mr-3">
                  <FontAwesomeIcon className="ml-2" icon={faPlus} />
                  Add another option&nbsp;
                </span>
              </button>
            </div>

            <div className="mt-5 pt-3">
              <button
                type="submit"
                className="px-5 py-3 bg-success text-white font-weight-bold border-0 rounded-lg"
              >
                <FontAwesomeIcon className="mr-2" icon={faBolt} />
                &nbsp;Create Poll
              </button>
            </div>
          </div>
        </form>
      </div>

      <p
        className="text-center font-weight-bold"
        style={{ fontSize: "1.3rem", color: "skyblue" }}
      >
        END OF PAGE
      </p>
    </div>
  );
}

export default CreatePoll;
