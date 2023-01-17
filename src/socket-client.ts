import { Manager, Socket } from 'socket.io-client'
let socket: Socket

export const connectToServer = (token: string) => {
  const manager = new Manager('localhost:4000/socket.io/socket.io.js', {
    extraHeaders: { authentication: token },
  })
  socket?.removeAllListeners()
  socket = manager.socket('/')
  // localhost:4000/socket.io/socket.io.js
  addListeners()
}

const addListeners = () => {
  const serverStatusLabel = document.querySelector('#server-status')!
  const clientsList = document.querySelector<HTMLUListElement>('#clients-list')!
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!

  const messagesList = document.querySelector<HTMLUListElement>('#messages')!

  socket.on('connect', () => {
    serverStatusLabel.textContent = 'Server Status: Online'
  })

  socket.on('disconnect', () => {
    serverStatusLabel.textContent = 'Server Status: Offline'
  })

  socket.on('clients-updated', (clients: string[]) => {
    const clientsElements = clients.map((client) => `<li>${client}</li>`).join('')
    clientsList.innerHTML = clientsElements
  })

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (messageInput.value.trim().length <= 0) return
    socket.emit('message-from-client', { id: 'yo', message: messageInput.value })
    messageInput.value = ''
  })

  socket.on('message-from-server', ({ fullName, message }: { fullName: string; message: string }) => {
    const messages = messagesList.innerHTML + `<li> <span>${fullName}</span>: ${message}</li>`
    messagesList.innerHTML = messages
  })
}
