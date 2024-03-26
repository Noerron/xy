export const setToken = (key,value)=>{
    sessionStorage.setItem(key,value)
}

export const getToken = ()=>{
    return sessionStorage.getItem('token')
}


export const removeToken = (key)=>{
    return sessionStorage.removeItem(key)
}

export const getpermission = ()=>{
    return JSON.parse(window.sessionStorage.getItem("permission"))
}
export const gettextpermission = ()=>{
    return window.sessionStorage.getItem("permission")
}