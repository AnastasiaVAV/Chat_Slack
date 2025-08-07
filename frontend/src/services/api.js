import axios from 'axios'

const apiPath = '/api/v1'

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),

  channelsPath: () => [apiPath, 'channels'].join('/'),
  channelPath: id => [apiPath, 'channels', id].join('/'),

  messagesPath: () => [apiPath, 'messages'].join('/'),
}

const getAuthHeader = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const apiRequests = {
  login: async (user) => {
    const response = await axios.post(routes.loginPath(), user)
    return response.data // => { token: ..., username: 'admin' }
  },
  signup: async (newUser) => {
    const response = await axios.post(routes.signupPath(), newUser)
    return response.data // => { token: ..., username: 'newUser' }
  },

  getChannels: async (token) => {
    const response = await axios.get(routes.channelsPath(), getAuthHeader(token))
    return response.data // [{ id: '1', name: 'general', removable: false }, ...]
  },
  addChannel: async (token, newChannel) => {
    const response = await axios.post(routes.channelsPath(), newChannel, getAuthHeader(token))
    return response.data // { id: '3', name: 'new name channel', removable: true }
  },
  editChannel: async (token, id, editedChannel) => {
    const response = await axios.patch(routes.channelPath(id), editedChannel, getAuthHeader(token))
    return response.data // { id: '3', name: 'new name channel', removable: true }
  },
  removeChannel: async (token, id) => {
    const response = await axios.delete(routes.channelPath(id), getAuthHeader(token))
    return response.data // { id: '3' }
  },

  getMessages: async (token) => {
    const response = await axios.get(routes.messagesPath(), getAuthHeader(token))
    return response.data // [{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
  },
  addMessage: async (token, newMessage) => {
    const response = await axios.post(routes.messagesPath(), newMessage, getAuthHeader(token))
    return response.data // { id: '1', body: 'new message', channelId: '1', username: 'admin }
  },
}

export default apiRequests
