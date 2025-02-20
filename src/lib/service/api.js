"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3004",
    credentials: "include",
    mode: "cors",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Products", "Categories", "Articles", "Users", "Orders"],
  endpoints: (builder) => ({
    // Products
    getProducts: builder.query({
      query: () => "/products/",
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/products/",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `/products/${id}/`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // Categories
    getCategories: builder.query({
      query: () => "/categories/",
      providesTags: ["Categories"],
    }),
    addCategory: builder.mutation({
      query: (category) => ({
        url: "/categories/",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...category }) => ({
        url: `/categories/${id}/`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),

    // Articles
    getArticles: builder.query({
      query: () => "/articles/",
      providesTags: ["Articles"],
    }),
    addArticle: builder.mutation({
      query: (article) => ({
        url: "/articles/",
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["Articles"],
    }),
    updateArticle: builder.mutation({
      query: ({ id, ...article }) => ({
        url: `/articles/${id}/`,
        method: "PUT",
        body: article,
      }),
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/articles/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles"],
    }),

    // Users
    getUsers: builder.query({
      query: () => ({
        url: "/users/",
        headers: getToken() ? { Authorization: `Token ${getToken()}` } : {},
      }),
      providesTags: ["Users"],
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: "/users/",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...user }) => ({
        url: `/users/${id}/`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // Orders
    getOrders: builder.query({
      query: () => ({
        url: "/orders/",
        headers: getToken() ? { Authorization: `Token ${getToken()}` } : {},
      }),
      providesTags: ["Orders"],
    }),
    addOrder: builder.mutation({
      query: (order) => ({
        url: "/orders/",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...order }) => ({
        url: `/orders/${id}/`,
        method: "PUT",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),

    getArticles: builder.query({
      query: () => "/articles/",
    }),
    getProducts: builder.query({
      query: () => "/products/",
    }),
    getCategories: builder.query({
      query: () => "/categories/",
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users/",
        headers: token ? { Authorization: `Token ${token}` } : {},
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: "/orders/",
        headers: token ? { Authorization: `Token ${token}` } : {},
      }),
    }),

    logIn: builder.mutation({
      query: (data) => ({
        url: "/auth/login/",
        method: "POST",
        body: data,
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: "/auth/signup/",
        method: "POST",
        body: data.formData,
      }),
    }),
  }),
});

export const {
  // Products
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,

  // Categories
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  // Articles
  useGetArticlesQuery,
  useAddArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,

  // Users
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,

  // Orders
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,

  // Auth
  useLogInMutation,
  useSignUpMutation,
} = api;
