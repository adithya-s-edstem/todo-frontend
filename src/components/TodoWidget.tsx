import { useState } from "react";
import { Todo } from "../types";
import Loader from "./Loader";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../services/todoApi";

type TodoProps = {
  todo: Todo
}

function TodoWidget({ todo }: TodoProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  async function handleDelete(id: number): Promise<void> {
    setIsDeleting(true);
    try {
      await deleteTodo(id).unwrap();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleUpdateTodo(id: number, data: Partial<Todo>): Promise<void> {
    setIsUpdating(true);
    try {
      await updateTodo({ id, data }).unwrap()
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="flex flex-col gap-1 border items-center p-2 rounded-md">

      <div className="border font-mono p-1 flex flex-col gap-1">
        <span>id: {todo.id}</span>
        <span>title: {todo.title}</span>
        <span>created_at: {new Date(todo.created_at)?.toString()}</span>
        <span>description: {todo.description}</span>
        <span>completed: {todo.completed?.toString()}</span>
      </div>
      {isUpdating ? (
        <Loader />
      ) : (
        <input type="checkbox" checked={todo.completed} readOnly onClick={() => handleUpdateTodo(todo.id, { completed: !todo.completed })} />
      )}
      <button
        type="button"
        onClick={() => handleDelete(todo.id)}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  )
}

export default TodoWidget;
