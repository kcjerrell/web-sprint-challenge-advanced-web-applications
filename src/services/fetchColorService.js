import { axiosWithAuth } from '../helpers/axiosWithAuth';

const fetchColorService = () => {
	return axiosWithAuth().get("/api/colors");
}

export default fetchColorService;
