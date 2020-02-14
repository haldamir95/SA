//es como el web.php

//express es un entorno del lado del servidor para 
import * as express from 'express'
//importamos el bikerController
import { bikerController } from '../controllers/biker-controller'
//exportamos el Router para crear los "links"
export const routerV1 = express.Router()

//clase tipo "controlador" donde van los metodos
class BikerRouter {

  EncenderMoto(req, res){
    res.send('RUM RUM');
  } 

  //metodo para aceptar una orden
  async acceptOrder (req, res) {
    console.log('ENTRANDO A ACEPTAR ORDEN')
    const { address, ...order } = req.body
    console.log(address)
    console.log(order)
    bikerController.addOrder(order)
    //await receptioncontroller.writeAllOrders()
    res.send({ success: true, id: bikerController.orderId })
  }
}

//instanciamos la clase Router
const motia = new BikerRouter()
//al router le creamos el metodo get con su funcion adjunta (Como en el web.php de laravel)
//routerV1.get('/get', motia.EncenderMoto)
routerV1.post('/accept', motia.acceptOrder)
