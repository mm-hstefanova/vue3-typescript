import type { restaurantStatusList, dietList } from './constants'

export type Restaurant = {
  id: string
  name: string
  address: string
  website: string
  status: Status
  diet?: Diet
}

export type Dish = {
  id: string
  name: string
  status: Status
  diet?: Diet
}

// DRY - we use the constants as type values for Status and Diet
type Status = typeof restaurantStatusList[number]
type Diet = typeof dietList[number]
