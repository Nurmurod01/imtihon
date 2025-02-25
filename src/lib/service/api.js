"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3004/",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Users",
    "Categories",
    "Products",
    "Orders",
    "OrderItems",
    "CartItems",
    "Payments",
  ],
  endpoints: (builder) => ({
    getUsers: builder.query({ query: () => "/users", providesTags: ["Users"] }),
    getOneUsers: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["Users"],
    }),
    addUser: builder.mutation({
      query: (user) => ({ url: "/users", method: "POST", body: user }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...user }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["Users"],
    }),

    getCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),
    getOneCategory: builder.query({
      query: (id) => `/categories/${id}`,
      providesTags: ["Categories"],
    }),
    addCategory: builder.mutation({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...category }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({ url: `/categories/${id}`, method: "DELETE" }),
      invalidatesTags: ["Categories"],
    }),

    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Products"],
    }),
    getOneProduct: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (product) => ({ url: "/products", method: "POST", body: product }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: ["Products"],
    }),

    getOneOrders: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ["Orders"],
    }),
    addOrder: builder.mutation({
      query: (order) => ({ url: "/orders", method: "POST", body: order }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...order }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({ url: `/orders/${id}`, method: "DELETE" }),
      invalidatesTags: ["Orders"],
    }),

    getOrderItems: builder.query({
      query: () => "/order-items",
      providesTags: ["OrderItems"],
    }),
    addOrderItem: builder.mutation({
      query: (orderItem) => ({
        url: "/order-items",
        method: "POST",
        body: orderItem,
      }),
      invalidatesTags: ["OrderItems"],
    }),
    updateOrderItem: builder.mutation({
      query: ({ id, ...orderItem }) => ({
        url: `/order-items/${id}`,
        method: "PATCH",
        body: orderItem,
      }),
      invalidatesTags: ["OrderItems"],
    }),
    deleteOrderItem: builder.mutation({
      query: (id) => ({ url: `/order-items/${id}`, method: "DELETE" }),
      invalidatesTags: ["OrderItems"],
    }),

    getCartItems: builder.query({
      query: (id) => `/cart-items/${id}`,
      providesTags: ["CartItems"],
    }),
    addCartItem: builder.mutation({
      query: (cartItem) => ({
        url: "/cart-items",
        method: "POST",
        body: cartItem,
      }),
      invalidatesTags: ["CartItems"],
    }),
    updateCartItem: builder.mutation({
      query: ({ id, ...cartItem }) => ({
        url: `/cart-items/${id}`,
        method: "PATCH",
        body: cartItem,
      }),
      invalidatesTags: ["CartItems"],
    }),
    deleteCartItem: builder.mutation({
      query: (id) => ({ url: `/cart-items/${id}`, method: "DELETE" }),
      invalidatesTags: ["CartItems"],
    }),

    getPayments: builder.query({
      query: () => "/payments",
      providesTags: ["Payments"],
    }),

    logIn: builder.mutation({
      query: (data) => ({ url: "/auth/login", method: "POST", body: data }),
    }),
    signUp: builder.mutation({
      query: (data) => ({ url: "/auth/register", method: "POST", body: data }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetOneUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetCategoriesQuery,
  useGetOneCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetProductsQuery,
  useGetOneProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetOneOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderItemsQuery,
  useAddOrderItemMutation,
  useUpdateOrderItemMutation,
  useDeleteOrderItemMutation,
  useGetCartItemsQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useGetPaymentsQuery,
  useLogInMutation,
  useSignUpMutation,
} = api;

export default api;
