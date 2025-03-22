import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";
import ErrorContext from "../context/ErrorContext";
import maintenanceService from "../services/maintenanceService";


export default function useMaintain(){
    const { auth } = useContext(AuthContext);
    const { errorSetter } = useContext(ErrorContext);
    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate();
    const token = auth.accessToken;
    const [current, setCurrent] = useState({
        title: '',
        price: ''
    });

    const createHandler = async (formData, carId) => {
        const data = {...Object.fromEntries(formData), carId}
        data.title = data.title.toLowerCase();
        data.price = Number(data.price);
        try {
            setIsPending(true)
            const result = await maintenanceService.create(data, token);

            navigate(`/cars/${carId}/details`);
            setIsPending(false)

        } catch (error) {
            errorSetter(error);
        }
    }
    const getLatestHandler = async (carId) => {
        try {
            const result = await maintenanceService.getLast(carId);
            return result;
            
        } catch (error) {
            errorSetter(error);
        }
    }
    const getAllHandler = async (carId) => {
        try {
            const result = await maintenanceService.getAllDesc(carId);
            return result;
        } catch (error) {
            errorSetter(error)
        }
    }
    const sumAll = async (carId) => {
        try {
            const all = await maintenanceService.getAllDesc(carId);
            let sum = 0;
            all.map(m => {
                sum += m.price
            })
            return sum;
        } catch (error) {
            errorSetter(error)
        }
    }  
    const deleteMaintenance = async (id, carId) => {
        try {
            setIsPending(true)
            await maintenanceService.delete(id, token);
            navigate(`/cars/${carId}/details`) 
            setIsPending(false)
           
        } catch (error) {
            errorSetter(error)
        }

    }
    const getSingleMaintenance = async (id) => {
        try {
            const result = await maintenanceService.getOne(id);
            return result;  
        } catch (error) {
            errorSetter(error)
        }
    }
    const setMyCurrent = (data) => {
        setCurrent(data);
    }
    const editMaintenance = async (formData) => {
        const edited = Object.fromEntries(formData);
        edited.price = Number(edited.price);
        edited.objectId = current.objectId;
        edited.carId = current.carId;
        
        try {
            setIsPending(true)
            const result = await maintenanceService.edit(current.objectId, edited, auth.accessToken);
            setIsPending(false)
            return result;
        } catch (error) {
            
            errorSetter(error)
        }
    }

    return {
        createHandler,
        deleteMaintenance,
        getLatestHandler,
        getAllHandler,
        getSingleMaintenance,
        sumAll,
        setMyCurrent,
        editMaintenance,
        current,
        isPending
    }

}