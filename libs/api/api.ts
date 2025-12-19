import axios from 'axios'

export default axios.create({
    baseURL: 'http://127.0.0.1:3000'
})

export const getAuthHeader = () => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    }
}