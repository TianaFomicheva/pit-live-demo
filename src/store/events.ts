import { defineStore } from 'pinia'
import { Event } from '../types/eventsType'
import useLocalStorage  from '../composables/useLocalStorage.js'
import useFormattedDate from '../composables/useFormattedDate.js'
const useLocal = useLocalStorage()
const useFormatted = useFormattedDate()

export const useEventsStore = defineStore('events', {
    state: () => ({
        events: useLocal.getFromStorage('events') || []
    }),

    actions: {
        async loadEvents() {
            this.events = await fetch('./events.json')
                .then(res => res.json())
                .then((res: []) => {
                    return res.map((item: Event) =>
                        useFormatted.setFormattedDateView(item)
                    )
                })
                .then((res) => { useLocal.setToStorage('events', res); return res; }).catch((err: String) => console.log(err))
        }
    },
    getters: {
        getFilteredResults: (state) => (query) => query?.length ? state.events.filter(event => event.tag?.toLowerCase().includes(query.toLowerCase()) || event.place?.toLowerCase().includes(query.toLowerCase()) || event.title?.toLowerCase().includes(query.toLowerCase()) || event.town?.toLowerCase().includes(query.toLowerCase())) : state.events,
        getEvent: (state) => (id) => state.events.filter(event => event.id === Number(id))[0] || {}
    }
})