
getwd()


setwd('C:/Users/Usuario/Documents/GitHub/Plataformas-cognitivas/r_model')

# Libraries

install.packages('dplyr')
install.packages('tidyr')

library(dplyr)
library(tidyr)


# Loading/Viewing data
data = read.csv('loan_default.csv')

View(data)
summary(data)


#Droping useless columns

data = data %>% mutate(ID = NULL, year = NULL, Interest_rate_spread = NULL)

head(data)

#Normalizing data
    # Gender
data['GenderMale'] = with(data, ifelse(Gender == 'Male', 1, 0))
data['GenderFemale'] = with(data, ifelse(Gender == 'Female', 1, 0))
data['GenderJoint'] = with(data, ifelse(Gender == 'Joint', 1, 0))


    #Loan Type
data['loantype1'] = with(data, ifelse(loan_type == 'type1', 1, 0))
data['loantype2'] = with(data, ifelse(loan_type == 'type2', 1, 0))
data['loantype3'] = with(data, ifelse(loan_type == 'type3', 1, 0))

    #Loan Purpose
data['loanpurpose_p1'] = with(data, ifelse(loan_purpose == 'p1', 1, 0))
data['loanpurpose_p2'] = with(data, ifelse(loan_purpose == 'p2', 1, 0))
data['loanpurpose_p3'] = with(data, ifelse(loan_purpose == 'p3', 1, 0))
data['loanpurpose_p4'] = with(data, ifelse(loan_purpose == 'p4', 1, 0))


    #Occupancy type
data['occupancytype_pr'] = with(data, ifelse(occupancy_type == 'pr', 1, 0))
data['occupancytype_ir'] = with(data, ifelse(occupancy_type == 'ir', 1, 0))
data['occupancytype_sr'] = with(data, ifelse(occupancy_type == 'sr', 1, 0))


    #Total Units
data['total_units'] = with(data, ifelse(total_units == '1U', 1, ifelse(
                                        total_units == '2U', 2, ifelse(
                                        total_units == '3U', 3, ifelse(
                                        total_units == '4U', 4, 0)))))


    #Credit Type
data['credittype_equi'] = with(data, ifelse(credit_type == 'EQUI', 1, 0))
data['credittype_crif'] = with(data, ifelse(credit_type == 'CRIF', 1, 0))
data['credittype_cib'] = with(data, ifelse(credit_type == 'CIB', 1, 0))
data['credittype_exp'] = with(data, ifelse(credit_type == 'EXP', 1, 0))


    #Age
data['age_<25'] = with(data, ifelse(age == '<25', 1, 0))
data['age_25-34'] = with(data, ifelse(age == '25-34', 1, 0))
data['age_35-44'] = with(data, ifelse(age == '35-44', 1, 0))
data['age_45-54'] = with(data, ifelse(age == '45-54', 1, 0))
data['age_55-64'] = with(data, ifelse(age == '55-64', 1, 0))
data['age_65-74'] = with(data, ifelse(age == '65-74', 1, 0))
data['age_>74'] = with(data, ifelse(age == '>74', 1, 0))


    #Region
data['RNorth'] = with(data, ifelse(Region == 'North', 1, 0))
data['RCentral'] = with(data, ifelse(Region == 'central', 1, 0))
data['RSouth'] = with(data, ifelse(Region == 'south', 1, 0))
data['RNorth_East'] = with(data, ifelse(Region == 'North-East', 1, 0))
  

    #Boolean fields
data['loan_limit'] = with(data, ifelse(loan_limit == 'cf', 1, 0))
data['approv_in_adv'] = with(data, ifelse(approv_in_adv == 'pre', 1, 0))
data['Credit_Worthiness'] = with(data, ifelse(Credit_Worthiness == 'l2', 1, 0))
data['open_credit'] = with(data, ifelse(open_credit == 'opc', 1, 0))
data['Neg_ammortization'] = with(data, ifelse(Neg_ammortization == 'neg_amm', 1, 0))
data['interest_only'] = with(data, ifelse(interest_only == 'int_only', 1, 0))
data['lump_sum_payment'] = with(data, ifelse(lump_sum_payment == 'lpsm', 1, 0))
data['construction_type'] = with(data, ifelse(construction_type == 'mh', 1, 0))
data['Secured_by'] = with(data, ifelse(Secured_by == 'home', 1, 0))
data['business_or_commercial'] = with(data, ifelse(business_or_commercial == 'b/c', 1, 0))
data['Security_Type'] = with(data, ifelse(Security_Type == 'direct', 1, 0))
data['co_applicant_credit_type'] = with(data, ifelse(co_applicant_credit_type == 'EXP', 1, 0))
data['submission_of_application'] = with(data, ifelse(submission_of_application == 'to_inst', 1, 0))


    #Fill NA fields with median
data %>% mutate(across(c(rate_of_interest, Upfront_charges,
                         term, property_value, income, LTV,
                         dtir1), ~replace_na(., median(., na.rm=TRUE))))


#Droping Original non normalized columns

data = data %>% mutate(Gender = NULL, loan_type = NULL, loan_purpose = NULL,
                       occupancy_type = NULL, credit_type = NULL, age = NULL,
                       Region = NULL)





#Extracting normalized csv file

write.csv(data, 'loan_default_normalized.csv')

data = data %>% mutate(X = NULL)

