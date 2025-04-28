import TodoForm from "./components/TodoForm";
import Button from "./components/Button";
import { useState } from "react";
import HomeLayout from "./layouts/home";
import TodoList from "./components/TodoList";

function App() {
  const [addingTodo, setAddingTodo] = useState<boolean>(false);

  return (
    <HomeLayout>
      <div className="flex flex-col items-center gap-4">
        {addingTodo
          ? <TodoForm handleClose={() => { setAddingTodo(false); }} />
          : <Button type="button" label="New Todo" onClick={() => { setAddingTodo(true); }} />
        }
        <TodoList />
      </div>
    </HomeLayout>
  )
}

export default App;
