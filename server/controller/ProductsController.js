import asyncHandler from 'express-async-handler';
import Product from "../models/ProductsModel.js";
import { ProductsData } from '../Data/ProductData.js';


export const updateCalculation = async (req, res) => {
  try {
    const { calculationField, result } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Dynamically update only if the result is not null or empty
    if (result) {
      product[calculationField] = { result: parseFloat(result) };
      await product.save();
    }

    res.json({ message: 'Calculation updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// ********** PUBLIC CONTROLLERS **********
// @desc import products
// @route POST /api/products/import
// @access Public

const importProducts = asyncHandler(async (req, res) => {
  await Product.deleteMany({});
  const products = await Product.insertMany(ProductsData);
  res.status(201).json(products);
});

// @desc get all products
// @route GER /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  try {
    //filter products by category, language,  year, tax, waste and search
    const { category, language, year, tax, concentration, normative, duration, gas_dust_flow_rate, waste, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(language && { language }),
      ...(year && { year }),
      ...(tax && { tax }),
      ...(waste && { waste }),
      ...(concentration && { concentration }),
      ...(normative && { normative }),
      ...(duration && { duration }),
      ...(gas_dust_flow_rate && { gas_dust_flow_rate }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    }

    // load more products functionality
    const page = Number(req.query.pageNumber) || 1;
    const limit = 24;
    const skip = (page - 1) * limit;

    // find products by query, skip and limit
    const products = await Product.find(query)
      //.sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    //get total number of products
    const count = await Product.countDocuments(query);

    //send response with products and total number of products
    res.json({ products, page, pages: Math.ceil(count / limit), totalProducts: count })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// @desc get product by id
// @route GER /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
  try {
    // find product by id in database
    const product = await Product.findById(req.params.id);
    // if the product if found send it to the client
    if (product) {
      res.json(product);
    }
    // if the products is not found send 404 error
    else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})


// @desc get random products
// @route GER /api/products/random/all
// @access Public

const getRandomProducts = asyncHandler(async (req, res) => {
  try {
    //find random products
    const products = await Product.aggregate([{ $sample: { size: 8 } }]);
    //send random products to the client
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// ****************** ADMIN CONTROLLERS ******************

// @desc Update product
// @route PUT /api/products/:id/
// @access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  try {
    //get data from request body
    const {
      name,
      category,
      language,
      year,
      tax,
      concentration,
      normative,
      duration,
      gas_dust_flow_rate,
      waste,
    } = req.body;

    // find product by id database
    const product = await Product.findById(req.params.id);
    if (product) {
      // update product data
      product.name = name || product.name;
      product.category = category || product.category;
      product.language = language || product.language;
      product.year = year || product.year;
      product.tax = tax || product.tax;
      product.concentration = concentration || product.concentration;
      product.normative = normative || product.normative;
      product.duration = duration || product.duration;
      product.gas_dust_flow_rate = gas_dust_flow_rate || product.gas_dust_flow_rate;
      product.waste = waste || product.waste;

      //save the product in database
      const updatedProduct = await product.save();
      //send the updated product to the client
      res.status(201).json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete product
// @route DELETE /api/products/:id/
// @access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    //find product by id in DataBase
    const product = await Product.findById(req.params.id);
    //if the product is found delete it
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    }
    // if the product is not found send 404 error
    else {
      res.status(404);
      throw new Error("Product not found")
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// @desc Delete all product
// @route DELETE /api/product/
// @access Private/Admin

const deleteAllProducts = asyncHandler(async (req, res) => {
  try {
    //delete all products
    await Product.deleteMany({});
    res.json({ message: "All products removed" })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// @desc Create product
// @route POST /api/products/
// @access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  try {
    //get data from request body
    const {
      name,
      category,
      tax,
      waste,
      concentration,
      normative,
      duration,
      gas_dust_flow_rate,
      language,
      year,
    } = req.body;

    //create a new product
    const product = new Product({
      name,
      category,
      tax,
      waste,
      concentration,
      normative,
      duration,
      gas_dust_flow_rate,
      language,
      year,
      userId: req.user._id,
    });

    //save the product in database
    if (product) {
      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    }
    else {
      res.status(400);
      throw new Error("Invalid product data")
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

export { importProducts, getProducts, getProductById, getRandomProducts, updateProduct, deleteProduct, deleteAllProducts, createProduct };
