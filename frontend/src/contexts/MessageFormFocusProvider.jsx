import { useRef } from 'react'
import MessageFormFocusContext from './MessageFormFocusContext.jsx'

const MessageFormFocusProvider = ({ children }) => {
  const focusRef = useRef()

  const setFocus = () => {
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }

  return (
    <MessageFormFocusContext.Provider value={{ focusRef, setFocus }}>
      {children}
    </MessageFormFocusContext.Provider>
  )
}

export default MessageFormFocusProvider
