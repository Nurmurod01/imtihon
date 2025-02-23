import AllProducts from "@/components/AllProducts";
import Navigator from "@/components/Navigator";
import Top from "@/components/Top";
import React from "react";

export default function ShopPage() {
  return (
    <div>
      <Navigator next={"Shop"} />
      <AllProducts />
      <Top />
    </div>
  );
}
