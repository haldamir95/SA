import { fetchQuery } from './request-manager.js'
import { configuration } from '../config/config'

class Authentication {
  authToken () {
    return fetchQuery(
      configuration.API_URL + 'option=token&api=oauth2',
      'POST',
      {
        grant_type: 'client_credentials',
        client_id: 'haldamir.95@gmail.com',
        client_secret: 201314733
      }
    )
  }
}

export const auth = new Authentication()
