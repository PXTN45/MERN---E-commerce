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
const ProductModel = require("../models/Product.model")

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
 * /cartItem/{email}:
 *   get:
 *     summary: Retrieve a list of cartItem by id.
 *     tags:    [CartItem]
 *     parameters:
 *      -   in: path
 *          name: email
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
    const cartItem = await CartItemModel.find({ email: cartItemEmail });
    if (!cartItem || cartItem.length === 0) {
      return res.status(404).json({ message: "ไม่พบสินค้า" });
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
  // ตรวจสอบว่า req.body มี property product_id หรือไม่
  if (!req.body.productId) {
    return res.status(400).json({ message: "Missing product_id in req.body" });
  }

  // ดึงข้อมูลผลิตภัณฑ์จากฐานข้อมูล
  try {
    const product = await ProductModel.findById(req.body.productId);
    const productId = product._id.toString();

    // ตรวจสอบว่ามีผลิตภัณฑ์
    if (req.body.productId !== productId) {
       return res.status(404).json({ message: "Product not found" });
    }

    const existingCart = await CartItemModel.findOne({ productId: req.body.productId });
    const existingCartByUser = await CartItemModel.findOne({ email: req.body.email });

    if (existingCart) {
      if (existingCartByUser) {
        // ถ้ามีข้อมูลใน Cart อยู่แล้ว และไม่มี Cart ที่อยู่ใน user นี้
        const quantity = Number(req.body.quantity);
        existingCart.quantity += quantity;
        await existingCart.save();
        return res.status(200).json(existingCart);
      }
    }

    // สร้าง CartItemModel ด้วย req.body ที่ถูกส่งมา
    const newCart = new CartItemModel(req.body);

    // บันทึกลงในฐานข้อมูล
    const savedCart = await newCart.save();

    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /cartItem/{id}:
 *   put:
 *     summary: Update the CartItem detail.
 *     tags:    [CartItem]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description:    the CartItem id
 *     requestBody:
 *      required:   true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref:   '#/components/schemas/CartItem'
 *     responses:
 *      200:
 *          description: The CartItem by id.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:   '#/components/schemas/CartItem'
 *      404:
 *          description: CartItem not CartItem
 *      500:
 *          description: Some error happened
 */
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

/**
 * @swagger
 * /cartItem/{id}:
 *   delete:
 *     summary: delete CartItem by id.
 *     tags:    [CartItem]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description:    the CartItem id
 *     responses:
 *      200:
 *          description: delete CartItem is deleted.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:   '#/components/schemas/CartItem'
 *      404:
 *          description: CartItem not CartItem
 *      500:
 *          description: Some error happened
 */

router.delete("/:id", async (req, res) => {
  try {
    const cart = await CartItemModel.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "cart Not Found" });
    }
    res.json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /cartItem/clear/{email}:
 *   delete:
 *     summary: delete CartItem by email.
 *     tags:    [CartItem]
 *     parameters:
 *      -   in: path
 *          name: email
 *          required: true
 *          schema:
 *              type: string
 *          description:    the CartItem email
 *     responses:
 *      200:
 *          description: delete CartItem is deleted.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:   '#/components/schemas/CartItem'
 *      404:
 *          description: CartItem not CartItem
 *      500:
 *          description: Some error happened
 */
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
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
