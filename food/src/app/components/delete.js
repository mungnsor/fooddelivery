"use client";

import { useState } from "react";
import { SaveFood } from "./saveFood";

export const Parent = () => {
  const [orders, setOrders] = useState([]);

  const handleDelete = (id) => {
    setOrders((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      {orders.map((order) => (
        <SaveFood key={order.id} {...order} onDelete={handleDelete} />
      ))}
    </div>
  );
};
