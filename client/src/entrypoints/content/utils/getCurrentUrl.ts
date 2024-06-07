export const getCurrentUrl = () => {
    const url = new URL(document.baseURI);
    return url.origin + url.pathname;
}
