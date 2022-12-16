import { Grid, Modal } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { donateCompaign, getAllCompaigns } from 'Redux/compaign.slice'
import { useRedirect } from 'Hooks/location'
import CompaignList from 'Components/CompaignList'
import DonationModal from 'Components/DonationModal'

export default function Section() {
  const [donateModalOpen, setDonateModalOpen] = useState(false)
  const [filteredCompaign, setFilteredCompaign] = useState(false)
  const [donatorBalance, setDonatorBalance] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const initialDonatorState = useMemo(
    () => ({
      goalAmount: 0,
      donatorName: '',
      address: '',
    }),
    []
  )
  const [donatorState, setDonatorState] = useState(initialDonatorState)
  const { navigateHome } = useRedirect()
  const dispatch = useDispatch()

  const modalOpenHandler = item => {
    setDonateModalOpen(true)
    setFilteredCompaign(item)
  }

  const modalCloseHandler = item => {
    setDonateModalOpen(false)
    setDonatorState(initialDonatorState)
    setErrorMessage('')
    setDonatorBalance(0)
  }

  const handleDonatorBalance = value => {
    setDonatorBalance(value)
  }

  const handleChangeDonatorData = (evt, type, value) => {
    const newValue = value || evt.target.value
    if (
      (type === 'goalAmount' && newValue.length > 10) ||
      (type === 'donatorName' && newValue.length > 20)
    )
      return
    setDonatorState(prev => ({
      ...prev,
      [type]: newValue,
    }))
  }

  const handleSubmitDonatorData = () => {
    if (!+donatorState.goalAmount) {
      setErrorMessage('Goal is invalid')
      return
    } else if (!donatorState.donatorName.trim()) {
      setErrorMessage('Enter your name, please')
      return
    } else if (!donatorState.address) {
      setErrorMessage('Connect your metamask address, please')
      return
    } else if (donatorBalance < donatorState.goalAmount) {
      setErrorMessage('Balance error')
      return
    } else {
      setErrorMessage('')
      dispatch(donateCompaign({ ...donatorState, compaignId: filteredCompaign.id, navigateHome }))
        .then(modalCloseHandler)
        .catch(modalCloseHandler)
    }
  }

  useEffect(() => {
    const signal = dispatch(getAllCompaigns())
    return () => {
      signal.abort()
    }
  }, [dispatch])

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        item
        gap={4}
        sm={11}
        md={8}
        sx={{ pt: 10, margin: '0 auto' }}
      >
        <CompaignList modalOpenHandler={modalOpenHandler} />
        <Modal open={donateModalOpen} onClose={modalCloseHandler}>
          <>
            <DonationModal
              filteredCompaign={filteredCompaign}
              donatorState={donatorState}
              errorMessage={errorMessage}
              handleDonatorBalance={handleDonatorBalance}
              handleChangeDonatorData={handleChangeDonatorData}
              handleSubmitDonatorData={handleSubmitDonatorData}
            />
          </>
        </Modal>
      </Grid>
    </>
  )
}
