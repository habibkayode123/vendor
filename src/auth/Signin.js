import React, {useState} from 'react'
import auth from './auth-helper'
import {Redirect} from 'react-router-dom'
import {signin} from './api-auth.js'

export default function Signin(props) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    redirectToReferrer: false
  })

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '',redirectToReferrer: true})
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const {from} = props.location.state || {
    from: {
      pathname: '/'
    }
  }
  const {redirectToReferrer} = values
  if (redirectToReferrer) {
      return (<Redirect to={from}/>)
  }

  return (
		<div>
			<h1>Sign IN</h1>
			{/* <form onSubmit={onFormSubmit}> */}
			<form>
				<input
					// onChange={(e) => setEmail(e.target.value)}
					id="email"
					type="email"
					label="Email"
					placeholder="Email"
					value={values.email}
					onChange={handleChange("email")}
				/>
				<input
					id="password"
					type="password"
					label="Password"
					value={values.password}
					onChange={handleChange("password")}
				/>
				<button onClick={clickSubmit}>SignIn</button>
			</form>
		</div>
	);
}


