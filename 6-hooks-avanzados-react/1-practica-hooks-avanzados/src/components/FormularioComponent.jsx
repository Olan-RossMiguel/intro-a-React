import React, { useState } from 'react'

const FormularioComponent = () => {
const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    password: "",
})

const {userName, userEmail, password} = formData

const inputChange = (e) => {
    
}

  return (
    <form>
    <div className="mb-3">
        <label htmlFor="userName" className="form-label">Username</label>
        <input
            type="text"
            className="form-control"
            name="userName"
            value="userName"
            onChange={ InputChange }
        />
    </div>
    <div className="mb-3">
                <label htmlFor="userEmail" className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    name="userEmail"
                    value="userEmail"
                    onChange={ InputChange }
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={ InputChange }
                />
            </div>
            <button
                type="submit"
                className="btn btn-primary"
            >
                Submit
            </button>
        </form>
  )
}

export default FormularioComponent
