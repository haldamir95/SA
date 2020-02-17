import * as express from 'express'
import { esbcontroller } from '../controllers/esb-controller'
import { fetchQuery } from '../request-manager'

export const routerV1 = express.Router()

class Esb{
    async acceptOrderFromClient (req, res) {
        const { address, ...order } = req.body
        esbcontroller.addOrder(order, address)
        console.log('Se recibio orden de un cliente\n')
        console.log(esbcontroller.orders[esbcontroller.orders.length-1])
        res.send({ success: true, id: esbcontroller.orderId })
    }
}

//rutas
const esb = new Esb()
routerV1.post('/acceptClient', esb.acceptOrderFromClient)