import Input from '@components/input/input.component'
import Select from '@components/select/select.component'
import Selector from '@components/selector/selector.component'
import Data from '@interfaces/data.interface'
import { isEqual } from 'lodash'
import React from 'react'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Data
  onDataChange: (data: Data) => void
  loading: boolean
  valid: boolean
}

interface IState {
  data: Data
  width: number
  height: number
  gender: number
  loanType: number
  loadPorpose: number
  occupancyType: number
  creditType: number
  age: number
  region: number
}

export default class FormData extends React.Component<IProps, IState> {
  // Inadimplente
  // initialData: Data = {
  //   loan_limit: 1,
  //   approv_in_adv: 0,
  //   Credit_Worthiness: 0,
  //   open_credit: 0,
  //   business_or_commercial: 0,
  //   loan_amount: 676500,
  //   rate_of_interest: 3.5,
  //   Upfront_charges: 0,
  //   term: 360,
  //   Neg_ammortization: 0,
  //   interest_only: 0,
  //   lump_sum_payment: 0,
  //   property_value: 1408000,
  //   construction_type: 0,
  //   Secured_by: 1,
  //   total_units: 1,
  //   income: 9000,
  //   Credit_Score: 800,
  //   co_applicant_credit_type: 0,
  //   submission_of_application: 0,
  //   LTV: 0,
  //   Security_Type: 1,
  //   dtir1: 40,
  //   GenderMale: 0,
  //   GenderFemale: 0,
  //   GenderJoint: 0,
  //   loan_type1: 1,
  //   loan_type2: 0,
  //   loan_type3: 0,
  //   loan_purpose_p1: 1,
  //   loan_purpose_p2: 0,
  //   loan_purpose_p3: 0,
  //   loan_purpose_p4: 0,
  //   occupancy_type_pr: 1,
  //   occupancy_type_ir: 0,
  //   occupancy_type_sr: 0,
  //   credit_type_equi: 0,
  //   credit_type_crif: 0,
  //   credit_type_cib: 0,
  //   credit_type_exp: 0,
  //   'age_<25': 0,
  //   'age_25-34': 0,
  //   'age_35-44': 0,
  //   'age_45-54': 0,
  //   'age_55-64': 0,
  //   'age_65-74': 0,
  //   'age_>74': 0,
  //   Region_North: 0,
  //   Region_Central: 0,
  //   Region_South: 0,
  //   'Region_North-East': 0,
  // }

  // N??o inadimplente
  initialData: Data = {
    loan_limit: 1,
    approv_in_adv: 0,
    Credit_Worthiness: 1,
    open_credit: 0,
    business_or_commercial: 0,
    loan_amount: 56500,
    rate_of_interest: 4.75,
    Upfront_charges: 2420,
    term: 360,
    Neg_ammortization: 0,
    interest_only: 0,
    lump_sum_payment: 0,
    property_value: 128000,
    construction_type: 0,
    Secured_by: 1,
    total_units: 1,
    income: 7140,
    Credit_Score: 617,
    co_applicant_credit_type: 0,
    submission_of_application: 0,
    LTV: 44140625,
    Security_Type: 1,
    dtir1: 42,
    GenderMale: 0,
    GenderFemale: 0,
    GenderJoint: 0,
    loan_type1: 1,
    loan_type2: 0,
    loan_type3: 0,
    loan_purpose_p1: 1,
    loan_purpose_p2: 0,
    loan_purpose_p3: 0,
    loan_purpose_p4: 0,
    occupancy_type_pr: 0,
    occupancy_type_ir: 0,
    occupancy_type_sr: 0,
    credit_type_equi: 0,
    credit_type_crif: 0,
    credit_type_cib: 0,
    credit_type_exp: 0,
    'age_<25': 0,
    'age_25-34': 0,
    'age_35-44': 0,
    'age_45-54': 0,
    'age_55-64': 0,
    'age_65-74': 0,
    'age_>74': 0,
    Region_North: 0,
    Region_Central: 0,
    Region_South: 0,
    'Region_North-East': 0,
  }

  // Valores zerados
  // initialData: Data = {
  //   loan_limit: 0,
  //   approv_in_adv: 0,
  //   Credit_Worthiness: 0,
  //   open_credit: 0,
  //   business_or_commercial: 0,
  //   loan_amount: 0,
  //   rate_of_interest: 0,
  //   Upfront_charges: 0,
  //   term: 0,
  //   Neg_ammortization: 0,
  //   interest_only: 0,
  //   lump_sum_payment: 0,
  //   property_value: 0,
  //   construction_type: 0,
  //   Secured_by: 0,
  //   total_units: 0,
  //   income: 0,
  //   Credit_Score: 0,
  //   co_applicant_credit_type: 0,
  //   submission_of_application: 0,
  //   LTV: 0,
  //   Security_Type: 0,
  //   dtir1: 0,
  //   GenderMale: 1,
  //   GenderFemale: 0,
  //   GenderJoint: 0,
  //   loan_type1: 1,
  //   loan_type2: 0,
  //   loan_type3: 0,
  //   loan_purpose_p1: 1,
  //   loan_purpose_p2: 0,
  //   loan_purpose_p3: 0,
  //   loan_purpose_p4: 0,
  //   occupancy_type_pr: 1,
  //   occupancy_type_ir: 0,
  //   occupancy_type_sr: 0,
  //   credit_type_equi: 1,
  //   credit_type_crif: 0,
  //   credit_type_cib: 0,
  //   credit_type_exp: 0,
  //   'age_<25': 1,
  //   'age_25-34': 0,
  //   'age_35-44': 0,
  //   'age_45-54': 0,
  //   'age_55-64': 0,
  //   'age_65-74': 0,
  //   'age_>74': 0,
  //   Region_North: 1,
  //   Region_Central: 0,
  //   Region_South: 0,
  //   'Region_North-East': 0,
  // }

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
      label: 'Constru????o',
    },
    {
      value: 1,
      label: 'Casa manufaturada',
    },
  ]

  secured_type_options = [
    {
      value: 0,
      label: 'Terra',
    },
    {
      value: 1,
      label: 'Im??vel',
    },
  ]

  co_applicant_credit_type_options = [
    {
      value: 0,
      label: 'CIBIL',
    },
    {
      value: 1,
      label: 'Experian',
    },
  ]

  security_type_options = [
    {
      value: 0,
      label: 'Indireta',
    },
    {
      value: 1,
      label: 'Direta',
    },
  ]

  gender_options = [
    {
      value: 0,
      label: 'Feminino',
    },
    {
      value: 1,
      label: 'Masculino',
    },
    {
      value: 2,
      label: 'Conjunto',
    },
  ]

  loan_type_options = [
    {
      value: 0,
      label: 'Emprestimo residencial',
    },
    {
      value: 1,
      label: 'Compra Comercial',
    },
    {
      value: 2,
      label: 'Desconto de aluguel',
    },
  ]

  loan_purpose_options = [
    {
      value: 0,
      label: 'Compra de casa',
    },
    {
      value: 1,
      label: 'Outros',
    },
    {
      value: 2,
      label: 'Refinanciamento de saque',
    },
    {
      value: 3,
      label: 'Refinanciamento de empr??stimo',
    },
  ]

  occupancy_type_options = [
    {
      value: 0,
      label: 'Principal',
    },
    {
      value: 1,
      label: 'Secund??ria',
    },
    {
      value: 2,
      label: 'Investimento',
    },
  ]

  credit_type_options = [
    {
      value: 0,
      label: 'Equifax',
    },
    {
      value: 1,
      label: 'CRIF',
    },
    {
      value: 2,
      label: 'CIBIL',
    },
    {
      value: 3,
      label: 'Experian',
    },
  ]

  age_options = [
    {
      value: 0,
      label: '<25',
    },
    {
      value: 1,
      label: '25-34',
    },
    {
      value: 2,
      label: '35-44',
    },
    {
      value: 3,
      label: '45-54',
    },
    {
      value: 4,
      label: '55-64',
    },
    {
      value: 5,
      label: '65-74',
    },
    {
      value: 6,
      label: '>74',
    },
  ]

  region_options = [
    {
      value: 0,
      label: 'Norte',
    },
    {
      value: 1,
      label: 'Centro',
    },
    {
      value: 2,
      label: 'Sul',
    },
    {
      value: 3,
      label: 'Nordeste',
    },
  ]

  constructor(props: IProps) {
    super(props)

    this.state = {
      data: this.initialData,
      width: window.innerWidth,
      height: window.innerHeight,
      gender: 0,
      loanType: 0,
      loadPorpose: 0,
      occupancyType: 0,
      creditType: 0,
      age: 0,
      region: 0,
    }

    this.handleChange = this.handleChange.bind(this)
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

  handleChangeGender = (value: any) => {
    this.setState({
      gender: value,
      data: {
        ...this.state.data,
        GenderMale: value === 1 ? 1 : 0,
        GenderFemale: value === 0 ? 1 : 0,
        GenderJoint: value === 2 ? 1 : 0,
      },
    })
  }

  handleChangeLoanType = (value: any) => {
    this.setState({
      loanType: value,
      data: {
        ...this.state.data,
        loan_type1: value === 0 ? 1 : 0,
        loan_type2: value === 1 ? 1 : 0,
        loan_type3: value === 2 ? 1 : 0,
      },
    })
  }

  handleChangeLoanPurpose = (value: any) => {
    this.setState({
      loadPorpose: value,
      data: {
        ...this.state.data,
        loan_purpose1: value === 0 ? 1 : 0,
        loan_purpose2: value === 1 ? 1 : 0,
        loan_purpose3: value === 2 ? 1 : 0,
        loan_purpose4: value === 3 ? 1 : 0,
      },
    })
  }

  handleChangeOccupancyType = (value: any) => {
    this.setState({
      occupancyType: value,
      data: {
        ...this.state.data,
        occupancy_type_pr: value === 0 ? 1 : 0,
        occupancy_type_ir: value === 1 ? 1 : 0,
        occupancy_type_sr: value === 2 ? 1 : 0,
      },
    })
  }

  handleChangeCreditType = (value: any) => {
    this.setState({
      creditType: value,
      data: {
        ...this.state.data,
        credit_type_equi: value === 0 ? 1 : 0,
        credit_type_crif: value === 1 ? 1 : 0,
        credit_type_cib: value === 2 ? 1 : 0,
        credit_type_exp: value === 3 ? 1 : 0,
      },
    })
  }

  handleChangeAge = (value: any) => {
    this.setState({
      age: value,
      data: {
        ...this.state.data,
        'age_<25': value === 0 ? 1 : 0,
        'age_25-34': value === 1 ? 1 : 0,
        'age_35-44': value === 2 ? 1 : 0,
        'age_45-54': value === 3 ? 1 : 0,
        'age_55-64': value === 4 ? 1 : 0,
        'age_65-74': value === 5 ? 1 : 0,
        'age_>74': value === 6 ? 1 : 0,
      },
    })
  }

  handleChangeRegion = (value: any) => {
    this.setState({
      region: value,
      data: {
        ...this.state.data,
        Region_North: value === 0 ? 1 : 0,
        Region_Central: value === 1 ? 1 : 0,
        Region_South: value === 2 ? 1 : 0,
        'Region_North-East': value === 3 ? 1 : 0,
      },
    })

    this.callOnChange()
  }

  callOnChange = () => {
    if (this.props.onDataChange && typeof this.props.onDataChange === 'function') {
      this.props.onDataChange(this.state.data)
    }
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
    this.callOnChange()
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (!isEqual(prevProps.data, prevState.data)) {
      this.callOnChange()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  render() {
    return (
      <div className="box">
        <div className="row">
          <div className="col-24">
            <h4>Dados do cliente</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-24">
            <h5>Informa????es Basicas</h5>
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Input
              type="number"
              label="Valor do empr??stimo solicitado"
              id="loan_amount"
              name="loan_amount"
              leftLabel="$"
              value={this.state.data.loan_amount}
              onChange={(value) => this.handleChange(value, 'loan_amount')}
              readOnly={this.props.loading}
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
              readOnly={this.props.loading}
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
              readOnly={this.props.loading}
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
              readOnly={this.props.loading}
              required
            />
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Input
              type="number"
              id="income"
              name="income"
              leftLabel="$"
              label="Renda mensal"
              value={this.state.data.income}
              onChange={(value) => this.handleChange(value, 'income')}
              readOnly={this.props.loading}
              required
            />
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Input
              type="number"
              id="Credit_Score"
              name="Credit_Score"
              leftLabel="#"
              label="Score de cr??dito"
              value={this.state.data.Credit_Score}
              onChange={(value) => this.handleChange(value, 'Credit_Score')}
              readOnly={this.props.loading}
              required
            />
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Input
              type="number"
              id="dtir1"
              name="dtir1"
              leftLabel="%"
              label="Rela????o d??vida/renda"
              value={this.state.data.dtir1}
              onChange={(value) => this.handleChange(value, 'dtir1')}
              readOnly={this.props.loading}
              required
            />
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Select
              value={this.state.data.co_applicant_credit_type}
              onChange={(value) => this.handleChange(value, 'co_applicant_credit_type')}
              id="co_applicant_credit_type"
              name="co_applicant_credit_type"
              readOnly={this.props.loading}
              label="Tipo de cr??dito do co-aplicante"
            >
              {this.co_applicant_credit_type_options.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Select
              value={this.state.loanType}
              onChange={(value) => this.handleChangeLoanType(value)}
              id="loan_type"
              name="loan_type"
              readOnly={this.props.loading}
              label="Tipo de empr??stimo"
            >
              {this.loan_type_options.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Select
              value={this.state.loadPorpose}
              onChange={(value) => this.handleChangeLoanPurpose(value)}
              id="loan_purpose"
              name="loan_purpose"
              readOnly={this.props.loading}
              label="Objetivo do empr??stimo"
            >
              {this.loan_purpose_options.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Select
              value={this.state.occupancyType}
              onChange={(value) => this.handleChangeOccupancyType(value)}
              id="occupancy_type"
              name="occupancy_type"
              readOnly={this.props.loading}
              label="Tipo de resid??ncia"
            >
              {this.occupancy_type_options.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Select
              value={this.state.creditType}
              onChange={(value) => this.handleChangeCreditType(value)}
              id="credit_type"
              name="credit_type"
              readOnly={this.props.loading}
              label="Tipo de modelo de cr??dito usado"
            >
              {this.credit_type_options.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Select
              value={this.state.gender}
              onChange={(value) => this.handleChangeGender(value)}
              id="gender"
              name="gender"
              readOnly={this.props.loading}
              label="Gen??ro"
            >
              {this.gender_options.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Select
              value={this.state.age}
              onChange={(value) => this.handleChangeAge(value)}
              id="age"
              name="age"
              readOnly={this.props.loading}
              label="Faixa et??ria"
            >
              {this.age_options.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Select
              value={this.state.region}
              onChange={(value) => this.handleChangeRegion(value)}
              id="region"
              name="region"
              readOnly={this.props.loading}
              label="Regi??o"
            >
              {this.region_options.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="row">
          <div className="col-24">
            <hr />
            <h5>Informa????es Adicionais</h5>
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Selector
              checked={this.state.data.loan_limit === 1}
              value={this.state.data.loan_limit}
              onChange={(value) => this.handleSelectorChange(value, 'loan_limit')}
              id="loan_limit"
              name="loan_limit"
              readOnly={this.props.loading}
              leftLabel={this.state.width <= 991 ? 'Limite de cr??dito excessivo' : null}
              rightLabel={this.state.width > 991 ? 'Limite de cr??dito excessivo' : null}
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
              readOnly={this.props.loading}
              leftLabel={this.state.width <= 991 ? 'Pr??-aprova????o solicitada' : null}
              rightLabel={this.state.width > 991 ? 'Pr??-aprova????o solicitada' : null}
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
              readOnly={this.props.loading}
              leftLabel={this.state.width <= 991 ? 'Cr??dito aberto' : null}
              rightLabel={this.state.width > 991 ? 'Cr??dito aberto' : null}
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
              readOnly={this.props.loading}
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
              readOnly={this.props.loading}
              leftLabel={this.state.width <= 991 ? 'Amortiza????o negativa' : null}
              rightLabel={this.state.width > 991 ? 'Amortiza????o negativa' : null}
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
              readOnly={this.props.loading}
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
              readOnly={this.props.loading}
              leftLabel={this.state.width <= 991 ? 'Pagamento de montante fixo' : null}
              rightLabel={this.state.width > 991 ? 'Pagamento de montante fixo' : null}
              labelWidth={'100%'}
              toggle
            />
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Selector
              checked={this.state.data.submission_of_application === 1}
              value={this.state.data.submission_of_application}
              onChange={(value) => this.handleSelectorChange(value, 'submission_of_application')}
              id="submission_of_application"
              name="submission_of_application"
              readOnly={this.props.loading}
              leftLabel={this.state.width <= 991 ? 'Diretamente a institui????o financeira' : null}
              rightLabel={this.state.width > 991 ? 'Diretamente a institui????o financeira' : null}
              labelWidth={'100%'}
              toggle
            />
          </div>
        </div>
        <div className="row">
          <div className="col-24">
            <hr />
            <h5>Garantia de cr??dito</h5>
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Select
              value={this.state.data.Credit_Worthiness}
              onChange={(value) => this.handleChange(value, 'Credit_Worthiness')}
              id="Credit_Worthiness"
              name="Credit_Worthiness"
              readOnly={this.props.loading}
              label="Garantia de cr??dito"
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
              readOnly={this.props.loading}
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
            <Select
              value={this.state.data.construction_type}
              onChange={(value) => this.handleChange(value, 'construction_type')}
              id="construction_type"
              name="construction_type"
              readOnly={this.props.loading}
              label="Tipo da constru????o do imovel"
            >
              {this.construction_type_options.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Select
              value={this.state.data.Security_Type}
              onChange={(value) => this.handleChange(value, 'Security_Type')}
              id="Security_Type"
              name="Security_Type"
              readOnly={this.props.loading}
              label="Tipo de garantia"
            >
              {this.security_type_options.map((option) => (
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
              readOnly={this.props.loading}
              required
            />
          </div>
          <div className="col-24 col-lg-12 col-xl-6">
            <Input
              type="number"
              id="total_units"
              name="total_units"
              leftLabel="$"
              label="N??mero de quartos do imovel"
              value={this.state.data.total_units}
              onChange={(value) => this.handleChange(value, 'total_units')}
              readOnly={this.props.loading}
              required
            />
          </div>
          <div className="col-24 col-lg-12 col-xl-12">
            <Input
              type="number"
              id="LTV"
              name="LTV"
              leftLabel="#"
              label="Rela????o empr??stimo/valor do im??vel que cobre o empr??stimo"
              value={this.state.data.LTV}
              onChange={(value) => this.handleChange(value, 'LTV')}
              readOnly={this.props.loading}
              required
            />
          </div>
        </div>
      </div>
    )
  }
}
