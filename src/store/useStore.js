import { create } from 'zustand'

export const useStore = create((set) => {

    return {
        hasError: false,
        errorMessages : {
            secretFriend: null,
            bucket: null,
            organizer: null,
            eventDate: null,

            
    }

    }
})