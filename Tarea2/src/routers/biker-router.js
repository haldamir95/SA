//es como el web.php

//express es un entorno del lado del servidor para 
import * as express from 'express'

export const routerV1 = express.Router()

class BikerRouter {

  EncenderMoto(req, res){
    res.send('RUM RUM');
  } 

  async acceptOrder (req, res) {
    const { order } = req.body

    console.log(`No. de orden ${order}, recibido por cliente`)
    res.send({ received: true })
  }
}

//instanciamos la clase Router
const motia = new BikerRouter()
//al router le creamos el metodo get con su funcion adjunta (Como en el web.php de laravel)
routerV1.get('/get', motia.EncenderMoto)
