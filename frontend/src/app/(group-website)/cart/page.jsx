"use client";
import { getProducts } from "@/library/api-calls";
import { axiosInstance } from "@/library/helper";
import { descQuantity, emptyCart, incQuantity, removeFromCart } from "@/redux/slices/CartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Cart = () => {
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const getData = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const decsHandler = (index) => {
    const item = cart.item[index];
    const product = products.find((p) => p._id == item.product_id);
    axiosInstance
      .put("/cart/dec", { user_id: user.data._id, product_id: item.product_id, color_id: item.color_id })
      .then((response) => {
        if (response.data.flag == 1) {
          toast.success(response.data.message);
          dispatch(
            descQuantity({
              index,
              discounted_price: product.discounted_price,
              original_price: product.original_price,
            })
          );
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  const incHandler = (index) => {
    const item = cart.item[index];
    const product = products.find((p) => p._id == item.product_id);
    axiosInstance
      .put("/cart/inc", { user_id: user.data._id, product_id: item.product_id, color_id: item.color_id })
      .then((response) => {
        if (response.data.flag == 1) {
          toast.success(response.data.message);
          dispatch(
            incQuantity({
              index,
              discounted_price: product.discounted_price,
              original_price: product.original_price,
            })
          );
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  const removeHandler = (index) => {
    const item = cart.item[index];
    if (!item) return;

    axiosInstance
      .delete("/cart/remove", { data: { user_id: user.data._id, product_id: item.product_id, color_id: item.color_id } })
      .then((response) => {
        if (response.data.flag === 1) {
          toast.success(response.data.message);
          const product = products.find((p) => p._id == item.product_id);
          dispatch(removeFromCart({ index, product, quantity: item.quantity }));
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  const removeAllHandler = () => {
    axiosInstance
      .delete("/cart/removeall", { data: { user_id: user.data._id } })
      .then((response) => {
        if (response.data.flag === 1) {
          toast.success(response.data.message);
          dispatch(emptyCart());
          router.refresh();
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  const checkOutHandler = () => {
    if (cart.item.length == 0) {
      toast.error("No items in cart");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="!text-black">
      <h1 className="text-center text-lg font-bold p-4 bg-gray-200">Your Shopping Cart</h1>

      <div className="max-w-[1250px] mx-auto p-4 sm:p-6">
        <div className="text-end mb-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={removeAllHandler}
          >
            Remove All
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          {cart.item.length !== 0 && products.length !== 0 ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse hidden sm:table">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="p-2">S.No</th>
                    <th className="p-2">Product</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.item.map((item, index) => {
                    const product = products.find((p) => p._id == item.product_id);
                    const color = product.color.find((c) => c._id == item.color_id);
                    return (
                      <tr key={index} className="border-b">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2 flex items-center gap-2">
                          <img
                            src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/product/${product.main_image}`}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">{color.name}</p>
                          </div>
                        </td>
                        <td className="p-2">₹{product.discounted_price}</td>
                        <td className="p-2 flex items-center gap-2">
                          <button
                            className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                            onClick={() => decsHandler(index)}
                          >
                            <FaMinus />
                          </button>
                          <p>{item.quantity}</p>
                          <button
                            className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                            onClick={() => incHandler(index)}
                          >
                            <FaPlus />
                          </button>
                        </td>
                        <td className="p-2">₹{product.discounted_price * item.quantity}</td>
                        <td className="p-2">
                          <button
                            className="text-red-500 hover:text-red-600 transition"
                            onClick={() => removeHandler(index)}
                          >
                            <FaTimes />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* Mobile View */}
              <div className="sm:hidden">
                {cart.item.map((item, index) => {
                  const product = products.find((p) => p._id == item.product_id);
                  const color = product.color.find((c) => c._id == item.color_id);
                  return (
                    <div key={index} className="border-b py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/product/${product.main_image}`}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{color.name}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p>Price: ₹{product.discounted_price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Unit Price: ₹{product.discounted_price * item.quantity}</p>
                      </div>
                      <div className="flex justify-between mt-2">
                        <button
                          className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                          onClick={() => decsHandler(index)}
                        >
                          <FaMinus />
                        </button>
                        <button
                          className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                          onClick={() => incHandler(index)}
                        >
                          <FaPlus />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-600 transition"
                          onClick={() => removeHandler(index)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">Your cart is empty.</p>
          )}
          <div className="text-start space-y-2 mt-4">
            <p>Price Total: ₹{cart.original_total}</p>
            <p>Discount: ₹{cart.original_total - cart.final_total}</p>
            <h2 className="text-lg font-bold">TOTAL: ₹{cart.final_total}</h2>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
              <button
                onClick={checkOutHandler}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
              >
                Checkout
              </button>
              <Link
                href={"/store"}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;