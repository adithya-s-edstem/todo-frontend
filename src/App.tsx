import { useState } from "react";
import { useDeleteTodoMutation, useGetAllTodosQuery } from "./services/todoApi";

function App() {

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data, isLoading, isFetching } = useGetAllTodosQuery();

  const [deleteTodo] = useDeleteTodoMutation();

  async function handleDelete(id: number) {
    setDeletingId(id);
    try {
      await deleteTodo(id).unwrap();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {isLoading && "Loading.."}
      {isFetching && "Updating.."}
      {data?.map(todo => (
        <div key={todo.id} className="flex flex-col gap-1 border max-w-1/5">
          <h3>{`${todo.id}, ${todo.title}`}</h3>
          <p>{todo.description || "No description"}</p>
          <input type="checkbox" checked={todo.completed} readOnly />
          <button
            type="button"
            onClick={() => handleDelete(todo.id)}
            disabled={deletingId === todo.id}
          >
            {deletingId === todo.id ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}
    </div>
  )
}

export default App;
