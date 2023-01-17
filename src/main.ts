import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <h1>Websocket - Client</h1>

  <input id="jwtToken" placeholder="JWT" />
  <button id="btnConnect">Connect</button>

   <br />
   <br />
   <span class="title" id="server-status">Server Status: Offline </span>


   <p class="title">Clients Connected</p>
   <ul id="clients-list">
   </ul>

   <form id="message-form">
    <input placeholder="message" id="message-input" />
   </form>

   <p class="title">Messages</p>
   <ul id="messages"></ul>

  </div>
`
const inputJwt = document.querySelector<HTMLInputElement>('#jwtToken')!
const buttonConnect = document.querySelector<HTMLButtonElement>('#btnConnect')!

buttonConnect.addEventListener('click', () => {
  if (inputJwt.value.trim().length <= 0) return alert('Enter a valid JWT')
  connectToServer(inputJwt.value.trim())
})
