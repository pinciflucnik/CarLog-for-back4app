import * as request from '../lib/requester'

const base_url = 'https://parseapi.back4app.com/classes/maintenances'

export default {
    create: async (data, token) => {
        const newRefuel = await request.post(`${base_url}`, data, token);
        return newRefuel;
    },
    delete: async (id, token) => {
        return await request.remove(`${base_url}/${id}`, undefined, token);
    },
    getOne: async (id) => {
        const result =  await request.get(`${base_url}/${id}`);
        return result
    },
    edit: async (id, data, token) => {
        return await request.put(`${base_url}/${id}`, data, token)
    },
    getAllDesc: async (carId) => {
        const result = await request.get(`${base_url}?where={"carId":"${carId}"}&order=-createdAt`);
        return result.results;
    },
    getLast: async (carId) => {
        const result = await request.get(`${base_url}?where={"carId":"${carId}"}&order=-createdAt&limit=1`);
        return result.results;

    }


}