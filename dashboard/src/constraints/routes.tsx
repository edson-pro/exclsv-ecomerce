import { Navigate } from "react-router";
import AuthLayout from "../components/AuthLayout";
import MainLayout from "../components/MainLayout";
import Page404 from "../pages/404";
import Login from "../pages/auth/Login";
import Customers from "../pages/customers";
import Dashbaord from "../pages/dashboard";
import Marketing from "../pages/marketing";
import Banners from "../pages/marketing/banners";
// import Banners from "../pages/marketing/banners";
import Campaigns from "../pages/marketing/campaigns";
import Deals from "../pages/marketing/deals";
import Discounts from "../pages/marketing/discounts";
import Orders from "../pages/orders";
import Drafts from "../pages/orders/drafts";
import People from "../pages/people";
import Products from "../pages/products";
import Brands from "../pages/products/brands";
import Categories from "../pages/products/categories";
import CreateProduct from "../pages/products/create-product";
import Inventory from "../pages/products/inventory";
import Transfers from "../pages/products/transfers";
import CreateTransfer from "../pages/products/transfers/create-transfer";
import UpdateProduct from "../pages/products/update-product";
import Account from "../pages/settings";
import Notifications from "../pages/settings/notifications";
import Suppliers from "../pages/suppliers";
const routes: any = [
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },

  {
    path: "",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Dashbaord /> },
      {
        path: "products",
        children: [
          { index: true, element: <Products /> },
          { path: "new", element: <CreateProduct /> },
          { path: ":id/update", element: <UpdateProduct /> },
          { path: "inventory", element: <Inventory /> },
          { path: "transfers", element: <Transfers /> },
          { path: "transfers/new", element: <CreateTransfer /> },
          { path: "categories", element: <Categories /> },
          { path: "brands", element: <Brands /> },
          { path: "deals", element: <Deals /> },
        ],
      },
      {
        path: "people",
        children: [
          { index: true, element: <People /> },
          { path: "customers", element: <Customers /> },
          { path: "suppliers", element: <Suppliers /> },
        ],
      },
      {
        path: "orders",
        children: [
          { index: true, element: <Orders /> },
          { path: "drafts", element: <Drafts /> },
        ],
      },
      {
        path: "marketing",
        children: [
          { index: true, element: <Marketing /> },
          { path: "discounts", element: <Discounts /> },
          { path: "banners", element: <Banners /> },
          { path: "campaigns", element: <Campaigns /> },
        ],
      },
      {
        path: "settings",
        children: [
          { index: true, element: <Account /> },
          { path: "notifications", element: <Notifications /> },
        ],
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

export default routes;
