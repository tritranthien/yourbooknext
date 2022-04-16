import axios from 'axios'

export default axios.create({
    baseURL: 'https://yourbook-be-node.vercel.app/'
})

export const getAuthHeader = () => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    }
}