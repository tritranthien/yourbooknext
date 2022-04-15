import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:3000'
})

export const getAuthHeader = () => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    }
}