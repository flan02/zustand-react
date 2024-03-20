import { create } from 'zustand'
import { produce } from "immer"

interface User {
  id: string
  friends: string[]
  profile: Profile // this prop has two nested objects
}

type Profile = { // nested object 1
  name: string
  email: string
  address: Address
}

type Address = { // nested object 2
  street: string
  city: string
  zipCode: string
}

type UserStore = {
  user: User
  updateAddressStreet: (street: string) => void
}

const initialState = {
  user: {
    id: "1",
    friends: ["jack", "jill", "jessica", "jason"],
    profile: {
      name: "john doe",
      email: "john.doe@example.com",
      address: {
        street: "123 Main St",
        city: "Phoenix",
        zipCode: "85001"
      }
    }
  }
}

/*
* The common way with only Zustand
export const useStore = create<UserStore>((set) => ({
  ...initialState,
  updateAddressStreet: (street: string) =>
    set((state) => ({
      // We copy the state and update the nested object
      user: {
        ...state.user, // maintain the same info
        profile: {
          ...state.user.profile, // maintain the same info
          address: {
            ...state.user.profile.address, // maintain the same info
            street // only update the street
          }
        }
      }
    }))
}))
*/

// TODO The Immer way (better way to update data when you have deeply nested objects)

export const useStore = create<UserStore>((set) => ({
  ...initialState,
  updateAddressStreet: (street: string) => set(produce((state) => {
    state.user.profile.address.street = street
  })
  )
}))