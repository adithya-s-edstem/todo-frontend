import { useReducer, useState } from "react";
import { FormAction, FormState } from "../types";
import { useAddTodoMutation } from "../services/todoApi";
import Button from "./Button";
import TextInput from "./TextInput";
import TextArea from "./TextArea";

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
      className="flex flex-col gap-2 w-1/3"
    >
      <TextInput
        placeholder="Title"
        value={formState.title}
        onChange={(value) => formDispatch({ type: "SET_TITLE", payload: value })}
        disabled={addingTodo}
      />
      <TextArea
        placeholder="Description"
        value={formState.description || ""}
        onChange={(value) => formDispatch({ type: "SET_DESCRIPTION", payload: value })}
        disabled={addingTodo}
      />
      <Button type="submit" label="Add Todo" busy={addingTodo} />
    </form>
  )
}

export default TodoForm;
