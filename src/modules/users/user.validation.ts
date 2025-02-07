import { z } from "zod";

const userValidationSchema = z.object({
    body:z.object({
        name:z.string().max(20,{message:"name cannot be more than 20 char"}),
        email:z.string(),
        password:z.string().max(20,{message:"password cannot be more than 20 char"}),
        role:z.enum(['user','admin']).default("user"),
        isDeleted:z.boolean().optional().default(false),
        status:z.enum(["in-progress","blocked"]).default("in-progress")

    })
})


export const UserValidation = {
    userValidationSchema
}