import { defineStore } from 'pinia'
import type { Dish } from '@/types'

type StoreShape = {
  list: Dish[]
}
export const useDishStore = defineStore('DishStore', {
  state: (): StoreShape => ({
    list: [
      {
        id: '7d9f3f17-964a-4e82-98e5-ecbba4d709a1',
        name: 'Ghost Pepper Poppers',
        status: 'Want to Try',
      },
      {
        id: '5c986b74-fa02-4a22-98f2-b1ff3559e85e',
        name: 'A Little More Chowder Now',
        status: 'Recommend',
      },
      {
        id: 'c113411d-1589-414f-a283-daf7eedb631e',
        name: 'Full Laptop Battery',
        status: 'Do Not Recommend',
      },
    ],
  }),
  getters: {},
  actions: {
    addDish(payload: Dish) {
      this.list.push(payload)
    },
    editDish(payload: Dish) {
      this.list = this.list.map((listDish) => (listDish.id === payload.id ? payload : listDish))
    },
    deleteDish(payload: Dish) {
      this.list = this.list.filter((dish) => dish.id !== payload.id)
    },
  },
})