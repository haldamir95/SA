import { auth } from './utilities/autentication'
import { contacts } from './utilities/contacts'
import { configuration } from './config/config';

(async () => {
  configuration.API_TOKEN = await auth.authToken()
  console.log('INITIAL CONTACT LIST')
  contacts.listContacts(configuration.API_TOKEN.access_token)
  contacts.addContacts(201314733, configuration.API_TOKEN.access_token)
  console.log('FINAL CONTACT LIST')
  contacts.listContacts(configuration.API_TOKEN.access_token)
})()
