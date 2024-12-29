import * as productsConstants from '../Constants/ProductsConstants';
import * as productsAPIs from '../APIs/ProductsServices'
import { ErrorsAction, tokenProtection } from '../Protection'
import toast from 'react-hot-toast';


// get all product action 
export const getAllProductsAction =
  ({
    category = "",
    language = "",
    year = "",
    tax = "",
    concentration = "",
    normative = "",
    duration = "",
    gas_dust_flow_rate = "",
    waste = "",
    search = "",
    pageNumber = "",
  }) =>
    async (dispatch) => {
      try {
        dispatch({ type: productsConstants.PRODUCTS_LIST_REQUEST });
        const response = await productsAPIs.getAllProductsService(
          category,
          language,
          year,
          tax,
          concentration,
          normative,
          duration,
          gas_dust_flow_rate,
          waste,
          search,
          pageNumber
        );
        dispatch({
          type: productsConstants.PRODUCTS_LIST_SUCCESS,
          payload: response,
        });
      } catch (error) {
        ErrorsAction(error, dispatch, productsConstants.PRODUCTS_LIST_FAIL);
      }
    };

// get random product action
export const getRandomProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: productsConstants.PRODUCTS_RANDOM_REQUEST });
    const response = await productsAPIs.getRandomProductsService();
    dispatch({
      type: productsConstants.PRODUCTS_RANDOM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, productsConstants.PRODUCTS_RANDOM_FAIL);
  }
};

// get product by id action
export const getProductByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: productsConstants.PRODUCT_DETAILS_REQUEST });
    const response = await productsAPIs.getProductByIdService(id);
    dispatch({
      type: productsConstants.PRODUCT_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, productsConstants.PRODUCT_DETAILS_FAIL);
  }
};

// delete product action
export const deleteProductAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: productsConstants.DELETE_PRODUCT_REQUEST });
    const response = await productsAPIs.deleteProductService(
      tokenProtection(getState),
      id
    );
    dispatch({
      type: productsConstants.DELETE_PRODUCT_SUCCESS,
      payload: response,
    });
    toast.success("Таблицю успішно видалено");
    dispatch(getAllProductsAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, productsConstants.DELETE_PRODUCT_FAIL);
  }
};

// delete all products action
export const deleteAllProductsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: productsConstants.DELETE_ALL_PRODUCTS_REQUEST });
    const response = await productsAPIs.deleteAllProductsService(
      tokenProtection(getState)
    );
    dispatch({
      type: productsConstants.DELETE_ALL_PRODUCTS_SUCCESS,
      payload: response,
    });
    toast.success("Всі таблиці видалено🙀");
    dispatch(getAllProductsAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, productsConstants.DELETE_ALL_PRODUCTS_FAIL);
  }
};

// create product action
export const createProductAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: productsConstants.CREATE_PRODUCT_REQUEST });
    const response = await productsAPIs.createProductService(
      tokenProtection(getState),
      product
    );
    dispatch({
      type: productsConstants.CREATE_PRODUCT_SUCCESS,
      payload: response,
    });
    toast.success("Таблицю успішно створено👍");
  } catch (error) {
    ErrorsAction(error, dispatch, productsConstants.CREATE_PRODUCT_FAIL);
  }
};

// Update product action
export const updateProductAction = (id, product) => async (dispatch, getState) => {
  try {
    dispatch({ type: productsConstants.UPDATE_PRODUCT_REQUEST });
    const response = await productsAPIs.updateProductService(
      tokenProtection(getState),
      id,
      product
    );
    dispatch({
      type: productsConstants.UPDATE_PRODUCT_SUCCESS,
      payload: response,
    });
    toast.success("Таблицю успішно відредаговано 🤩");
    dispatch(getProductByIdAction(id));
  } catch (error) {
    ErrorsAction(error, dispatch, productsConstants.UPDATE_PRODUCT_FAIL);
  }
};
