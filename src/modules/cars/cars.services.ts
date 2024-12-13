import iCars from "./cars.interface";
import Cars from "./cars.model";

const createCars = async(payLoad:iCars): Promise<iCars>=>{
    const result = await Cars.create(payLoad)
    return result
}

const getCars= async ()=>{
    const result = await Cars.find();
    return result;
}

const getSingleCars= async (id:string)=>{
    const result =await Cars.findById(id);
    return result
}
const getUpdateCars= async (id:string,data:iCars)=>{
    const result =await Cars.findByIdAndUpdate(id,data,{
        new:true,
    });
    
    return result
}
const deleteCars= async (id:string)=>{
    const result =await Cars.findByIdAndDelete(id);
    return result
}

export const carsServices = {
    createCars,
    getCars,
    getSingleCars,
    getUpdateCars,
    deleteCars
}