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
    createTodo: build.query({
      query: () => '/add'
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Todos']
    })
  })
})

export const { useGetAllTodosQuery, useDeleteTodoMutation } = todoApi