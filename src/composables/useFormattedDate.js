function useformattedDate() {
    const longDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nove", "Dec"]

    function setFormattedDateView(item) {
        const d = new Date(Date.parse(item.date))
        const day = d.getDay()
        const date = d.getDate()
        const month = d.getMonth()
        const hour = d.getHours()
        const min = d.getMinutes() === 0 ? d.getMinutes() + '0' : d.getMinutes()
        return {
            ...item,
            longDay: longDayNames[day],
            shortDay: shortDayNames[day],
            dayMonth: date < 10 ? '0' + date + ' ' + monthNames[month] : date + ' ' + monthNames[month],
            time: hour > 12 ? Number(hour - 12) + ':' + min + 'pm' : hour + ':' + min + 'am'
        }
    }

    return { setFormattedDateView }
}
export default useformattedDate