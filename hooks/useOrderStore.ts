import { OrderItem } from "@/types/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storage } from "@/lib/storage";
export type OrderState = {
  orderItems: OrderItem[];
};

export type OrderActions = {
  setIsReady(): void;
  addToOrder(item: OrderItem): void;
  removeFromOrder(itemId: string): void;
  clearOrder(): void;
};

export type OrderStore = OrderState & OrderActions;

const InitialState: OrderState = {
  orderItems: [],
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      ...InitialState,
      setIsReady: () => {
        // This function can be used to set a flag indicating the store is ready
        console.log("Order store is ready");
      },
      addToOrder: (item: OrderItem) => {
        const existingItem = get().orderItems.find(
          (orderItem) => orderItem.food.id === item.food.id
        );
        if (existingItem) {
          // If item already exists, update the quantity
          set({
            orderItems: get().orderItems.map((orderItem) =>
              orderItem.food.id === item.food.id
                ? { ...orderItem, quantity: orderItem.quantity + item.quantity }
                : orderItem
            ),
          });
        } else {
          // If item does not exist, add it to the order
          set({ orderItems: [...get().orderItems, item] });
        }
      },
      removeFromOrder: (itemId: string) => {
        set({
          orderItems: get().orderItems.filter(
            (orderItem) => orderItem.food.id !== itemId
          ),
        });
      },
      clearOrder: () => {
        set({ orderItems: [] });
      },
    }),
    {
      name: "orderStore",
      storage: createJSONStorage(() => storage),
      onRehydrateStorage(state) {
        return () => {
          if (state) {
            state.setIsReady();
          }
        };
      },
      partialize: (state) => ({
        orderItems: state.orderItems,
      }),
    }
  )
);
