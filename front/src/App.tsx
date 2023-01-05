import Button from '@components/button/button.component'
import Footer from '@components/footer/footer.component'
import FormData from '@components/form-data/form-data.component'
import Header from '@components/header/header.component'
import Select from '@components/select/select.component'
import ToastHelper from '@helpers/toast.helper'
import Data from '@interfaces/data.interface'
import ApiService from '@services/api.service'
import React from 'react'
import './App.scoped.scss'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IState {
  model: 'federation_model' | 'cluster_model' | 'r_model'
  data: Data
  loading: boolean
  valid: boolean
  result: any
}

export default class App extends React.Component<IProps, IState> {
  models = [
    {
      name: 'federation_model',
      label: 'Neural Network (Python)',
    },
    {
      name: 'cluster_model',
      label: 'Cluster (Python)',
    },
    {
      name: 'r_model',
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

  toast = new ToastHelper().toast

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
    if (!this.state.loading) {
      try {
        this.setState({ loading: true })
        const response = await this.api.postPredict(this.state.model, this.state.data)
        if (response?.error_message) {
          throw new Error(response?.error_message)
        }
        this.setState({ loading: false, result: response?.result })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        this.toast.error('Alguma coisa deu errado! Tente novamente mais tarde', {
          closeButton: true,
          className: 'full text-bold',
          position: `${window.innerWidth > 991 ? 'top' : 'bottom'} center`,
          duration: 3600000,
          notOverClick: true,
          immediately: true,
        })
      } finally {
        this.setState({ loading: false })
      }
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
                    {(this.state.model === 'federation_model' || this.state.model === 'r_model') && (
                      <p>
                        <strong>Probabilidade de inadimplência: </strong>
                        {/* {(this.state.result * 100).toFixed(2)}% */}
                        {this.state.result === 0 ? 'Não' : 'Sim'}
                      </p>
                    )}
                    {this.state.model === 'cluster_model' && (
                      <p>
                        <strong>Cluster: </strong>
                        {this.state.result}
                      </p>
                    )}
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
