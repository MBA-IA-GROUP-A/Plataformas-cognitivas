import Data from '@interfaces/data.interface'

// create a enum for data types

export default class ApiService {
  url = process.env.REACT_APP_ENV_API

  prepareData(data: Data) {
    return Object.entries(data).map(([key, value]) => {
      return value
    })
  }

  async postPredict(model: 'federation_model' | 'cluster_model' | 'classification_model', data: Data) {
    const preparedData = this.prepareData(data)
    await fetch(`${this.url}`)
    const response = await fetch(`${this.url}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [preparedData],
        model,
      }),
    })
    return await response.json()
  }

  async getLogs() {
    return await (await fetch(`${this.url}/download`)).json()
  }
}
