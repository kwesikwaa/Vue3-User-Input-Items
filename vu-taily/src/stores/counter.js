import { defineStore } from 'pinia'

export const useAdminStore = defineStore("admin",{
  
  state: () => ({
    counter: 0,
    croppedimage: ''
    
  }),
  getters: {
    doubleCount: (state) => state.counter * 2

  },
  actions: {
    increment() {
      this.counter++
    },
    clear(){
      this.croppedimage = ''
    },
    savecroppedimage(value){
      this.croppedimage = value;

    }
  }
})


