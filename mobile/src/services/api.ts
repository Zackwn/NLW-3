import axios from 'axios'

export const ip = '192.168.0.2'

const api = axios.create({
   baseURL: `http://${ip}:3333`
})

export default api