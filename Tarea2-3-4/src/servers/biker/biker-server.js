//importando la clase server para la configuracion de este servidor
import { Server } from '../server'
//importando nuestra clase de routers para las llamadas 
import { routerV1 as bikerRouter } from '../../routers/biker-router'
//importando fetchQuery para hacer uso de consultas
import { fetchQuery } from '../../request-manager'

//import { configuration } from '../../config/config'

//importar el controlador del motociclista con lista de motocicletas y tiempo de entrega
//import { receptioncontroller } from '../../controllers/reception-controller'

//importando el lector de teclado en consola
import { lineReader } from '../../line-reader'


//creando la clase
class BikerServer extends Server{

    //creando el constructor
    constructor(){
        //asignamos el puerto que es un atributo en la clase SERVER
        super(3002)
        //asignamos los routers que va a utilizar el servidor
        super.routers(bikerRouter)
        //creando los mensajes que se mostraran
        this.newRequest = '$$$$$$ NUEVA SOLICITUD $$$$$$\n'
        this.confirm = 'Oprima 1 para confirmar pedido y 0 para rechazarla\n'
        this.travel = 'Oprima 1 para iniciar recorrido\n'
        this.deliver = 'Escoja el pedido que va esta entregando\n'
        this.wait = 'Esperando nuevas solicitudes'
    }

    async start () {
        console.log(this.wait)
        /*await this.showMenu()
        await this.saveData()
        if (await lineReader.askYesNoQuestion()) {
          await this.saveAdress()
          console.log(this.footer)
          await this.placeOrder()
          console.log(this.reqAns)
        } else {
          console.log('Orden cancelada...')
        }*/
      }


}


//damos permiso a la clase para que sea exportada
export const bikerServer = new BikerServer()