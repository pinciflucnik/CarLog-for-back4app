import * as request from '../lib/requester'
const base_url = 'https://parseapi.back4app.com/classes/refuels'
 export default {
    create: async (data, token) => {
        const newRefuel = await request.post(`${base_url}`, data, token);
        return newRefuel;
    },
    getAllDesc: async (carId) => {
        const result = await request.get(`${base_url}?where={"carId":"${carId}"}&order=-km`);
        return result.results;
    },
    getAllAsc: async (carId) => {
        const result = await request.get(`${base_url}?where={"carId":"${carId}"}&order=km`);        
        return result.results;
    },
    delete: async (refuelId, token) => {
        return await request.remove(`${base_url}/${refuelId}`, undefined, token);
    },
    getOne: async (id) => {
        const result =  await request.get(`${base_url}/${id}`);
        return result
    },
    edit: async (id, data, token) => {
        return await request.put(`${base_url}/${id}`, data, token)
    }
 }