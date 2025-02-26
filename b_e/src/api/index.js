import request from '../utils/request'

export const getCode = (data) => {
    return request.post('/get/code', data)
}

export const userAuthentication = (data) => {
    return request.post('/user/authentication', data)
}

export const login = (data) => {
    return request.post('/login', data)
}