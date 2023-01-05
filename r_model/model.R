#setwd('C:/Users/Usuario/Documents/GitHub/Plataformas-cognitivas')

data = read.csv('./tmp/data/data_normalized.csv', header = TRUE, sep = ',')

#LibrarieS

library(caTools)
library(ggplot2)


#     Linear Regression
#Splitting train and test
split = sample.split(data$dtir1, SplitRatio = 0.7)
trainingset = subset(data, split == FALSE)
testset = subset(data, split == FALSE)


# Linear Regression with normalized data
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



#Saving the model

save(lm.r, file = "tmp/models/Rmodel.RData")
saveRDS(lm.r, file = "tmp/models/Rmodel.rds")

#Loading the model (testing)

#model_old = readRDS("C:/Users/Usuario/Documents/GitHub/Plataformas-cognitivas/r_model/model.rda")




