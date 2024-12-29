import Axios from './Axios'

// ******** PUBLICK APIs **********

// get all products Function
export const getAllProductsService = async (
  category,
  language,
  year,
  tax,
  waste,
  concentration,
  normative,
  duration,
  gas_dust_flow_rate,
  search,
  pageNumber
) => {
  const { data } = await Axios.get(
    `/products?category=${category}&language=${language}&year=${year}&tax=${tax}&waste=${waste}&concentration=${concentration}&normative=${normative}&duration=${duration}&gas_dust_flow_rate=${gas_dust_flow_rate}&search=${search}&pageNumber=${pageNumber}`
  );
  return data;
};

// get random Product Function
export const getRandomProductsService = async () => {
  const { data } = await Axios.get(`/products/random/all`);
  return data;
};

// get product by id Function
export const getProductByIdService = async (id) => {
  const { data } = await Axios.get(`/products/${id}`);
  return data;
};


// delete product Function
export const deleteProductService = async (token, id) => {
  const { data } = await Axios.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete all product function
export const deleteAllProductsService = async (token) => {
  const { data } = await Axios.delete(`/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// create product Function
export const createProductService = async (token, product) => {
  const { data } = await Axios.post(`/products`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// update product Function
export const updateProductService = async (token, id, product) => {
  const { data } = await Axios.put(`/products/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
