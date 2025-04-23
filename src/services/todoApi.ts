import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../types";

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DATABASE_URL
  }),
  tagTypes: ['Todos'],
  endpoints: (build) => ({
    getAllTodos: build.query<Todo[], void>({
      query: () => '/',
      providesTags: ['Todos']
    }),
    addTodo: build.mutation({
      query: (data) => ({
        url: '/add',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(newTodo, { dispatch, queryFulfilled }) {
        const tempId = Date.now();
        const patchResult = dispatch(
          todoApi.util.updateQueryData(
            'getAllTodos',
            undefined,
            (draft) => {
              draft.unshift({ ...newTodo, id: tempId })
            }
          )
        )
        try {
          const { data: addedTodo } = await queryFulfilled
          dispatch(
            todoApi.util.updateQueryData(
              'getAllTodos',
              undefined,
              (draft) => {
                const index = draft.findIndex(todo => todo.id === tempId)
                if (index !== -1) {
                  draft[index] = addedTodo
                } else {
                  draft.unshift(addedTodo)
                }
              }
            )
          )
        } catch {
          patchResult.undo()
        }
      }
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE'
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData(
            'getAllTodos',
            undefined,
            (draft) => {
              const index = draft.findIndex(todo => todo.id === id)
              if (index !== -1) {
                draft.splice(index, 1)
              }
            }
          )
        )
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),
    updateTodo: build.mutation({
      query: ({ id, data }) => ({
        url: `/update/${id}`,
        method: 'PUT',
        body: data
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData(
            'getAllTodos',
            undefined,
            (draft) => {
              const index = draft.findIndex((todo) => todo.id === id);
              if (index !== -1) {
                draft[index] = { ...draft[index], ...data }
              }
            }
          )
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo();
        }
      }
    }),
    deleteAllTodos: build.mutation<void, void>({
      query: () => ({
        url: '/delete/all',
        method: 'DELETE'
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData(
            'getAllTodos',
            undefined,
            (draft) => {
              draft.splice(0)
            }
          )
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo();
        }
      }
    })
  })
})

export const { useGetAllTodosQuery, useDeleteTodoMutation, useUpdateTodoMutation, useAddTodoMutation, useDeleteAllTodosMutation } = todoApi