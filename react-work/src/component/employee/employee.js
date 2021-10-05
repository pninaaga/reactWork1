import react, { useState } from 'react'
import { connect, connectAdvanced } from 'react-redux'
import { Link } from 'react-router-dom'
import './employee.css';

function mapStateToProps(state) {
    return {
        employee: state.employeeReducer.employee
    }
}

export default connect(mapStateToProps)(
    function Employee(props) {

        const { employee } = props
        const [employees, setEmployees] = useState(employee)
        const [employeeName, setEmployeeName] = useState(employee)
        const [chooseEmployee, setChooseEmployee] = useState([])
        const [allCheck, setAllCheck] = useState(false)
        const [status, setStatus] = useState({ statusEm: '', idEm: '' })
        const [showPayment, setShowPayment] = useState(false)
        const [showCancelPayment, setShowCancelPayment] = useState(false)


        function searchEmployee(value) {
            setEmployeeName(value ? employee.filter(em => em.first_name.includes(value)) : employee)
        }

        function sortEmployee(value) {
            setEmployeeName(employeeName.slice().sort((a, b) => a.first_name.localeCompare(b.first_name)))
        }

        function payment() {
            // setChooseEmployee(chooseEmployee.map(item => {
            //     if (!item["payment"]) {
            //         debugger;
            //         return { "item": item, "payment": true }
            //     }
            //     else {
            //         debugger;
            //         return item
            //     }
            // }));
            setEmployees(chooseEmployee.map(ite => {
                let indexEm
                employee.item ? indexEm = employee.item.indexOf(ite) : indexEm = employee.indexOf(ite)
                if (!employee[indexEm].payment)
                    return { "item": employee[employee.indexOf(ite)], "payment": true }
                else
                    return ite
            }))
            setStatus({ statusEm: '', idEm: '-1' })
            console.log('employee+payment', employee)
            setShowPayment(true)
        }

        function cancelPayment() {
            setEmployees(chooseEmployee.map(ite => {
                let indexEm
                employee.item ? indexEm = employee.item.indexOf(ite) : indexEm = employee.indexOf(ite)
                if (!employee[indexEm].payment)
                    return { "item": employee[employee.indexOf(ite)], "payment": false }
                else
                    employee[employee.indexOf(ite)]["payment"] = false
            }))
            console.log('employee+payment', employee)
            setStatus({ statusEm: '', idEm: '-1' })
            setShowCancelPayment(true)
        }
        function checkAll() {
            setChooseEmployee(chooseEmployee.concat(employee))
            setAllCheck(true)
           
            setEmployees(employees)
        }
        function uncheckAll() {
            setChooseEmployee([])
            setAllCheck(false)
            setEmployees(employees)

        }
        function changeCheckBox(e, id) {
            if (e.checked)
                setChooseEmployee(chooseEmployee.concat(employee[id - 1]))
            else
                setChooseEmployee(chooseEmployee.filter(em => em.item ? em.item.id != id : em.id != id))
        }

        function statusEmployee(id) {
            debugger
            const statusEmp = employees.find(em => em.item && em.item.id == id)
            setStatus({ statusEm: statusEmp && statusEmp.payment, idEm: id })
        }

        return (
            <>
                <div className="nav-container">
                    <h3 className="title">Employee - exercise</h3>
                    <div className="btn-container">
                        <div className="search-container">
                            <input class="form-control me-2" type="search"
                                placeholder="Search" aria-label="Search" onChange={e => searchEmployee(e.target.value)} />
                        </div>
                        <button onClick={sortEmployee}>sort</button>
                        <button onClick={checkAll}>Check all</button>
                        <button onClick={uncheckAll}>Uncheck all</button>
                        <button onClick={payment} onBlur={e => setShowPayment(false)}>Payment </button>
                        <div style={{ 'display': showPayment ? 'block' : 'none' }} className="payment-text">payment! :)</div>
                        <button onClick={cancelPayment} onBlur={e => setShowCancelPayment(false)}>Cancel payment </button>
                        <div style={{ 'display': showCancelPayment ? 'block' : 'none' }} className="payment-cancel-text">payment cancel! :)</div>
                    </div>
                </div>
                <div className="employee-container">{employeeName.map(em =>
                    <div className="employee">
                        <input
                            // checked={allCheck? true:false}
                            class="form-check-input"
                            type="checkbox" 
                            value="" 
                            id={em.id} 
                            onChange={e => changeCheckBox(e.target, em.id)} />
                        <div for={em.id} className="data-employee">
                            <p>{em.first_name}</p>
                            <p>{em.last_name}</p>
                            <Link to={{
                                pathname: `/${em.id}`,
                                state: { employee: em }
                            }} className="more-link">More</Link>
                            <button
                                style={{ 'display': chooseEmployee[chooseEmployee.indexOf(em)] ? 'block' : 'none' }}
                                onClick={e => statusEmployee(em.id)} className="statusBtn">show status</button>
                            <p style={{ 'display': status.idEm == em.id ? 'block' : 'none' }}>
                                {status.statusEm ? "true" : status.statusEm == false ? "false" : "don't have status"}</p>
                        </div>
                    </div>)}</div>
            </>
        )
    }
)

