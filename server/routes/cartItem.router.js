/**
 * @swagger
 * components:
 *  schemas:
 *      CartItem:
 *          type: object
 *          required:
 *              -   product_id
 *              -   email
 *              -   price
 *              -   name
 *              -   image
 *              -   quantity
 *          properties:
 *              product_id:
 *                  type:   objectId
 *                  description:   the Product_id of the CartItem
 *              email:
 *                  type:   string
 *                  description:   the email of the CartItem
 *              price:
 *                  type:   number
 *                  description:   the price of the CartItem
 *              name:
 *                  type:   string
 *                  description:   the name of the CartItem
 *              image:
 *                  type:   string
 *                  description:   the image of the CartItem
 *              quantity:
 *                  type:   string
 *                  description:   the quantity of the CartItem
 *          example:
 *              Product_id:"xxxxxxxx"
 *              email:"email@gmail.com"
 *              price:"2000"
 *              name:"CartItem Pro"
 *              image:"http://example.com/macbook.jpg"
 *              quantity:"20"
 * tags:
 *  name: CartItem
 *  description: the CartItem managing API
 */

const express = require("express");
const router = express.Router();
const CartItemModel = require("../models/CartItem.model");

/**
 * @swagger
 * /CartItem:
 *   get:
 *     summary: Retrieve a list of cartItem.
 *     tags:    [CartItem]
 *     responses:
 *       200:
 *         description: A list of cartItem.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref:   '#/components/schemas/cartItem'
 *       500:
 *         description: Some error happened
 */
router.get("/", async (req, res) => {
  try {
    const cartItem = await CartItemModel.find();
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /cartItem/{id}:
 *   get:
 *     summary: Retrieve a list of cartItem by id.
 *     tags:    [CartItem]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description:    the cartItem id
 *     responses:
 *       200:
 *          description: A list of cartItem.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref:   '#/components/schemas/cartItem'
 *       404:
 *          description: cartItem not cartItem
 *       500:
 *          description: Some error happened
 */
router.get("/:email", async (req, res) => {
  try {
    const cartItemEmail = req.params.email;
    const cartItem = await CartItemModel.findOne({ email: cartItemEmail });
    if (!cartItem) {
      return res.status(404).json({ message: "cartItem not found" });
    }
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /cartItem:
 *   post:
 *     summary: Create a new CartItem.
 *     tags:    [CartItem]
 *     requestBody:
 *          required:   true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:   '#/components/schemas/CartItem'
 *     responses:
 *          201:
 *              description: A list of cartItem.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref:   '#/components/schemas/CartItem'
 *          500:
 *              description: Some error happened
 */

router.post("/", async (req, res) => {
  const cart = req.body;
  try {
    const existingCarts = CartItemModel.findOne({
      product_id: cart.product_id,
      email: cart.email,
    });
    if (existingCarts) {
      existingCarts.quantity += cart.quantity;
      await existingCarts.save();
      return res.status(200);
    }
    const newCart = new CartItemModel(cart);
    await newCart.save();
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const cart = await CartItemModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!cart) {
      res.status(404).json({ message: "Cart Not Found" });
    }
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const cart = await CartItemModel.findByIdAndDelete(req.params.id);
    if (!cart) {
      res.status(404).json({ message: "cart Not Found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/clear/:email", async (req, res) => {
  try {
    const deletedCart = await CartItemModel.deleteMany({
      email: req.params.email,
    });
    if (deletedCart.deletedCount > 0) {
      return res.status(200).json(deletedCart);
    }
    res.status(404).json({ message: "Empty cart" });
  } catch (error) {
    //error handling
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
