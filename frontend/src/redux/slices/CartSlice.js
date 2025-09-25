const { createSlice } = require('@reduxjs/toolkit')

const CartSlice = createSlice(
    {
        name: "Cart",
        initialState: {
            item: [],
            original_total: 0,
            final_total: 0
        },
        reducers: {
            addToCart(state, actions) {
                const { product_id, color_id, prices } = actions.payload
                const items = state.item.find(i => i.product_id == product_id && i.color_id == color_id)
                if (items) {
                    items.quantity += 1
                } else {
                    state.item.push({ product_id: product_id, color_id: color_id, quantity: 1 })
                }
                // console.log(prices, "prices");
                
                state.original_total += prices.original_price
                state.final_total += prices.discounted_price
                localStorage.setItem("cart", JSON.stringify(state))
            },
            removeFromCart(state, actions) {
                const { index, product, quantity } = actions.payload;
                state.original_total -= product.original_price * quantity;
                state.final_total -= product.discounted_price* quantity;
                state.item.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(state));
            },
            dbToCart(state, actions) {
                state.item = actions.payload.items
                state.original_total = actions.payload.original_total
                state.final_total = actions.payload.final_total
                localStorage.setItem("cart",JSON.stringify(state))
            },
            lsToCart(state, actions) {
                if (localStorage.getItem("cart")) {
                    const lscart = JSON.parse(localStorage.getItem("cart"))
                    state.item = lscart.item
                    state.original_total = lscart.original_total
                    state.final_total = lscart.final_total
                }
            },
            emptyCart(state, actions) {
                state.item = []
                state.original_total = 0
                state.final_total = 0
                localStorage.removeItem("cart")
            },
            incQuantity(state, actions) {
                const { index, discounted_price, original_price } = actions.payload;
                if (state.item[index]) {
                    state.item[index].quantity += 1;
                    state.original_total += original_price;
                    state.final_total += discounted_price;
                    localStorage.setItem("cart", JSON.stringify(state));
                }
            },
            descQuantity(state, actions) {
                const { index, discounted_price, original_price } = actions.payload;
                if (state.item[index] && state.item[index].quantity > 1) {
                    state.item[index].quantity -= 1;
                    state.original_total -= original_price;
                    state.final_total -= discounted_price;
                    localStorage.setItem("cart", JSON.stringify(state));
                }
            }
        }
    }
)

export const { addToCart, removeFromCart, dbToCart, lsToCart, emptyCart, incQuantity, descQuantity } = CartSlice.actions

export default CartSlice.reducer
