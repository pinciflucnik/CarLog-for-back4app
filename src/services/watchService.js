import * as request from '../lib/requester'

const base_url = 'https://parseapi.back4app.com/classes/watchlists'
export const createList = async (carId) => {
    const data = {
        carId,
        watchers: []
    }
    const result = await request.post(`${base_url}`,data)
    
}

export const getOne = async (carId) => {
    const result = await request.get(`${base_url}?where={"carId":"${carId}"}`);
    return result.results[0]
}
export const getAll = async () => {
    const result = await request.get(`${base_url}`);
    return result.results
}


export const addToList = async (listId, data) => {
    const updated = await request.put(`${base_url}/${listId}`, data);

    return updated
}