export const auth = {
    name: 'auth',
    url: '/auth/local',
    endpoints: {
        login: {
            method: "post",
            route: "/"
        },
        refreshToken: {
            method: "post",
            route: "/refreshToken"
        },
        
    }
}
