//attach token to every request with common function
api.interceptors.request.use((config)=>{
    const token = getToken() // from state or cookie

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

//handle token expiry silently
api.interceptors.response.use(
    (res)=> res, //success- pass through
    async(error) => {
        if(error.response?.status === 401){
            const newToken = await refreshToken()
            error.config.headers.Authorization = `Bearer ${newToken}`
            return api(error.config)
        }
    }
)

//protected routes
const protectedRoute = ({children})=> {
    const {isAuthenticated} = useAuth()

    if(!isAuthenticated){
        return <Navigateto='/login' replace />
    }
    return children
}

<protectedRoute><Dashboard/></protectedRoute>;

// logout client side
const logout = async()=> {
await api.post('/auth/logout')

setUser(null);
setAccessToken(null)

queryClient.clear()

NavigateEvent('/logout')
}