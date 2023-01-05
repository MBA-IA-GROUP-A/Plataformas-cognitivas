# Importando a biblioteca plumber
library(plumber)

setwd('C:/Users/Usuario/Documents/GitHub/Plataformas-cognitivas')
# Carregamento do modelo para um objeto
modelo = readRDS("./tmp/models/Rmodel.rds")

#* @apiTitle R Regression Model

#* @param loan_limit:numeric
#* @param approv_in_adv:numeric
#* @param Credit_Worthiness:integer
#* @param open_credit:integer
#* @param business_or_commercial:integer
#* @param loan_amount:integer
#* @param rate_of_interest:numeric
#* @param Upfront_charges:numeric
#* @param term:numeric
#* @param Neg_ammortization:numeric
#* @param interest_only:integer
#* @param lump_sum_payment:integer
#* @param property_value:numeric
#* @param construction_type:integer
#* @param Secured_by:integer
#* @param total_units:integer
#* @param income:numeric
#* @param Credit_Score:integer
#* @param co_applicant_credit_type:integer
#* @param submission_of_application:numeric
#* @param LTV:numeric
#* @param Security_Type:integer
#* @param Status:integer
#* @param GenderMale:integer
#* @param GenderFemale:integer
#* @param GenderJoint:integer
#* @param loan_type1:integer
#* @param loan_type2:integer
#* @param loan_type3:integer
#* @param loan_purpose_p1:numeric
#* @param loan_purpose_p2:numeric
#* @param loan_purpose_p3:numeric
#* @param loan_purpose_p4:numeric
#* @param occupancy_type_pr:integer
#* @param occupancy_type_ir:integer
#* @param occupancy_type_sr:integer
#* @param credit_type_equi:integer
#* @param credit_type_crif:integer
#* @param credit_type_cib:integer
#* @param credit_type_exp:integer
#* @param age_.25:numeric
#* @param age_25.34:numeric
#* @param age_35.44:numeric
#* @param age_45.54:numeric
#* @param age_55.64:numeric
#* @param age_65.74:numeric
#* @param age_.74:numeric
#* @param Region_North:integer
#* @param Region_Central:integer
#* @param Region_South:integer
#* @param Region_North.East:integer
#* @post /predict
#* @serializer unboxedJSON
function(loan_limit, approv_in_adv, Credit_Worthiness, open_credit, business_or_commercial, 
         loan_amount, rate_of_interest, Upfront_charges, term, Neg_ammortization, interest_only, 
         lump_sum_payment, property_value, construction_type, Secured_by, total_units, income, 
         Credit_Score, co_applicant_credit_type, submission_of_application, LTV, Security_Type, 
         Status, GenderMale, GenderFemale, GenderJoint, loan_type1, loan_type2, loan_type3, 
         loan_purpose_p1, loan_purpose_p2, loan_purpose_p3, loan_purpose_p4, occupancy_type_pr, 
         occupancy_type_ir, occupancy_type_sr, credit_type_equi, credit_type_crif, credit_type_cib, 
         credit_type_exp, age_.25, age_25.34, age_35.44, age_45.54, age_55.64, age_65.74, age_.74, 
         Region_North, Region_Central, Region_South, Region_North.East)
{
  df = data.frame(
    loan_limit =  as.numeric(loan_limit),
    approv_in_adv =  as.numeric(approv_in_adv),
    Credit_Worthiness =  as.integer(Credit_Worthiness),
    open_credit =  as.integer(open_credit),
    business_or_commercial =  as.integer(business_or_commercial),
    loan_amount =  as.integer(loan_amount),
    rate_of_interest =  as.numeric(rate_of_interest),
    Upfront_charges =  as.numeric(Upfront_charges),
    term =  as.numeric(term),
    Neg_ammortization =  as.numeric(Neg_ammortization),
    interest_only =  as.integer(interest_only),
    lump_sum_payment =  as.integer(lump_sum_payment),
    property_value =  as.numeric(property_value),
    construction_type =  as.integer(construction_type),
    Secured_by =  as.integer(Secured_by),
    total_units =  as.integer(total_units),
    income =  as.numeric(income),
    Credit_Score =  as.integer(Credit_Score),
    co_applicant_credit_type =  as.integer(co_applicant_credit_type),
    submission_of_application =  as.numeric(submission_of_application),
    LTV =  as.numeric(LTV),
    Security_Type =  as.integer(Security_Type),
    Status =  as.integer(Status),
    GenderMale =  as.integer(GenderMale),
    GenderFemale =  as.integer(GenderFemale),
    GenderJoint =  as.integer(GenderJoint),
    loan_type1 =  as.integer(loan_type1),
    loan_type2 =  as.integer(loan_type2),
    loan_type3 =  as.integer(loan_type3),
    loan_purpose_p1 =  as.numeric(loan_purpose_p1),
    loan_purpose_p2 =  as.numeric(loan_purpose_p2),
    loan_purpose_p3 =  as.numeric(loan_purpose_p3),
    loan_purpose_p4 =  as.numeric(loan_purpose_p4),
    occupancy_type_pr =  as.integer(occupancy_type_pr),
    occupancy_type_ir =  as.integer(occupancy_type_ir),
    occupancy_type_sr =  as.integer(occupancy_type_sr),
    credit_type_equi =  as.integer(credit_type_equi),
    credit_type_crif =  as.integer(credit_type_crif),
    credit_type_cib =  as.integer(credit_type_cib),
    credit_type_exp =  as.integer(credit_type_exp),
    age_.25 =  as.numeric(age_.25),
    age_25.34 =  as.numeric(age_25.34),
    age_35.44 =  as.numeric(age_35.44),
    age_45.54 =  as.numeric(age_45.54),
    age_55.64 =  as.numeric(age_55.64),
    age_65.74 =  as.numeric(age_65.74),
    age_.74 =  as.numeric(age_.74),
    Region_North =  as.integer(Region_North),
    Region_Central =  as.integer(Region_Central),
    Region_South =  as.integer(Region_South),
    Region_North.East =  as.integer(Region_North.East)
  )
  output = list(prob = predict(modelo, df, type='response'))
  return(output)
}

