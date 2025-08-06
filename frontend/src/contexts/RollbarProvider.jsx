import { Provider, ErrorBoundary } from '@rollbar/react'
import rollbarConfig from '../rollbar.js'

const RollbarProvider = ({ children }) => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  </Provider>
)

export default RollbarProvider
