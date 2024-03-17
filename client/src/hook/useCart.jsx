import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthProvider";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cartitems", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/cartItem/${user?.email}`);
      return res.json();
    },
  });
  return [cart, refetch];
};

export default useCart;
