// import { create } from "zustand";

// export const useCartStore = create((set) => ({
//   cart: [],

//   addToCart: (item) =>
//     set((state) => ({
//       cart: [...state.cart, item],
//     })),

//   removeFromCart: (id) =>
//     set((state) => ({
//       cart: state.cart.filter((x) => x.id !== id),
//     })),

//   increase: (id) =>
//     set((state) => ({
//       cart: state.cart.map((x) =>
//         x.id === id ? { ...x, quantity: x.quantity + 1 } : x
//       ),
//     })),
//   decrease: (id) =>
//     set((state) => ({
//       cart: state.cart.map((x) =>
//         x.id === id && x.quantity > 1 ? { ...x, quantity: x.quantity - 1 } : x
//       ),
//     })),
// }));
