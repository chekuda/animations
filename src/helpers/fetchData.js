//Dummy Data
import { feed } from './feed'

const ALLFEEDS = feed() || {}

export const myFetch = (type, currentIndex, amount) => {
  return new Promise((resolve, reject) => {
    const allFeeds = ALLFEEDS[type] || []
    const currentAmount = amount || allFeeds.length
    const newIndex = currentIndex + currentAmount

    const fetchedFeeds = allFeeds
      .slice(currentIndex)
      .filter((_, index) => index <= currentAmount)

    const dataToReturn = {
      fetchedFeeds,
      newIndex: newIndex + 1,
      feedAvailable: allFeeds.length > newIndex + 1
    }

    setTimeout(() => resolve(dataToReturn), 1000)
  })
}
