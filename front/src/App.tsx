import Button from '@components/button/button.component'
import Footer from '@components/footer/footer.component'
import Header from '@components/header/header.component'
import Select from '@components/select/select.component'
import Input from '@components/input/input.component'
import Selector from '@components/selector/selector.component'
import FormData from '@components/form-data/form-data.component'
import Data from '@interfaces/data.interface'
import ApiService from '@services/api.service'
import React from 'react'
import './App.scoped.scss'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IState {
  model: 'federation_model' | 'cluster_model' | 'classification_model'
  data: Data
  loading: boolean
  valid: boolean
  result: any
}

export default class App extends React.Component<IProps, IState> {
  models = [
    {
      name: 'federation_model',
      label: 'Federated Learning (Python)',
    },
    {
      name: 'cluster_model',
      label: 'Cluster (Python)',
    },
    {
      name: 'classification_model',
      label: 'Classification (R)',
    },
  ]

  fieldsToValidate = [
    'loan_amount',
    'rate_of_interest',
    'Upfront_charges',
    'term',
    'income',
    'Credit_Score',
    'dtir1',
    'property_value',
    'total_units',
    'LTV',
  ]

  api = new ApiService()

  constructor(props: IProps) {
    super(props)

    this.state = {
      model: 'federation_model',
      data: null as any,
      loading: false,
      valid: false,
      result: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onDataChange = this.onDataChange.bind(this)
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.setState({ loading: true })
    if (!this.state.loading) {
      const response = await this.api.postPredict(this.state.model, this.state.data)
      this.setState({ loading: false, result: response.data })
    }
  }

  onDataChange = (data: Data) => {
    this.setState({ data })
    const valid = this.fieldsToValidate.every((field) => {
      return data[field] !== null && data[field] !== undefined
    })
    this.setState({ valid })
  }

  render() {
    return (
      <div className="app">
        <Header />
        <main className="container">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="box">
              <div className="row">
                <div className="col-24">
                  <h4 className="m-0">Predição de inadimplência de clientes de uma instituição financeira</h4>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="row">
                <div className="col-24">
                  <h4>Modelo preditivo</h4>
                </div>
                <div className="col-24 col-lg-12">
                  <Select
                    value={this.state.model}
                    onChange={(value) => {
                      this.setState({ model: value })
                    }}
                    id="model-selection"
                    name="model-selection"
                    readOnly={this.state.loading}
                    label="Selecione o modelo"
                    required
                  >
                    {this.models.map((model) => (
                      <option key={model.name} value={model.name}>
                        {model.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <FormData
              data={this.state.data}
              loading={this.state.loading}
              valid={this.state.valid}
              onDataChange={(data) => this.onDataChange(data)}
            />
            <div className="box">
              <div className="row">
                <div className="col-24 text-right">
                  <Button type="submit" loading={this.state.loading} disabled={!this.state.valid}>
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
            {this.state.result !== null && (
              <div className="box">
                <div className="row">
                  <div className="col-24">
                    <h4>Resultado</h4>
                  </div>
                </div>
              </div>
            )}
          </form>
        </main>
        <Footer />
      </div>
    )
  }
}
