import Link from "next/link";
import {
  Home,
  ShoppingBag,
  List,
  FileText,
  Users,
  ShoppingCart,
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: Home, label: "Dashboard" },
  { href: "/admin/products", icon: ShoppingBag, label: "Products" },
  { href: "/admin/categories", icon: List, label: "Categories" },
  { href: "/admin/articles", icon: FileText, label: "Articles" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-full shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100"
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
