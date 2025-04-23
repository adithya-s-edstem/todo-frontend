import { useReducer, useState } from "react";
import { useAddTodoMutation, useDeleteAllTodosMutation, useDeleteTodoMutation, useGetAllTodosQuery, useUpdateTodoMutation } from "./services/todoApi";
import { FormAction, FormState, Todo } from "./types";

function App() {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [addingTodo, setAddingTodo] = useState<boolean>(false);

  function formReducer(state: FormState, action: FormAction) {
    switch (action.type) {
      case 'SET_TITLE': {
        return {
          ...state,
          title: action.payload
        }
      }
      case 'SET_DESCRIPTION': {
        return {
          ...state,
          description: action.payload
        }
      }
    }
  }

  const [formState, formDispatch] = useReducer(formReducer, { title: "", description: "" })

  const { data, isLoading } = useGetAllTodosQuery();

  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [addTodo, { isSuccess }] = useAddTodoMutation();
  const [deleteAllTodos] = useDeleteAllTodosMutation();

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

  async function handleUpdateTodo(id: number, data: Partial<Todo>) {
    setUpdatingId(id);
    try {
      await updateTodo({ id, data }).unwrap()
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleAddTodo() {
    setAddingTodo(true)
    try {
      await addTodo(formState).unwrap()
    } catch (error) {
      console.error("Failed to add todo: ", error)
    } finally {
      if (isSuccess) {
        formDispatch({ type: "SET_TITLE", payload: '' })
        formDispatch({ type: "SET_DESCRIPTION", payload: '' })
      }
      setAddingTodo(false)
    }
  }

  async function handleDeleteAll() {
    try {
      await deleteAllTodos().unwrap()
    } catch (error) {
      console.error("Failed to delete all todos: ", error)
    }
  }

  const Loader = () => <div className="w-6 h-6 border-t border-r animate-spin rounded-full" />

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAddTodo()
        }}
        className="flex flex-row gap-2"
      >
        <input type="text" placeholder="Title" value={formState.title} onChange={(e) => formDispatch({ type: "SET_TITLE", payload: e.target.value })} disabled={addingTodo} />
        <input type="text" placeholder="Description" value={formState.description} onChange={(e) => formDispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })} disabled={addingTodo} />
        <input type="submit" value="Add Todo" />
      </form>
      <button onClick={handleDeleteAll}>Delete All</button>
      <div className="flex flex-col gap-2">
        {isLoading && "Loading.."}
        {data?.map(todo => (
          <div key={todo.id} className="flex flex-col gap-1 border w-1/5 oveflow-scroll items-center">
            <span>id: {todo.id}</span>
            <span>title: {todo.title}</span>
            <span>created_at: {new Date(todo.created_at)?.toString()}</span>
            <span>description: {todo.description}</span>
            <span>completed: {todo.completed?.toString()}</span>
            {updatingId === todo.id ? (
              <Loader />
            ) : (
              <input type="checkbox" checked={todo.completed} readOnly onClick={() => handleUpdateTodo(todo.id, { completed: !todo.completed })} />
            )}
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
    </div>
  )
}

export default App;
