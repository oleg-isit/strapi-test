export const products = {
    name: 'products',
    url: '/products',
    endpoints: {
        getAll: {
            method: "get",
            route: "/",
            query: ["populate"],
            token: true
        },
        update: {
            method: "put",
            route: "/{id}",
            token: true
        },
        delete: {
            method: "delete",
            route: "/{id}",
            token: true
        },


    }
}
