export const productsSelector = ({products}) => {
    const {entities} = products;
    if (!entities) return []
    return [...entities.values()]
}
