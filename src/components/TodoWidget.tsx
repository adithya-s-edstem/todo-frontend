import { useState } from "react";
import { Todo } from "../types";
import Loader from "./Loader";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../services/todoApi";
import Button from "./Button";
import formatDate from "../utils/formatDate";

type TodoProps = {
  todo: Todo
}

function TodoWidget({ todo }: TodoProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  async function handleDelete(id: number): Promise<void> {
    try {
      await deleteTodo(id).unwrap();
    } catch (error) {
      console.error("Delete failed:", error);
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
    <div className="flex flex-col gap-1 shadow border border-gray-300 items-center p-2 rounded-md hover:shadow-xl transition">
      <div className="overflow-y-auto text-wrap break-all h-40 w-full flex flex-col gap-1 ">
        <span>id: {todo.id}</span>
        <span>title: {todo.title}</span>
        <span>created_at: {formatDate(todo.created_at)}</span>
        <span>description: {todo.description}</span>
        <span>completed: {todo.completed?.toString()}</span>
      </div>
      <div className="flex justify-between items-center w-full">
        {isUpdating ? (
          <Loader />
        ) : (
          <input type="checkbox" checked={todo.completed} readOnly onClick={() => handleUpdateTodo(todo.id, { completed: !todo.completed })} />
        )}
        {isDeleting ? (
          <div className="flex items-center gap-2">
            <Button type="button" onClick={() => handleDelete(todo.id)} label="Yes" red />
            <Button type="button" onClick={() => setIsDeleting(false)} label="No" />
          </div>
        ) : (
          <Button
            type="button"
            onClick={() => setIsDeleting(true)}
            label="Delete"
          />
        )}
      </div>
    </div>
  )
}

export default TodoWidget;
