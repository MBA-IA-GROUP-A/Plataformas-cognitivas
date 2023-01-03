setwd('C:/Users/Usuario/Documents/GitHub/Plataformas-cognitivas/r_model')


data = read.csv('data_normalized.csv')

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


# Checking the distribution of the target
hist(data$dtir1)





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

lm.r = lm(formula = dtir1 ~., trainingset)

  
coef(lm.r)

#Predicting test set results
ypred = predict(lm.r, newdata = testset)

ypred

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










