import { defineStore } from 'pinia'
//@ts-ignore
import {Event} from '@/types/eventsType.ts'
export const useEventsStore = defineStore('events', {
    state: () => ({
        events: JSON.parse(localStorage.getItem('events')) || [],
        longDayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        shortDayNames:  ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
        monthNames : ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nove", "Dec"]
    }),
    actions: {
        async loadEvents() {
            this.events = await fetch('./events.json').then(res =>res.json()).then((res :[]) => {return res.map((item: Event) =>{               
                const d = new Date(Date.parse(item.date))
                const day = d.getDay()
                const date = d.getDate()
                const month = d.getMonth()
                const hour = d.getHours()
                const min = d.getMinutes() === 0 ? d.getMinutes() + '0' : d.getMinutes()
                return {  
                ...item,
                longDay : this.longDayNames[day],
                shortDay : this.shortDayNames[day],
                dayMonth: date < 10 ? '0' + date + ' ' + this.monthNames[month] : date + ' ' + this.monthNames[month],
                time: hour > 12 ? Number(hour - 12) + ':' + min + 'pm' : hour + ':' + min+ 'am'

}})}).then((res) => {localStorage.setItem('events', JSON.stringify(res)); return res;}).catch((err: String) => console.log(err))

}
        


    },
    getters: {
        getFilteredResults: (state) => (query) => query?.length ? state.events.filter(event => event.tag?.toLowerCase().includes(query.toLowerCase()) || event.place?.toLowerCase().includes(query.toLowerCase()) || event.title?.toLowerCase().includes(query.toLowerCase())  || event.town?.toLowerCase().includes(query.toLowerCase())) : state.events,
        getEvent: (state) => (id) => state.events.filter(event => event.id === Number(id))[0] || {}
    }
    

})