const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_CLIENT_TOKEN,
  environment: 'development',
  captureUncaught: true, // Ловит обычные ошибки
  captureUnhandledRejections: true, // Ловит необработанные Promise
}

export default rollbarConfig
