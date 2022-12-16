import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function useRedirect() {
  const navigate = useNavigate()

  const navigateHome = useCallback(() => navigate('/'), [navigate])
  const navigateToSignIn = useCallback(() => {
    const token = localStorage.getItem('token')
    navigate(!token ? '/sign-in' : '/create')
  }, [navigate])
  const navigateToCreate = useCallback(() => navigate('/create'), [navigate])

  return {
    navigateToSignIn,
    navigateHome,
    navigateToCreate,
  }
}
