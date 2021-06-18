import { axiosWithAuth } from '../helpers/axiosWithAuth';

const fetchColorService = () => {
	return axiosWithAuth().get("/api/colors").then(res => res.data);
}

export default fetchColorService;
