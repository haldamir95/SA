import { Server } from '../server'
import { routerV1 as receptionRouter } from '../../routers/reception-router'
import { fetchQuery } from '../../request-manager'
//import { configuration } from '../../config/config'
import { receptioncontroller } from '../../controllers/reception-controller'
import { lineReader } from '../../line-reader'

class ReceptionServer extends Server {
  constructor () {
    super(3001)
    super.routers(receptionRouter)
    this.menuMsn = '------ Ordenes sin procesar ------'
    this.consoleMsn = '------ Ingrese 0 para salir y 1 para mostrar menú ------\n'
  }

  async showOrders () {
    console.log(this.menuMsn)
    const orders = receptioncontroller.orders.map((el, idx) => {
      if (el.status === 0) {
        console.log(`${idx + 1}.`, `C-${el.id.toString().padStart(6, '0')}`)
        return idx
      }
    })
    if (orders.length === 0) {
      console.log('------ No hay ordenes pendientes ------')
      return
    }
    let opt = -1
    while (!orders.includes(opt = await lineReader.askNumericQuestion('Elegir número de orden\n')));
    receptioncontroller.changeStatus(opt, 1)
    //this.placeOrder(opt)
  }

  placeOrder (index) {
    const { id, address } = receptioncontroller.orders[index]
    //(URL, metodo(POST o GET), Body(JSON))                                        .then es la respuesta 
    fetchQuery('127.0.0.1:3002/accept', 'POST', { id, address }).then(res => {
      if (res.success) {
        console.log('Orden colocada')
      } else {
        console.log('No hay repartidores disponibles')
        receptioncontroller.changeStatus(index, 0)
      }
    })
  }

  async start () {
    const opt = -1
    while ((opt !== await lineReader.askQuestion(this.consoleMsn)) !== 0) {
      if (opt === 0) break
      this.showOrders()
    }
  }
}

export const receptionServer = new ReceptionServer()
