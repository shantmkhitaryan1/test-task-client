import { Box, Divider } from '@mui/material'
import ModalFields from 'Components/ModalFields'
import WalletCard from 'Components/WalletCard'

export default function DonationModal({
  filteredCompaign,
  donatorState,
  handleChangeDonatorData,
  handleSubmitDonatorData,
  errorMessage,
  handleDonatorBalance,
}) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 700,
        minWidth: 500,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}
    >
      <ModalFields
        filteredCompaign={filteredCompaign}
        goalAmount={donatorState.goalAmount}
        donatorName={donatorState.donatorName}
        handleSubmitDonatorData={handleSubmitDonatorData}
        handleChangeDonatorData={handleChangeDonatorData}
      />
      <Divider />
      <WalletCard
        errMessage={errorMessage}
        donatorAddressChangeHandler={value => handleChangeDonatorData(null, 'address', value)}
        handleDonatorBalance={handleDonatorBalance}
      />
    </Box>
  )
}
