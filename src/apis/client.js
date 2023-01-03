import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
const noneTokenClient = axios.create({ baseURL: BASE_URL });

export { noneTokenClient };
