export const productsSelector = ({products}) => {
    const {entities} = products;
    if(!entities) return []
    return Object.values(entities)
}
