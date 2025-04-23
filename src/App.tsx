import { useDeleteAllTodosMutation, useGetAllTodosQuery } from "./services/todoApi";
import TodoForm from "./components/TodoForm";
import TodoWidget from "./components/TodoWidget";

function App() {
  const { data, isLoading } = useGetAllTodosQuery();

  const [deleteAllTodos] = useDeleteAllTodosMutation();

  async function handleDeleteAll(): Promise<void> {
    try {
      await deleteAllTodos().unwrap()
    } catch (error) {
      console.error("Failed to delete all todos: ", error)
    }
  }

  return (
    <div className="flex flex-col gap-4 min-h-screen p-4">
      <TodoForm />
      <button onClick={handleDeleteAll}>Delete All</button>
      <div className="grid grid-cols-4 gap-4">
        {isLoading && "Loading.."}
        {data?.map(todo => (
          <TodoWidget
            key={todo.id}
            todo={todo}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
