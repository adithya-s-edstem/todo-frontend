import { useDeleteAllTodosMutation, useGetAllTodosQuery } from "./services/todoApi";
import TodoForm from "./components/TodoForm";
import TodoWidget from "./components/TodoWidget";
import Button from "./components/Button";

function App() {
  const { data, isLoading } = useGetAllTodosQuery();

  const [deleteAllTodos, { isLoading: isDeleting }] = useDeleteAllTodosMutation();

  async function handleDeleteAll(): Promise<void> {
    try {
      await deleteAllTodos().unwrap()
    } catch (error) {
      console.error("Failed to delete all todos: ", error)
    }
  }

  const deleteAllDisabled = !data || data?.length < 1

  return (
    <div className="flex flex-col gap-4 min-h-screen p-4 text-sm">
      <TodoForm />
      <Button type="button" label="Delete All" onClick={handleDeleteAll} disabled={deleteAllDisabled} busy={isDeleting} red />
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
