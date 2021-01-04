export const setToken = (token) => {
    localStorage.setItem('barberoo-token', token)
}
export const getToken = () => {
    return localStorage.getItem('barberoo-token')
}
export const removeToken = () => {
    localStorage.removeItem('barberoo-token')
}