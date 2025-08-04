import { useRef } from 'react'
import { MessageFormContext } from '../../../contexts/MessageFormContext'

const FocusProvider = ({ children }) => {
  const focusRef = useRef()

  const setFocus = () => {
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }

  return (
    <MessageFormContext.Provider value={{ focusRef, setFocus }}>
      {children}
    </MessageFormContext.Provider>
  )
}

export default FocusProvider
