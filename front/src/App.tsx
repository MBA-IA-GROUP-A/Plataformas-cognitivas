import Button from '@components/button/button.component'
import Footer from '@components/footer/footer.component'
import Header from '@components/header/header.component'
import SelectComponent from '@components/select/select.component'
import Data from '@interfaces/data.interface'
import React from 'react'
import './App.scoped.scss'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IState {
  model: 'federation_model' | 'cluster_model' | 'classification_model'
  data: Array<Array<Data>>
  loading: boolean
  valid: boolean
  result: any
}

export default class App extends React.Component<IProps, IState> {
  models = [
    {
      name: 'federation_model',
      label: 'Federated Learning',
    },
    {
      name: 'cluster_model',
      label: 'Cluster',
    },
    {
      name: 'classification_model',
      label: 'Classification',
    },
  ]

  constructor(props: IProps) {
    super(props)

    this.state = {
      model: 'federation_model',
      data: [[]],
      loading: false,
      valid: false,
      result: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
                  <h5 className="m-0">Predição de inadimplência de clientes de uma instituição financeira</h5>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="row">
                <div className="col-24">
                  <h6>Modelo preditivo</h6>
                </div>
                <div className="col-24 col-lg-12">
                  <SelectComponent
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
                  </SelectComponent>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="row">
                <div className="col-24">
                  <h6>Dados do cliente</h6>
                </div>
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
                    <h6>Resultado</h6>
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
