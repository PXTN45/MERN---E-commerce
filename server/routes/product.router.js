/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          required:
 *              -   name
 *              -   price
 *              -   desciption
 *              -   image
 *              -   category
 *          properties:
 *              name:
 *                  type:   string
 *                  description:   the name of the product
 *              price:
 *                  type:   number
 *                  description:   the price of the product
 *              desciption:
 *                  type:   string
 *                  description:   the desciption of the product
 *              image:
 *                  type:   string
 *                  description:   the image of the product
 *              category:
 *                  type:   string
 *                  description:   the category of the product
 *          example:
 *              name:"Macbook Pro"
 *              price:"2000"
 *              desciption:"A great laptop"
 *              image:"http://example.com/macbook.jpg"
 *              pricategoryce:"electronics"
 * tags:
 *  name: Products
 *  description: the products managing API
 */

const express = require("express");
const router = express.Router();
const ProductModel = require("../models/Product.model");

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of Product.
 *     tags:    [Products]
 *     responses:
 *       200:
 *         description: A list of product.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref:   '#/components/schemas/Product'
 *       500:
 *         description: Some error happened
 */
router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a list of Product by id.
 *     tags:    [Products]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description:    the product id
 *     responses:
 *       200:
 *          description: A list of product.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref:   '#/components/schemas/Product'
 *       404:
 *          description: Product not Product
 *       500:
 *          description: Some error happened
 */
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const products = await ProductModel.findById(productId);
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new Product.
 *     tags:    [Products]
 *     requestBody:
 *          required:   true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:   '#/components/schemas/Product'
 *     responses:
 *          201:
 *              description: A list of product.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref:   '#/components/schemas/Product'
 *          500:
 *              description: Some error happened
 */

router.post("/", async (req, res) => {
  const newProduct = new ProductModel(req.body);
  try {
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update the Product detail.
 *     tags:    [Products]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description:    the product id
 *     requestBody:
 *      required:   true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref:   '#/components/schemas/Product'
 *     responses:
 *      200:
 *          description: The product by id.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:   '#/components/schemas/Product'
 *      404:
 *          description: Product not Product
 *      500:
 *          description: Some error happened
 */

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const product = await ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!product) {
      res.status(404).json({ message: "Product Not Found" });
    }
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: delete Product by id.
 *     tags:    [Products]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description:    the product id
 *     responses:
 *      200:
 *          description: delete product is deleted.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:   '#/components/schemas/Product'
 *      404:
 *          description: Product not Product
 *      500:
 *          description: Some error happened
 */

router.delete("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product Not Found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
