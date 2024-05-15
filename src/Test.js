import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// This demonstrates a test API call to Laravel API(using project: C:\xampp_2\htdocs\MyLaravelProject)
function TestAPI() {
  const [data, setData] = useState();

  axios.defaults.withCredentials = false;

  useEffect(() => {
    console.log("Loading Laravel API");
    axios
      .get("http://localhost:8000/api/blogs/2")
      .then((result) => {
        if (result.data) {
          setData(result.data.data);
        } else {
          console.log("error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return data ? (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-5">
        <div>ID: {data.id}</div>
        <div>Title: {data.title}</div>
        <div>Body: {data.body}</div>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-5">
        <div>Empty !!</div>
      </div>
    </div>
  );
}

export default TestAPI;
