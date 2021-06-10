export const dateStringToLabel = (dateString, separator = "/") => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.getDate() + separator + (date.getMonth() + 1) + separator + date.getFullYear();
}


export const toYYYYMMDD = (dateString, separator = "") => {
    const date = new Date(dateString);
    const mm = date.getMonth() + 1 ; // getMonth() is zero-based
    const dd = date.getDate();
    const yyyy = "0".repeat(Math.max(0, 4-date.getFullYear().toString().length));

    return [yyyy + date.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join(separator);

}
