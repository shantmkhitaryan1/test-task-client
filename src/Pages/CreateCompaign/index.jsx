import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCompaign } from 'Redux/compaign.slice'
import { useRedirect } from 'Hooks/location'
import Navbar from 'Components/Navbar'
import CreateCompaignForm from 'Components/CreateCompaignForm'

export default function CreateCompaign() {
  const [state, setState] = useState({
    name: '',
    description: '',
    goalAmount: '',
    expiresIn: new Date(Date.now()).toLocaleDateString(),
  })
  const { navigateHome } = useRedirect()
  const dispatch = useDispatch()

  const handleChange = (evt, type) => {
    if (type === 'goalAmount' && evt.target.value.length > 10) return
    setState(prev => ({
      ...prev,
      [type]: evt.target.value,
    }))
  }

  const submitHandler = () => {
    if (Object.values(state).some(item => !item.trim()) || state.expiresIn === 'Invalid Date')
      return
    dispatch(createCompaign({ ...state }))
    .then(res => !res.error && navigateHome())
  }

  const handleDate = value =>
    setState(prev => ({
      ...prev,
      expiresIn: new Date(value).toLocaleDateString(),
    }))

  return (
    <>
      <Navbar signed={true} />
      <CreateCompaignForm
        name={state.name}
        description={state.description}
        goalAmount={state.goalAmount}
        expiresIn={state.expiresIn}
        handleChange={handleChange}
        submitHandler={submitHandler}
        handleDate={handleDate}
      />
    </>
  )
}
