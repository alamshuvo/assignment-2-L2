import iCars from './cars.interface'
import Cars from './cars.model'

const createCars = async (payLoad: iCars): Promise<iCars> => {
  const result = await Cars.create(payLoad)
  return result
}
const getCars = async (searchTerm?: string): Promise<iCars[]> => {
  // Define the filter object
  const filter: {
    $or?: { brand?: RegExp; model?: RegExp; category?: RegExp }[]
  } = {}
  // Add $or condition for searchTerm matching specific fields
  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i')
    filter.$or = [{ brand: regex }, { model: regex }, { category: regex }]
  }
  // Query the database
  const result = await Cars.find(filter)
  return result
}

const getSingleCars = async (id: string) => {
  const result = await Cars.findById(id)
  return result
}
const getUpdateCars = async (id: string, data: iCars) => {
  const result = await Cars.findByIdAndUpdate(id, data, {
    new: true,
  })

  return result
}
const deleteCars = async (id: string) => {
  const result = await Cars.findByIdAndDelete(id)
  return result
}

export const carsServices = {
  createCars,
  getCars,
  getSingleCars,
  getUpdateCars,
  deleteCars,
}
