import baseRequest from './axiosBaseUrl';


export async function getBands() {
    try {
        const response = await baseRequest.get('/all');

        const dataObject = response.data;

        console.log(dataObject);

        return dataObject;

    
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        throw error;
    }
}


export async function postBand(bandData) {
    try {
        const response = await baseRequest.post('/add', bandData);

        const dataObject = response.data;

        console.log(dataObject);

        return dataObject;

    
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        throw error;
    }
}

export async function putBand(bandData, id) {
    try {
        const response = await baseRequest.put(`/update/${id}`, bandData);

        const dataObject = response.data;

        console.log(dataObject);

        return dataObject;

    
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        throw error;
    }
}

export async function deleteBand(id) {
    try {
        const response = await baseRequest.delete(`/del/${id}`);

        const dataObject = response.data;

        console.log(dataObject);

        return dataObject;

    
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        throw error;
    }
}
