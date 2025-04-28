import { useReducer } from "react";
import { FormAction, FormState } from "../types";
import { useAddTodoMutation } from "../services/todoApi";
import Button from "./Button";
import TextInput from "./TextInput";
import TextArea from "./TextArea";

interface TodoFormProps {
  handleClose: () => void
}

function TodoForm({ handleClose }: TodoFormProps) {
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

  const [addTodo, { isLoading, isSuccess }] = useAddTodoMutation();

  async function handleAddTodo(): Promise<void> {
    try {
      await addTodo(formState).unwrap()
      handleClose()
    } catch (error) {
      console.error("Failed to add todo: ", error)
    } finally {
      if (isSuccess) {
        formDispatch({ type: "SET_TITLE", payload: '' })
        formDispatch({ type: "SET_DESCRIPTION", payload: '' })
      }
    }
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        void handleAddTodo()
      }}
      className="flex flex-col gap-3 w-1/3 shadow rounded-md p-4"
    >
      <TextInput
        placeholder="Title"
        value={formState.title}
        onChange={(value) => { formDispatch({ type: "SET_TITLE", payload: value }); }}
        disabled={isLoading}
        label="Title"
      />
      <TextArea
        placeholder="Description"
        value={formState.description ?? ""}
        onChange={(value) => { formDispatch({ type: "SET_DESCRIPTION", payload: value }); }}
        disabled={isLoading}
        label="Description"
      />
      <div className="flex items-center gap-4">
        <Button type="submit" label="Add Todo" busy={isLoading} />
        <Button type="button" label="Cancel" onClick={handleClose} red />
      </div>
    </form>
  )
}

export default TodoForm;
