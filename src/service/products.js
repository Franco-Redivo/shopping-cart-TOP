import axios from 'axios'

const baseURL = 'https://fakestoreapi.com/products';

const getAll = async () => {
    const request = await axios.get(baseURL);
    return request.data;
}

const getOne = async (id) => {
    const request = await axios.get(`${baseURL}/${id}`);
    return request.data;
}

const productService = { getAll, getOne};
export default productService;