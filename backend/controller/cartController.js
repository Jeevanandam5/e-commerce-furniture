import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../model/cartModel.js";
import Product from "../model/productModel.js";

const addToCart = asyncHandler(async (req, res) => {
    const { productId, qty } = req.body;
    const userId = req.user._id;

    // Validate quantity
    if (!qty || qty < 1) {
        res.status(400);
        throw new Error("Invalid quantity");
    }

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404).json({ message: "Product Not found" });
        return;
    }

    // Check stock availability
    if (product.countInStock < qty) {
        res.status(400).json({ message: "Not enough stock available" });
        return;
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
        const existingItemIndex = cart.cartItems.findIndex(
            (item) => item.product.toString() === productId
        );

        if (existingItemIndex !== -1) {
            cart.cartItems[existingItemIndex].qty = qty;
        } else {
            cart.cartItems.push({
                name: product.name,
                qty,
                price: product.price,
                image: product.image,
                product: productId,
            });
        }
    } else {
        cart = new Cart({
            user: userId,
            cartItems: [
                {
                    name: product.name,
                    qty,
                    price: product.price,
                    image: product.image,
                    product: productId,
                },
            ],
        });
    }

    // Recalculate all prices
    cart.itemPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );
    cart.shippingPrice = cart.itemPrice > 100 ? 0 : 20;
    cart.taxPrice = +(0.18 * cart.itemPrice).toFixed(2);
    cart.totalPrice = cart.itemPrice + cart.shippingPrice + cart.taxPrice;

    await cart.save();
    res.status(201).json(cart);
});

const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        res.status(200).json({ cartItems: [], itemPrice: 0, shippingPrice: 0, taxPrice: 0, totalPrice: 0 });
    } else {
        res.json(cart);
    }
});

export { addToCart, getCart };