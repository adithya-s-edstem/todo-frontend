export interface Todo {
  id: number,
  title: string,
  description?: string
  completed: boolean,
  created_at: string
}

export interface FormState {
  title: string,
  description?: string
}

interface SetTitle {
  type: 'SET_TITLE',
  payload: string
}

interface SetDescription {
  type: 'SET_DESCRIPTION',
  payload: string
}

export type FormAction = SetTitle | SetDescription
