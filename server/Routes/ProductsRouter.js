import express from "express";
import { protect, admin } from "../middlewares/Auth.js";
import * as productsController from "../controller/ProductsController.js";

const router = express.Router();

// +++++++++ Public Routes +++++++++

router.post('/import', productsController.importProducts);
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.get('/random/all', productsController.getRandomProducts);

router.put('/calculations/:id', protect, productsController.updateCalculation);

// +++++++++ ADMIN ROUTES +++++++++
router.put("/:id", protect, admin, productsController.updateProduct);
router.delete("/:id", protect, admin, productsController.deleteProduct);
router.delete("/", protect, admin, productsController.deleteAllProducts);
router.post("/", protect, admin, productsController.createProduct);



export default router;