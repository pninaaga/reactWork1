import react from 'react'
import { Link, useLocation } from 'react-router-dom'
import img from '../../pic1.png'
import './detailsEmployee.css'


function DetailsEmployee() {

    const location = useLocation()
    const { employee } = location.state
    debugger;
    return(
        <>
        <div className="details-comp-container">
        <h3 className="title-details">Details employee</h3>
            <div className="details-container">
                <div className="details">
                    <lable>employee id:</lable>
                    <p>{employee.id}</p>
                </div>
                <div className="details">
                    <lable>first name:</lable>
                    <p>{employee.first_name}</p>
                </div>
                <div className="details">
                    <lable>last name:</lable>
                    <p>{employee.last_name}</p>
                </div>
                <div className="details">
                    <lable>email:</lable>
                    <p>{employee.email}</p>
                </div>
                <div className="details">
                    <lable>gender:</lable>
                    <p>{employee.gender}</p>
                </div>
                <div className="details">
                    <lable>birthdate:</lable>
                    <p>{employee.birthdate}</p>
                </div>
                <div className="details">
                    <lable>salary</lable>
                    <p>{employee.salary}</p>
                </div>
                <Link to="/" className="back-btn">Back</Link>
            </div>
            <div><img className="img" src={img}></img></div>
            </div>
        </>
    )
}

export default DetailsEmployee