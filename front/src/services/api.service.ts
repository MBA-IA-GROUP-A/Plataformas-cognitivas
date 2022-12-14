import Data from '@interfaces/data.interface'

export default class ApiService {
  url = process.env.REACT_APP_ENV_API

  async postPredict(model: 'federation_model' | 'cluster_model' | 'classification_model', data: Data) {
    const response = await fetch(`${this.url}/predict`, {
      method: 'POST',
      body: JSON.stringify({
        data,
        model,
      }),
    })
    return await response.json()
  }

  async getLogs() {
    return await (await fetch(`${this.url}/download`)).json()
  }
}
