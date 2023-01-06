# Importando a biblioteca plumber
library(plumber)

# setwd('C:/Users/Usuario/Documents/GitHub/Plataformas-cognitivas')
# Carregamento do modelo para um objeto
modelo = readRDS("../tmp/models/Rmodel.rds")

#* @apiTitle R Regression Model
#* @post /predict
#* @serializer unboxedJSON
function(req, res)
{
  json_input <- req$body
  data <- json_input$data

  df = data.frame(
    loan_limit =  as.numeric(data[1]),
    approv_in_adv =  as.numeric(data[2]),
    Credit_Worthiness =  as.integer(data[3]),
    open_credit =  as.integer(data[4]),
    business_or_commercial =  as.integer(data[5]),
    loan_amount =  as.integer(data[6]),
    rate_of_interest =  as.numeric(data[7]),
    Upfront_charges =  as.numeric(data[8]),
    term =  as.numeric(data[9]),
    Neg_ammortization =  as.numeric(data[10]),
    interest_only =  as.integer(data[11]),
    lump_sum_payment =  as.integer(data[12]),
    property_value =  as.numeric(data[13]),
    construction_type =  as.integer(data[14]),
    Secured_by =  as.integer(data[15]),
    total_units =  as.integer(data[16]),
    income =  as.numeric(data[17]),
    Credit_Score =  as.integer(data[18]),
    co_applicant_credit_type =  as.integer(data[19]),
    submission_of_application =  as.numeric(data[20]),
    LTV =  as.numeric(data[21]),
    Security_Type =  as.integer(data[22]),
    Status =  as.integer(data[23]),
    dtir1 = as.numeric(data[24]),
    GenderMale =  as.integer(data[25]),
    GenderFemale =  as.integer(data[26]),
    GenderJoint =  as.integer(data[27]),
    loan_type1 =  as.integer(data[28]),
    loan_type2 =  as.integer(data[29]),
    loan_type3 =  as.integer(data[30]),
    loan_purpose_p1 =  as.numeric(data[31]),
    loan_purpose_p2 =  as.numeric(data[32]),
    loan_purpose_p3 =  as.numeric(data[33]),
    loan_purpose_p4 =  as.numeric(data[34]),
    occupancy_type_pr =  as.integer(data[35]),
    occupancy_type_ir =  as.integer(data[36]),
    occupancy_type_sr =  as.integer(data[37]),
    credit_type_equi =  as.integer(data[38]),
    credit_type_crif =  as.integer(data[39]),
    credit_type_cib =  as.integer(data[40]),
    credit_type_exp =  as.integer(data[41]),
    age_.25 =  as.numeric(data[42]),
    age_25.34 =  as.numeric(data[43]),
    age_35.44 =  as.numeric(data[44]),
    age_45.54 =  as.numeric(data[45]),
    age_55.64 =  as.numeric(data[46]),
    age_65.74 =  as.numeric(data[47]),
    age_.74 =  as.numeric(data[48]),
    Region_North =  as.integer(data[49]),
    Region_Central =  as.integer(data[50]),
    Region_South =  as.integer(data[51]),
    Region_North.East =  as.integer(data[52])
  )
  output = list(result = predict(modelo, df, type='response'))
  output = ifelse(output>0.5, 1, 0)
  return(output)
}
