import { lineReader } from '../../line-reader'
import { fetchQuery } from '../../request-manager'
//import { configuration } from '../../config/config'
import { Server } from '../server'
import { routerV1 as routerclient } from '../../routers/client-router'

class ClientServer extends Server {
  constructor () {
    super(3000)
    super.routers(routerclient)
    this.header = '###### MENU DE COMIDA ######'
    this.footer = '######  GRACIAS, VUELVA PRONTO ######'
    this.oHeader = '------------------   PEDIDO   ------------------'
    this.oFooter = '------------------    FIN     ------------------'
    this.divider = '~°~°~°~°~°~°~°~°~°~°~°~°~°~°~°~°~°~°~°~°~°~°~°~°~°'
    this.reqAns = '------------- Esperando  respuesta -------------'
    this.msn = 'Elegir una opción\n'
    this.address = 'Ingrese su dirección'
    this.menuOptions = {
      Menu1: [100, 'Arroz chino'],
      Menu2: [75, 'Mariscos'],
      Menu3: [55, 'Hamburguesa'],
      Menu4: [50, 'Orange Chicken'],
      Menu5: [35, 'Pollo'],
      Menu6: [25, 'Burrito'],
      Menu7: [15, 'Tacos'],
      Menu8: [10, 'Pizza'],
      Menu9: [10, 'Papas'],
      Menu10: [5, 'Bebida']
    }
    this.orderinfo = {}
  }

  //enviar la orden al restaurante
  async placeOrder () {
    //envia la orden al puerto 3001 que es del restaurante y llama a /accept del router del reception-router
    const data = await fetchQuery('http://127.0.0.1:3001/accept', 'POST', this.orderinfo)
    console.log(`La orden se envió correctamente, pedido no. ${data.id}`)
  }

  //enviar la orden al motorista
  async sendOrder () {
    //envia la orden al puerto 3002 que es del motorista y llama a /accept del router del biker-router
    const data = await fetchQuery('http://127.0.0.1:3002/accept', 'POST', this.orderinfo)
    console.log(`La orden se envió correctamente, pedido no. ${data.id}`)
  }

  printOrder () {
    console.log(this.oHeader)
    Object.keys(this.orderinfo).forEach(el => {
      const arrEl = this.menuOptions[el]
      console.log(arrEl[1], arrEl[0] * this.orderinfo[el])
    })
    console.log(this.oFooter)
  }

  async showMenu () {
    console.log(this.divider)
    console.log(0, 'Terminar orden')
    Object.keys(this.menuOptions).forEach((el, idx) => console.log(idx + 1, this.menuOptions[el][1], this.menuOptions[el][0]))
    console.log(this.divider)
  }

  async saveData () {
    let option = -1
    const max = Object.keys(this.menuOptions).length
    while ((option = await lineReader.askNumericQuestion(this.msn)) !== 0) {
      if (option > max || option < 0) { console.log('Opción inválida'); continue }

      const key = Object.keys(this.menuOptions)[option - 1]
      if (Object.keys(this.orderinfo).includes(key)) {
        this.orderinfo[key] += 1
      } else {
        this.orderinfo[key] = 1
      }
      this.printOrder()
    }
  }

  async start () {
    console.log(this.header)
    await this.showMenu()
    await this.saveData()
    if (await lineReader.askYesNoQuestion()) {
      await this.saveAdress()
      console.log(this.footer)
      await this.placeOrder()
      //await this.sendOrder()
      console.log(this.reqAns)
      //console.log(this.add)
      /*if(await lineReader.askAddMoreQuestion()){
        this.start()
      }*/
    } else {
      console.log('Orden cancelada...')
    }
  }

  async saveAdress () {
    const address = await lineReader.askQuestion('Ingrese dirección: ')
    console.log(address)
    this.orderinfo.address = address
  }
}

export const clientServer = new ClientServer()