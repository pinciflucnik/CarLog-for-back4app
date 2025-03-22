import * as request from '../lib/requester';

const baseUrl = 'https://parseapi.back4app.com/classes/cars';

export const create = async (data, token) => {    
    
    const result = await request.post(`${baseUrl}`, data, token);
    return result
}

export const getAll = async () => {
    const result = await request.get(`${baseUrl}`);
    return result.results;
}

export const getMyCars = async (id) => {
    const result = await request.get(`${baseUrl}?where={"ownerId":"${id}"}`)
    return result.results;
}

export const getOne = async (id) => {
    const result = await request.get(`${baseUrl}/${id}`);
    return result;
}

export const remove = async (id, token) => {
    await request.remove(`${baseUrl}/${id}`, null, token)
}

export const update = async (data, token) => {
    const result = await request.put(`${baseUrl}/${data.objectId}`, data, token)
    return result
}
