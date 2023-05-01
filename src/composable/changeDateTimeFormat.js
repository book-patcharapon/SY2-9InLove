const options = {
    // day: 'numeric',
    // month: 'short',
    // year: 'numeric',
    // hour: 'numeric',
    // minute: '2-digit',
    // hour12: false
    dateStyle: 'medium',
    timeStyle: 'short'
}

const changeDateTimeFormat = (date) => {
    const dateTime = new Date(date)
    if(dateTime.getFullYear() > 1970) {
        return dateTime.toLocaleString("en-GB", options)
    }
    else{
        return "-"
    }
}

export { changeDateTimeFormat }