export const headerContentSelector = ({content}) => {
    const {header} = content;
    if(!header) return null;
    const {attributes} = header;
    const {companyName, description} = attributes;
    const logoUrl = attributes?.logo.data.attributes.url;
    return {companyName, logoUrl, description}
}
