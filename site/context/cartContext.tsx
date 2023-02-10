import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../utils/api";
import { useToast } from "./toastContext";
import shortid from "shortid";
import { useAuth } from "./authContext";

export const cartContext: any = createContext({});

export const CartProvider = ({ children, ssr }: any) => {
  const { user, loading } = useAuth();
  const {
    data: cart,
    status,
    remove,
  } = useQuery("cart", () => api.get("/me/cart").then((e) => e.data), {
    enabled: user !== undefined,
  });

  const getNewCart = ({ oldCart, newItems }) => {
    const getDiscountAmount = ({ discount, amount }) => {
      if (discount.discount.type === "percentage") {
        return (amount * discount.discount.value) / 100;
      } else if (discount.discount.type === "fixed") {
        return discount.discount.value;
      } else {
        return 0;
      }
    };
    const amount = newItems.reduce((a, b) => a + b.amount, 0);
    const discountAmount = oldCart.discount?.amount
      ? amount < oldCart.discount.discount.greater_than
        ? 0
        : getDiscountAmount({
            amount,
            discount: oldCart.discount,
          })
      : 0;

    const newCart = {
      ...oldCart,
      total: amount - discountAmount,
      discount: {
        ...oldCart.discount,
        amount: discountAmount,
      },
      quantity: newItems.reduce((a, b) => a + b.quantity, 0),
      amount: newItems.reduce((a, b) => a + b.amount, 0),
      items: newItems,
    };

    return newCart;
  };

  const [loadingDiscount, setloadingDiscount] = useState(false);

  const queryClient = useQueryClient();

  const clearMutation = useMutation(() => api.delete(`me/cart`), {
    onSuccess: (e) => {
      toast.show({ title: "cart clealed success" });
    },
    onMutate: async () => {
      await queryClient.cancelQueries("cart");
      const previousData = queryClient.getQueryData("cart");
      queryClient.setQueryData("cart", (old: any) => {
        const newItems = [];
        const newCart = {
          quantity: 0,
          amount: 0,
          items: newItems,
        };
        return newCart;
      });
      return { previousData };
    },
    onError: (err: any, newData, context: any) => {
      toast.show({ title: err.response.data.message, danger: true });
      queryClient.setQueryData("cart", context.previousData);
    },
  });

  const discountMutation = useMutation(
    (code: any) => api.post(`/discounts/${code}/apply`),
    {
      onSuccess: (e) => {
        setloadingDiscount(false);
        queryClient.setQueryData("cart", (old: any) => {
          return getNewCart({
            oldCart: {
              ...old,
              discount: e.data,
            },
            newItems: old.items,
          });
        });
        toast.show({ title: "discount applied success" });
      },
      onMutate: () => {
        setloadingDiscount(true);
      },
      onError: (err: any, newData, context: any) => {
        console.log(err.response.data.message);
        setloadingDiscount(false);
        toast.show({ title: err.response.data.message, danger: true });
      },
    }
  );

  const [loadingAddToCart, setloadingAddToCart] = useState(false);

  const quantityMutation = useMutation(
    (e: any) =>
      api.patch(`/me/cart/items/${e?.id}`, {
        quantity:
          e.action === "increament"
            ? e.quantity + 1
            : e.action === "decreament"
            ? e.quantity - 1
            : 0,
      }),
    {
      onSuccess: (e) => {},
      onMutate: async (e) => {
        await queryClient.cancelQueries("cart");
        const previousData = queryClient.getQueryData("cart");
        queryClient.setQueryData("cart", (old: any) => {
          const oldCart = old;
          const newItems = oldCart.items.map((p) =>
            p.id === e.id
              ? {
                  ...e,
                  quantity:
                    e.action === "increament"
                      ? e.quantity + 1
                      : e.action === "decreament"
                      ? e.quantity - 1
                      : 0,
                  amount:
                    e.action === "increament"
                      ? e.amount + e.amount / e.quantity
                      : e.action === "decreament"
                      ? e.amount - e.amount / e.quantity
                      : 0,
                }
              : p
          );

          return getNewCart({ oldCart, newItems });
        });
        return { previousData };
      },
      onError: (err, newData, context: any) => {
        queryClient.setQueryData("cart", context.previousData);
      },
      onSettled: (e) => {
        queryClient.invalidateQueries("cart");
      },
    }
  );
  function clean(obj) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ""
      ) {
        delete obj[propName];
      }
    }
    return obj;
  }

  const [showCartPannel, setshowCartPannel] = useState(false);

  const toast: any = useToast();
  const addItemMutation = useMutation(
    (e: any) =>
      api.post(
        `/me/cart/items`,
        clean({
          product_id: e.product.id,
          quantity: e.quantity,
          variant_id: e?.variant?.id,
        })
      ),
    {
      onSuccess: ({ data }) => {
        queryClient.setQueryData("cart", (old: any) => {
          const oldCart = old;
          const newItems = [data, ...oldCart.items];

          return getNewCart({ oldCart, newItems });
        });
        setloadingAddToCart(false);
        setshowCartPannel(true);

        // toast.show({ title: "item added successfully" });
      },
      onMutate: async (e) => {
        setloadingAddToCart(true);
      },
      onError: (err: any, newData, context: any) => {
        setloadingAddToCart(false);

        toast.show({
          title: err.response.data.message,
          danger: true,
        });

        queryClient.setQueryData("cart", context.previousData);
      },
      onSettled: (e) => {
        queryClient.invalidateQueries("cart");
      },
    }
  );

  const removeItemMutation = useMutation(
    (e: any) => api.delete(`/me/cart/items/${e?.id}`),
    {
      onSuccess: (e) => {
        toast.show({ title: "item removed successfully" });
      },
      onMutate: async (e) => {
        await queryClient.cancelQueries("cart");
        const previousData = queryClient.getQueryData("cart");
        queryClient.setQueryData("cart", (old: any) => {
          const oldCart = old;
          const newItems = oldCart.items.filter((p) => p.id !== e.id);

          return getNewCart({ oldCart, newItems });
        });
        return { previousData };
      },
      onError: (err, newData, context: any) => {
        toast.show({
          title: "item failed to remove",
          danger: true,
        });

        queryClient.setQueryData("cart", context.previousData);
      },
      onSettled: (e) => {
        queryClient.invalidateQueries("cart");
      },
    }
  );

  const removeDiscountMutation = useMutation(
    (e: any) => api.delete(`/discounts/${e.id}/remove`),
    {
      onSuccess: (e) => {
        toast.show({ title: "discount removed successfully" });
      },
      onMutate: async (e) => {
        await queryClient.cancelQueries("cart");
        const previousData = queryClient.getQueryData("cart");
        queryClient.setQueryData("cart", (old: any) => {
          const oldCart = old;

          return getNewCart({
            oldCart: {
              ...oldCart,
              discount: undefined,
            },
            newItems: oldCart.items,
          });
        });
        return { previousData };
      },
      onError: (err, newData, context: any) => {
        toast.show({
          title: "discount failed to remove",
          danger: true,
        });

        queryClient.setQueryData("cart", context.previousData);
      },
      onSettled: (e) => {
        queryClient.invalidateQueries("cart");
      },
    }
  );

  const localCart = useLocalCart();

  return (
    <cartContext.Provider
      value={
        !user && !loading
          ? localCart
          : {
              quantity: cart?.quantity || 0,
              loading: status === "loading",
              amount: cart?.amount || 0,
              showCartPannel,
              setshowCartPannel,
              total: cart?.total || 0,
              items: cart?.items || [],
              discount: cart?.discount,
              loadingAddToCart: loadingAddToCart,
              loadingDiscount: loadingDiscount,
              clearCart: () => clearMutation.mutate(),
              removeDiscount: (e) => removeDiscountMutation.mutate(e),
              applyDiscount: (e) => discountMutation.mutate(e),
              addItem: (e) => addItemMutation.mutate(e),
              removeItem: (e) => removeItemMutation.mutate(e),
              incrementItem: (e) =>
                quantityMutation.mutate({ ...e, action: "increament" }),
              decreamentItem: (e) =>
                quantityMutation.mutate({ ...e, action: "decreament" }),
              remove: (e) => {
                queryClient.setQueryData("cart", () => undefined);
              },
            }
      }
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(cartContext);
};

export const useLocalCart = () => {
  const toast: any = useToast();

  const [showCartPannel, setshowCartPannel] = useState(false);

  const [loadingAddToCart, setloadingAddToCart] = useState(false);

  const formatCartItem = (e) => {
    return {
      id: e.id,

      product: {
        ...e.product,
        image: e.variant ? e.variant.image : e.product.images[0],
      },
      quantity: e.quantity,
      amount: e.variant
        ? e.variant.price * e.quantity
        : e.product.price * e.quantity,
      variant: e.variant,
    };
  };

  const [cart, setcart] = useState({
    quantity: 0,
    amount: 0,
    total: 0,
    items: [],
  });

  const handleCart = (e) => {
    const items = e.map((e) => formatCartItem(e));
    const amount = items.reduce((a, b) => a + b.amount, 0);
    const vCart = {
      items: items,
      quantity: items.reduce((a, b) => a + b.quantity, 0),
      amount: amount,
      total: amount,
    };
    setcart(vCart);
    localStorage.setItem("cart-items", JSON.stringify(vCart.items));
  };

  useEffect(() => {
    if (localStorage.getItem("cart-items")) {
      const its = JSON.parse(localStorage.getItem("cart-items"));

      const items = its.map((e) => formatCartItem(e));
      handleCart(items);
    }
  }, []);

  return {
    ...cart,
    setshowCartPannel,
    showCartPannel,
    loadingAddToCart: loadingAddToCart,
    clearCart: () => {
      handleCart([]);
    },
    addItem: (e) => {
      setloadingAddToCart(true);
      setTimeout(() => {
        const items = cart.items;
        handleCart([...items, { ...e, id: shortid.generate() }]);
        // toast.show({ title: "item added successfully" });
        setshowCartPannel(true);

        setloadingAddToCart(false);
      }, 1000);
    },
    removeItem: (e) => {
      const items = cart.items;
      handleCart(items.filter((i) => i.id !== e.id));
    },
    incrementItem: (e) => {
      const items = cart.items;

      handleCart(
        items.map((p) =>
          p.id === e.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    },
    decreamentItem: (e) => {
      const items = cart.items;

      handleCart(
        items.map((p) =>
          p.id === e.id ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
    },
  };
};
