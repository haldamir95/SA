import { fetchQuery } from './request-manager'
import { configuration } from '../config/config'
class Contacts {
  async addContacts (contact, token) {
    for (let i = 0; i < 10; i++) {
      await fetchQuery(
        configuration.API_URL + 'webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal',
        'POST',
        { catid: i, name: `contact_${contact}_${i}` },
        { Authorization: 'Bearer ' + token }
      ).then(data => console.log(data))
    }
  }

  async listContacts (token) {
    const data = await fetchQuery(
      configuration.API_URL + 'option=com_contact&webserviceVersion=1.0.0&webserviceClient=administrator&api=Hal',
      'GET',
      undefined,
      { Authorization: 'Bearer ' + token }
    )

    data._embedded.item.forEach(it => console.log(it.name))
  }
}

export const contacts = new Contacts()
