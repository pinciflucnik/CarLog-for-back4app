import {
    useContext,
    useEffect,
    useState
} from 'react'


import * as watchService from '../services/watchService'
import * as cars from '../services/carService'
import AuthContext from '../context/AuthContext';
import ErrorContext from '../context/ErrorContext';

export default function useWatch(carId) {
    const {
        auth
    } = useContext(AuthContext)
    const [watchersList, setWatchersList] = useState([]);
    const [watched, setWatchedList] = useState([]);
    const [isWatched, setIsWatched] = useState(false)
    const [listId, setListId] = useState('');
    const [allList, setAllLists] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const {
        errorSetter
    } = useContext(ErrorContext);

    useEffect(() => {
        watchService.getOne(carId)
            .then(data => {
                const list = data?.watchers
                const id = data?.objectId
                setWatchersList(list);
                setListId(id);
            })
            .catch((err) => {
                errorSetter(err)
            })
        watchService.getAll()
            .then(data => {
                setAllLists(data)
            })
            .catch((err) => {
                errorSetter(err)
            })

    }, [])
    useEffect(() => {
        setIsWatched(false)
        if (watchersList?.includes(auth.id)) {
            setIsWatched(true)
        }
    }, [watchersList])

    const addToWatched = async () => {
        const list = [...watchersList, auth.id]
        const data = {
            "objectId": listId,
            carId,
            "watchers": list
        }

        try {
            setIsPending(true)
            await watchService.addToList(listId, data)

            setWatchersList(list);
            setIsPending(false)
        } catch (error) {
            errorSetter(error)
            setIsPending(false)

        }
    }

    const getWatched = async () => {

        if (allList.length === 0) {
            return []
        }

        let carIds = [];
        allList.filter(l => {
            if (l.watchers.includes(auth.id)) {
                carIds.push(l.carId)
            }

        })
        try {
            const result = await cars.getAll();
            let watched = [];
            result.filter(r => {
                if (carIds.includes(r.objectId)) {
                    watched.push(r)
                }
                
            })

            setWatchedList(watched);
            return watched;


        } catch (error) {
            errorSetter(error)
        }



    }

    return {
        isWatched,
        allList,
        watched,
        addToWatched,
        getWatched,
        isPending
    }
}