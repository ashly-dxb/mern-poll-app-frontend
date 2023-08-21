import { useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Todos2 from "./Todos2";

function Temp2() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "New Todo"]);
  }, [todos]);

  return (
    <div className="flex-container m-3 p-5">
      <Todos2 todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

export default Temp2;
