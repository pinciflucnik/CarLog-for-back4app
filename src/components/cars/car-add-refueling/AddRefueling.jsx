import { useContext } from "react"
import AuthContext from "../../../context/AuthContext"
import useRefuel from "../../../hooks/useRefuel";

export default function AddRefueling({
    modalClose,
    carId,
    odometer
}) {
    const { auth } = useContext(AuthContext);
    const { refuel } = useRefuel()

    const submitHandler = async (data) => {
        await refuel(data, carId, auth.accessToken);
        modalClose({target: {value: "refuel"}})
    }

    return (
        <div className="modal my-modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Refuel</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={modalClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <form action={submitHandler}>
                        <div className="modal-body">
                            <div className="second-body">
                                <label htmlFor="km">Odometer reading</label>
                                <input type="number" id="km" name="km" min={odometer + 1} required/>
                                <label htmlFor="liters">Liters</label>
                                <input type="number" id="liters" name="liters" step="any" required/>
                                <fieldset required>
                                    <p>Is tank full?</p>
                                    <div>
                                        <label htmlFor="full">Yes</label>
                                        <input type="radio" id="full" name="full" value={true} />
                                    </div>
                                    <div>
                                        <label htmlFor="notFull">No</label>
                                        <input type="radio" id="notFull" name="full" defaultChecked value={false} />
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="welcome-btn smaller">Save</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={modalClose}>Close</button>
                        </div>
                    </form>
                </div >
            </div >
        </div >
    )
}