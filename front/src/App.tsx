import Button from '@components/button/button.component'
import Footer from '@components/footer/footer.component'
import Header from '@components/header/header.component'
import Select from '@components/select/select.component'
import Input from '@components/input/input.component'
import Data from '@interfaces/data.interface'
import React from 'react'
import './App.scoped.scss'
import Selector from '@components/selector/selector.component'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IState {
  model: 'federation_model' | 'cluster_model' | 'classification_model'
  data: Data
  loading: boolean
  valid: boolean
  result: any
  width: number
  height: number
}

export default class App extends React.Component<IProps, IState> {
  initialData: Data = {
    loan_limit: 0,
    approv_in_adv: 0,
    Credit_Worthiness: 0,
    open_credit: 0,
    business_or_commercial: 0,
    loan_amount: 0,
    rate_of_interest: 0,
    Upfront_charges: 0,
    term: 0,
    Neg_ammortization: 0,
    interest_only: 0,
    lump_sum_payment: 0,
    property_value: 0,
    construction_type: 0,
    Secured_by: 0,
    total_units: 0,
    income: 0,
    Credit_Score: 0,
    co_applicant_credit_type: 0,
    submission_of_application: 0,
    LTV: 0,
    Security_Type: 0,
    dtir1: 0,
    GenderMale: 1,
    GenderFemale: 0,
    GenderJoint: 0,
    loan_type1: 1,
    loan_type2: 0,
    loan_type3: 0,
    loan_purpose_p1: 1,
    loan_purpose_p2: 0,
    loan_purpose_p3: 0,
    loan_purpose_p4: 0,
    occupancy_type_pr: 1,
    occupancy_type_ir: 0,
    occupancy_type_sr: 0,
    credit_type_equi: 1,
    credit_type_crif: 0,
    credit_type_cib: 0,
    credit_type_exp: 0,
    'age_<25': 1,
    'age_25-34': 0,
    'age_35-44': 0,
    'age_45-54': 0,
    'age_55-64': 0,
    'age_65-74': 0,
    'age_>74': 0,
    Region_North: 1,
    Region_Central: 0,
    Region_South: 0,
    'Region_North-East': 0,
  }
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

  credit_worthiness_options = [
    {
      value: 0,
      label: 'Garantido por primeiro penhor',
    },
    {
      value: 1,
      label: 'Garantido por segunda garantia',
    },
  ]

  construction_type_options = [
    {
      value: 0,
      label: 'Construção',
    },
    {
      value: 1,
      label: 'Cana manufaturada',
    },
  ]

  secured_type_options = [
    {
      value: 0,
      label: 'Terra',
    },
    {
      value: 1,
      label: 'Imóvel',
    },
  ]

  constructor(props: IProps) {
    super(props)

    this.state = {
      model: 'federation_model',
      data: this.initialData,
      loading: false,
      valid: false,
      result: null,
      width: window.innerWidth,
      height: window.innerHeight,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  handleSelectorChange = (value: any, field: string) => {
    this.setState({
      data: {
        ...this.state.data,
        [field]: value ? 1 : 0,
      },
    })
  }

  handleChange = (value: any, field: string) => {
    this.setState({
      data: {
        ...this.state.data,
        [field]: value,
      },
    })
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
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
            <div className="box">
              <div className="row">
                <div className="col-24">
                  <h4>Dados do cliente</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-24">
                  <h5>Informações Basicas</h5>
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Input
                    type="number"
                    label="Valor do empréstimo solicitado"
                    id="loan_amount"
                    name="loan_amount"
                    leftLabel="$"
                    value={this.state.data.loan_amount}
                    onChange={(value) => this.handleChange(value, 'loan_amount')}
                    readOnly={this.state.loading}
                    required
                  />
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Input
                    type="number"
                    id="rate_of_interest"
                    name="rate_of_interest"
                    label="Taxa de juros"
                    leftLabel="%"
                    value={this.state.data.rate_of_interest}
                    onChange={(value) => this.handleChange(value, 'rate_of_interest')}
                    readOnly={this.state.loading}
                    required
                  />
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Input
                    type="number"
                    id="Upfront_charges"
                    name="Upfront_charges"
                    label="Taxa de encargos antecipados"
                    leftLabel="$"
                    value={this.state.data.Upfront_charges}
                    onChange={(value) => this.handleChange(value, 'Upfront_charges')}
                    readOnly={this.state.loading}
                    required
                  />
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Input
                    type="number"
                    id="term"
                    name="term"
                    leftLabel="#"
                    label="Prazo (meses)"
                    value={this.state.data.term}
                    onChange={(value) => this.handleChange(value, 'term')}
                    readOnly={this.state.loading}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-24">
                  <hr />
                  <h5>Informações Adicionais</h5>
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Selector
                    checked={this.state.data.loan_limit === 1}
                    value={this.state.data.loan_limit}
                    onChange={(value) => this.handleSelectorChange(value, 'loan_limit')}
                    id="loan_limit"
                    name="loan_limit"
                    readOnly={this.state.loading}
                    leftLabel={this.state.width <= 991 ? 'Limite de crédito excessivo' : null}
                    rightLabel={this.state.width > 991 ? 'Limite de crédito excessivo' : null}
                    labelWidth={'100%'}
                    toggle
                  />
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Selector
                    checked={this.state.data.approv_in_adv === 1}
                    value={this.state.data.approv_in_adv}
                    onChange={(value) => this.handleSelectorChange(value, 'approv_in_adv')}
                    id="approv_in_adv"
                    name="approv_in_adv"
                    readOnly={this.state.loading}
                    leftLabel={this.state.width <= 991 ? 'Pré-aprovação solicitada' : null}
                    rightLabel={this.state.width > 991 ? 'Pré-aprovação solicitada' : null}
                    labelWidth={'100%'}
                    toggle
                  />
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Selector
                    checked={this.state.data.open_credit === 1}
                    value={this.state.data.open_credit}
                    onChange={(value) => this.handleSelectorChange(value, 'open_credit')}
                    id="open_credit"
                    name="open_credit"
                    readOnly={this.state.loading}
                    leftLabel={this.state.width <= 991 ? 'Crédito aberto' : null}
                    rightLabel={this.state.width > 991 ? 'Crédito aberto' : null}
                    labelWidth={'100%'}
                    toggle
                  />
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Selector
                    checked={this.state.data.business_or_commercial === 1}
                    value={this.state.data.business_or_commercial}
                    onChange={(value) => this.handleSelectorChange(value, 'business_or_commercial')}
                    id="business_or_commercial"
                    name="business_or_commercial"
                    readOnly={this.state.loading}
                    leftLabel={this.state.width <= 991 ? 'Empresarial ou comercial' : null}
                    rightLabel={this.state.width > 991 ? 'Empresarial ou comercial' : null}
                    labelWidth={'100%'}
                    toggle
                  />
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Selector
                    checked={this.state.data.Neg_ammortization === 1}
                    value={this.state.data.Neg_ammortization}
                    onChange={(value) => this.handleSelectorChange(value, 'Neg_ammortization')}
                    id="Neg_ammortization"
                    name="Neg_ammortization"
                    readOnly={this.state.loading}
                    leftLabel={this.state.width <= 991 ? 'Amortização negativa' : null}
                    rightLabel={this.state.width > 991 ? 'Amortização negativa' : null}
                    labelWidth={'100%'}
                    toggle
                  />
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Selector
                    checked={this.state.data.interest_only === 1}
                    value={this.state.data.interest_only}
                    onChange={(value) => this.handleSelectorChange(value, 'interest_only')}
                    id="interest_only"
                    name="interest_only"
                    readOnly={this.state.loading}
                    leftLabel={this.state.width <= 991 ? 'Pagamentos somente de juros' : null}
                    rightLabel={this.state.width > 991 ? 'Pagamentos somente de juros' : null}
                    labelWidth={'100%'}
                    toggle
                  />
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Selector
                    checked={this.state.data.lump_sum_payment === 1}
                    value={this.state.data.lump_sum_payment}
                    onChange={(value) => this.handleSelectorChange(value, 'lump_sum_payment')}
                    id="lump_sum_payment"
                    name="lump_sum_payment"
                    readOnly={this.state.loading}
                    leftLabel={this.state.width <= 991 ? 'Pagamento de montante fixo' : null}
                    rightLabel={this.state.width > 991 ? 'Pagamento de montante fixo' : null}
                    labelWidth={'100%'}
                    toggle
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-24">
                  <hr />
                  <h5>Garantia de crédito</h5>
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Select
                    value={this.state.data.Credit_Worthiness}
                    onChange={(value) => this.handleChange(value, 'Credit_Worthiness')}
                    id="Credit_Worthiness"
                    name="Credit_Worthiness"
                    readOnly={this.state.loading}
                    label="Garantia de crédito"
                  >
                    {this.credit_worthiness_options.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Select
                    value={this.state.data.Secured_by}
                    onChange={(value) => this.handleChange(value, 'Secured_by')}
                    id="Secured_by"
                    name="Secured_by"
                    readOnly={this.state.loading}
                    label="Segurado por"
                  >
                    {this.secured_type_options.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Input
                    type="number"
                    id="property_value"
                    name="property_value"
                    leftLabel="$"
                    label="Valor do imovel "
                    value={this.state.data.property_value}
                    onChange={(value) => this.handleChange(value, 'property_value')}
                    readOnly={this.state.loading}
                    required
                  />
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Select
                    value={this.state.data.construction_type}
                    onChange={(value) => this.handleChange(value, 'construction_type')}
                    id="construction_type"
                    name="construction_type"
                    readOnly={this.state.loading}
                    label="Tipo da construção do imovel"
                  >
                    {this.construction_type_options.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-24 col-lg-12 col-xl-6">
                  <Input
                    type="number"
                    id="total_units"
                    name="total_units"
                    leftLabel="$"
                    label="Número de quartos do imovel"
                    value={this.state.data.total_units}
                    onChange={(value) => this.handleChange(value, 'total_units')}
                    readOnly={this.state.loading}
                    required
                  />
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
