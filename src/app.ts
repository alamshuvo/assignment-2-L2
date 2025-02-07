import express, { Application, NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './routes'
import globalErrorHandler from './middleWare/globalErrorHandler'
import notFoundRoute from './middleWare/middleWare'

const app:Application = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:['http://localhost:5173'],credentials:true}))

app.use('/api', router)


app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Car Server Live',
  })
})




//global error handeler
app.use(globalErrorHandler)
//not found error
app.use(notFoundRoute)

export default app
