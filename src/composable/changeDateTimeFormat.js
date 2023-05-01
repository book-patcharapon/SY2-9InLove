const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };

const changeDateTimeFormat = (date) => {
    const dateTime = new Date(date)
    if(dateTime.getFullYear() > 1970) {
        return dateTime.toLocaleDateString("en-GB", options)
    }
    else{
        return "-"
    }
}

export { changeDateTimeFormat }