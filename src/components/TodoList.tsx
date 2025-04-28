import { useDeleteAllTodosMutation, useGetAllTodosQuery } from "../services/todoApi";
import Button from "./Button";
import TodoWidget from "./TodoWidget";

function TodoList() {
  const { data, isLoading } = useGetAllTodosQuery(undefined);

  const [deleteAllTodos, { isLoading: isDeleting }] = useDeleteAllTodosMutation();

  async function handleDeleteAll(): Promise<void> {
    try {
      await deleteAllTodos(undefined).unwrap()
    } catch (error) {
      console.error("Failed to delete all todos: ", error)
    }
  }

  const deleteAllDisabled = !data || data.length < 1

  return (
    <div className="flex flex-col items-center gap-4">
      <Button type="button" label="Delete All" onClick={() => { void handleDeleteAll(); }} disabled={deleteAllDisabled} busy={isDeleting} red />
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

export default TodoList;
