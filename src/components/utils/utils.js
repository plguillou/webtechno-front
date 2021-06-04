export const dateStringToLabel = (dateString) => {
    if(!dateString) return "";
    const date = new Date(dateString);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}
