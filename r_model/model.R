data = read.csv('loan_default_normalized.csv')

summary(data)

str(data)

#Libraries

install.packages('tidyverse')
install.packages('caTools')
install.packages("ggplot2")


#library(tidyverse)
library(caTools)
library(ggplot2)


#Taking a look at the distributions

barplot(table(data$interest_only), main = 'interest_only', col=rgb(0.2,0.4,0.6,0.6), ylim=c(0, 100))
barplot(table(data$loan_limit), main = 'loan_limit', col=rgb(0.2,0.4,0.6,0.6), ylim=c(0, 100))
barplot(table(data$approv_in_adv), main = 'approv_in_adv', col=rgb(0.2,0.4,0.6,0.6), ylim=c(0, 100))
barplot(table(data$open_credit), main = 'open_credit', col=rgb(0.2,0.4,0.6,0.6), ylim=c(0, 100))
barplot(table(data$construction_type), main = 'construction_type', col=rgb(0.2,0.4,0.6,0.6), ylim=c(0, 100))
barplot(table(data$Secured_by), main = 'Secured_by', col=rgb(0.2,0.4,0.6,0.6), ylim=c(0, 100))
barplot(table(data$total_units), main = 'total_units', col=rgb(0.2,0.4,0.6,0.6), ylim=c(0, 100))

#Outliers

boxplot(table(data$interest_only), main = 'interest_only')
boxplot(table(data$loan_limit), main = 'loan_limit')
boxplot(table(data$approv_in_adv), main = 'approv_in_adv')
boxplot(table(data$open_credit), main = 'open_credit')
boxplot(table(data$construction_type), main = 'construction_type')
boxplot(table(data$Secured_by), main = 'Secured_by')
boxplot(table(data$total_units), main = 'total_units')




#     Linear Regression
#Splitting train and test
split = sample.split(data$dtir1, SplitRatio = 0.7)
trainingset = subset(data, split == FALSE)
testset = subset(data, split == FALSE)

#Fitting linear regression train set
colnames(data)

# rate_of_interest +
# Upfront_charges +
# property_value +
# LTV +

lm.r = lm(formula = dtir1 ~ loan_limit + approv_in_adv + Credit_Worthiness + open_credit + business_or_commercial +
          loan_amount + term + Neg_ammortization + interest_only + lump_sum_payment +
           construction_type + Secured_by + total_units + income + Credit_Score + co_applicant_credit_type +
          submission_of_application +  Security_Type + Status + GenderMale + GenderFemale + GenderJoint + loantype1 +
          loantype2 + loantype3 + loanpurpose_p1 + loanpurpose_p2 + loanpurpose_p3 + loanpurpose_p4 + occupancytype_pr +
          occupancytype_ir + occupancytype_sr + credittype_equi + credittype_crif + credittype_cib + credittype_exp +
          age_.25 + age_25.34 + age_35.44 + age_45.54 + age_55.64 + age_65.74 + age_.74 + RNorth + RCentral + RSouth +
          RNorth_East,
          data = trainingset)
  
coef(lm.r)

#Predicting test set results
ypred = predict(lm.r, newdata = testset)


#Training results plots
ggplot() + geom_point(aes(x = trainingset$loan_limit,
                          y = trainingset$dtir1), colour = 'red') +
  geom_line(aes(x = trainingset$loan_limit,
                y = predict(lm.r, newdata = trainingset)), colour = 'blue') +
  ggtitle('dtir1 vs loan limit') +
  xlab('loan limit') +
  ylab('dtir1')


#Test results plots
ggplot() + geom_point(aes(x = testset$loan_limit,
                          y = testset$dtir1), colour = 'red') +
  geom_line(aes(x = testset$loan_limit,
                y = predict(lm.r, newdata = testset)), colour = 'blue') +
  ggtitle('dtir1 vs loan limit') +
  xlab('loan limit') +
  ylab('dtir1')










