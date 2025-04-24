import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ShoppingCartIcon,
  ServerStackIcon,
  RectangleStackIcon,
  PencilIcon,
  DocumentIcon, 
  NewspaperIcon, 
  ShoppingBagIcon, 
} from "@heroicons/react/24/solid";
import { Home, User, Product, Order, Categories, OrderDetail, Banner, Post, Cart } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";

const iconClasses = {
  home: "w-5 h-5 text-blue-500",
  user: "w-5 h-5 text-green-500",
  categories: "w-5 h-5 text-red-500",
  product: "w-5 h-5 text-yellow-500",
  order: "w-5 h-5 text-purple-500",
  orderDetail: "w-5 h-5 text-pink-500",
  banner: "w-5 h-5 text-orange-500",
  post: "w-5 h-5 text-teal-500",
  cart: "w-5 h-5 text-indigo-500",
  auth: "w-5 h-5 text-gray-500"
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon className={iconClasses.home} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon className={iconClasses.user} />,
        name: "Người dùng",
        path: "/user",
        element: <User />,
      },
      {
        icon: <PencilIcon className={iconClasses.categories} />,
        name: "Danh mục",
        path: "/categories",
        element: <Categories />,
      },
      {
        icon: <TableCellsIcon className={iconClasses.product} />,
        name: "sản phẩm",
        path: "/product",
        element: <Product />,
      },
      {
        icon: <ShoppingCartIcon className={iconClasses.order} />, 
        name: "Đơn hàng",
        path: "/order",
        element: <Order />,
      },
      {
        icon: <RectangleStackIcon className={iconClasses.orderDetail} />, 
        name: "Chi tiết đơn hàng",
        path: "/order-detail",
        element: <OrderDetail />,
      },
      {
        icon: <DocumentIcon className={iconClasses.banner} />, 
        name: "Tin tức",
        path: "/banner",
        element: <Banner />,
      },
      {
        icon: <NewspaperIcon className={iconClasses.post} />, 
        name: "Bài viết",
        path: "/post",
        element: <Post />,
      },
      {
        icon: <ShoppingBagIcon className={iconClasses.cart} />, 
        name: "Giỏ hàng",
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  { 
    title: "TRANG XÁC THỰC",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon className={iconClasses.auth} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
