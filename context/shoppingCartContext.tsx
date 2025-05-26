import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface ShoppingCartContextType {
  cartItems: CartItem[];
  selectedItems: string[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  toggleItemSelection: (id: string) => void;
  clearSelectedItems: () => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<ShoppingCartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedCartItems = localStorage.getItem("cartItems");
      const storedSelectedItems = localStorage.getItem("selectedItems");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
      if (storedSelectedItems) {
        setSelectedItems(JSON.parse(storedSelectedItems));
      }
    } catch (error) {
      console.error("Error loading cart data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const addToCart = (item: CartItem) => {
    if (item.quantity < 1) return;
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  const increaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const clearSelectedItems = () => {
    setSelectedItems([]);
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        selectedItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        toggleItemSelection,
        clearSelectedItems,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error("useCart must be used within a ShoppingCartProvider");
  }
  return context;
};
