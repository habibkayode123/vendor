import React, {useState} from 'react'
import {create} from './api-user.js'
import {Link} from 'react-router-dom'



export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const user = {
			email: values.email || undefined,
			hashed_password: values.password || undefined
		};
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: '', open: true})
      }
    })
  }   
    return (
    <div>
         <h1>
            Sign Up
          </h1>
          <input id="email" type="email" label="Email"  value={values.email} onChange={handleChange('email')} /><br/>
          <input id="password" type="password" label="Password"  value={values.password} onChange={handleChange('password')}/>
     
          <button color="primary"  onClick={clickSubmit} >Submit</button>
          <Link to="/signin">
            <button color="primary" autoFocus="autoFocus" variant="contained">
              Sign In
            </button>
          </Link>
    </div>
  )
}