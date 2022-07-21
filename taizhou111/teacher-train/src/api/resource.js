import request from '@/utils/request'

export const getResourceList = (params) => request.get('/resource/resource/list', {params})

export const saveResource = (params) => request.post('/resource/resource/save', params)

export const delResource = (params) => request.post('/resource/resource/delete', params)