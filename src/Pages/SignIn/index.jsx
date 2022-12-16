import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from 'Redux/auth.slice'
import { useRedirect } from 'Hooks/location'
import Navbar from 'Components/Navbar'
import SignInForm from 'Components/SignInForm'

export default function SignIn() {
  const [state, setState] = useState({
    username: '',
    password: '',
  })
  const dispatch = useDispatch()
  const { navigateToCreate } = useRedirect()

  const handleChange = (evt, type) => {
    if (evt.target.value.length > 30) return
    setState(prev => ({
      ...prev,
      [type]: evt.target.value,
    }))
  }

  const submitHandler = () => {
    if (Object.values(state).some(item => !item.trim())) return
    dispatch(signIn({ ...state, navigateToCreate }))
  }

  return (
    <>
      <Navbar signed={true} />
      <SignInForm 
        username={state.username}
        password={state.password}
        handleChange={handleChange}
        submitHandler={submitHandler}
      />
    </>
  )
}
