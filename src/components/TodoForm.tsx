import { useReducer, useState } from "react";
import { FormAction, FormState } from "../types";
import { useAddTodoMutation } from "../services/todoApi";

function TodoForm() {
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

  const [addTodo, { isSuccess }] = useAddTodoMutation();

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
  return (
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
  )
}

export default TodoForm;
