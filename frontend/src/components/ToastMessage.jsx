const ToastMessage = ({ children }) => {
  return (
    <div role="alert" className="Toastify__toast-body">
      {children}
    </div>
  )
}

export default ToastMessage
