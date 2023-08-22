import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex-container m-3">
      <div className="ui-container py-5 px-2">
        <div>
          <h4>Oops! The path is not found.</h4>
          <ul className="list-unorderd">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tasks">Taks</Link>
            </li>
            <li>
              <Link to="/polls">Polls</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
