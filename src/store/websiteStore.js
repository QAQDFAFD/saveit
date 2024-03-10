import { defineStore } from 'pinia'
import store from 'store2'

const useWebsiteStore = defineStore('websiteStore', {
    state() {
        return {
            websites: []
        }
    },
    actions: {
        addWebsite(website) {
            this.websites.unshift(website)
            store.set('websites', this.websites)
            // console.log('website added', website)
        },
        init() {
            this.websites = store.get('websites') || []
        },
        deleteWebsite(website) {
            this.websites = this.websites.filter(w => w.url !== website)
            store.set('websites', this.websites)
        }
    }
})

export default useWebsiteStore
