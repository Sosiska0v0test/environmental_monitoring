import * as productsConstants from '../Constants/ProductsConstants';

// GET ALL products
export const productsListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productsConstants.PRODUCTS_LIST_REQUEST:
      return { isLoading: true };
    case productsConstants.PRODUCTS_LIST_SUCCESS:
      return {
        isLoading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
        totalProducts: action.payload.totalProducts,
      };
    case productsConstants.PRODUCTS_LIST_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET RANDOM products
export const productsRandomReducer = (state = { productsConstants: [] }, action) => {
  switch (action.type) {
    case productsConstants.PRODUCTS_RANDOM_REQUEST:
      return { isLoading: true };
    case productsConstants.PRODUCTS_RANDOM_SUCCESS:
      return { isLoading: false, products: action.payload };
    case productsConstants.PRODUCTS_RANDOM_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET PRODUCT BY ID
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productsConstants.PRODUCT_DETAILS_REQUEST:
      return { isLoading: true };
    case productsConstants.PRODUCT_DETAILS_SUCCESS:
      return { isLoading: false, product: action.payload };
    case productsConstants.PRODUCT_DETAILS_FAIL:
      return { isLoading: false, isError: action.payload };
    case productsConstants.PRODUCT_DETAILS_RESET:
      return { product: {} };
    default:
      return state;
  }
};

// DELETE PRODUCT
export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case productsConstants.DELETE_PRODUCT_REQUEST:
      return { isLoading: true };
    case productsConstants.DELETE_PRODUCT_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case productsConstants.DELETE_PRODUCT_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// DELETE ALL PRODUCT
export const deleteAllProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case productsConstants.DELETE_ALL_PRODUCTS_REQUEST:
      return { isLoading: true };
    case productsConstants.DELETE_ALL_PRODUCTS_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case productsConstants.DELETE_ALL_PRODUCTS_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE PRODUCT
export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case productsConstants.CREATE_PRODUCT_REQUEST:
      return { isLoading: true };
    case productsConstants.CREATE_PRODUCT_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case productsConstants.CREATE_PRODUCT_FAIL:
      return { isLoading: false, isError: action.payload };
    case productsConstants.CREATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE PRODUCT
export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case productsConstants.UPDATE_PRODUCT_REQUEST:
      return { isLoading: true };
    case productsConstants.UPDATE_PRODUCT_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case productsConstants.UPDATE_PRODUCT_FAIL:
      return { isLoading: false, isError: action.payload };
    case productsConstants.UPDATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
