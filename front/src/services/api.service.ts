import Data from '@interfaces/data.interface'

// create a enum for data types

export default class ApiService {
  url = process.env.REACT_APP_ENV_API

  prepareData(data: Data) {
    // eslint-disable-next-line
    console.log(data)
    return Object.entries(data).map(([key, value]: any) => {
      return parseFloat(value)
    })
  }

  async postPredict(model: 'federation_model' | 'cluster_model' | 'r_model', data: Data) {
    const preparedData = this.prepareData(data)
    const response = await fetch(`${this.url}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: preparedData,
        model,
      }),
    })
    return await response.json()
  }

  async getLogs() {
    return await (await fetch(`${this.url}/download`)).json()
  }
}
