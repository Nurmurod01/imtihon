import Cart from "@/components/Cart";
import Navigator from "@/components/Navigator";
import Top from "@/components/Top";
import React from "react";

export default function CartPage() {
  return (
    <div>
      <Navigator next={"Cart"} />
      <Cart />
      <Top />
    </div>
  );
}
