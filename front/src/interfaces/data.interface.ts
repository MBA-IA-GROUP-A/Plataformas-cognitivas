export default interface Data {
  loan_limit: number // limite de empréstimo excessivo 0
  approv_in_adv: number // Pré-aprovação solicitada 1
  Credit_Worthiness: number // Validade de crédito 2
  open_credit: number // Crédito aberto 3
  business_or_commercial: number // Empresarial ou comercial 4
  loan_amount: number // is number Valor do empréstimo 5
  rate_of_interest: number // is number Juros sobre o valor do empréstimo 6
  Upfront_charges: number // is number Taxas de adiantamento 7
  term: number // Prazo em semanas 8
  Neg_ammortization: number // Amortização negativa 9
  interest_only: number // Somente juros 10
  lump_sum_payment: number // Pagamento de montante fixo 11
  property_value: number // is number Valor do imóvel de garantia de empréstimo 12
  construction_type: number // Casa manufaturada 13
  Secured_by: number // Segurado por Casa ou Terra 14
  total_units: number // is number Número de quartos do imovel 15
  income: number // is number Renda 16
  Credit_Score: number // is number Score de crédito 17
  co_applicant_credit_type: number // Modelo de pontuação de crédito CIBIL 0 Experian 1 18
  submission_of_application: number // Pedido de emprestimo enviado diretamente para a instituição financeira 19
  LTV: number // is number Relação empréstimo/valor do imóvel que cobre o empréstimo em percentagem
  Security_Type: number // Tipo de garantia 21 Direta ou indireta
  dtir1: number // is number Relação dívida/renda 22
  GenderMale: number // Gênero Masculino 23
  GenderFemale: number // Gênero Feminino 24
  GenderJoint: number // Gênero Conjunto 25
  loan_type1: number // Tipo de empréstimo - Habitação 26
  loan_type2: number // Tipo de empréstimo - Compra Comercial 27
  loan_type3: number // Tipo de empréstimo - Desconto de aluguel 28
  loan_purpose_p1: number // Objetivo do empréstimo - Compra de casa 29
  loan_purpose_p2: number // Objetivo do empréstimo - Outros 30
  loan_purpose_p3: number // Objetivo do empréstimo - Refinanciamento de saque 31
  loan_purpose_p4: number // Objetivo do empréstimo - Refinanciamento de empréstimo 32
  occupancy_type_pr: number // Tipo de residência - Principal 33
  occupancy_type_ir: number // Tipo de residência - Secundária 34
  occupancy_type_sr: number // Tipo de residência - Investimento 35
  credit_type_equi: number // O tipo de modelo de pontuação de crédito - Equifax 36
  credit_type_crif: number // O tipo de modelo de pontuação de crédito - CRIF 37
  credit_type_cib: number // O tipo de modelo de pontuação de crédito - CIBIL 38
  credit_type_exp: number // O tipo de modelo de pontuação de crédito - Experian 39
  'age_<25': number // Idade menor que 25 40
  'age_25-34': number // Idade entre 25 e 34 41
  'age_35-44': number // Idade entre 35 e 44 42
  'age_45-54': number // Idade entre 45 e 54 43
  'age_55-64': number // Idade entre 55 e 64 44
  'age_65-74': number // Idade entre 65 e 74 45
  'age_>74': number // Idade maior que 74 46
  Region_North: number // Região Norte 47
  Region_Central: number // Região Central 48
  Region_South: number // Região Sul 49
  'Region_North-East': number // Região Nordeste 50
  [param: string]: number
}
