#setwd('C:/Users/Usuario/Documents/GitHub/Plataformas-cognitivas')

data = read.csv('./tmp/data/data_normalized.csv', header = TRUE, sep = ',')

#LibrarieS

library(caTools)
library(ROCR)


#     Logistic Regression
#Splitting train and test
split = sample.split(data, SplitRatio = 0.8)
split

trainingset = subset(data, split == TRUE)
testset = subset(data, split == FALSE)


# Linear Regression with normalized data
logmodel = glm(Status ~., trainingset, family = "binomial")


logmodel

#Summary
summary(logmodel)


#Prediction 
pred = predict(logmodel, testset, type = "response")

pred

#Changing the probs
pred = ifelse(pred >0.5, 1, 0)



#Evaluating the accuracy
table(testset$Status, pred)

missclasserr = mean(pred != testset$Status)
print(paste('Accuracy =', 1 - missclasserr))


# ROC AUC Curve

ROCPred = prediction(pred, testset$Status)
ROCPer = performance(ROCPred, measure = "tpr", 
                      x.measure = "fpr")

auc = performance(ROCPred, measure = "auc")
auc = auc@y.values[[1]]
auc

# Plotting AUC Curve

plot(ROCPer)
plot(ROCPer, colorize = TRUE, 
     print.cutoffs.at = seq(0.1, by = 0.1), 
     main = "ROC CURVE")
abline(a = 0, b = 1)

auc = round(auc, 4)
legend(.6, .4, auc, title = "AUC", cex = 1)


#Saving the model

save(logmodel, file = "tmp/models/Rmodel.RData")
saveRDS(logmodel, file = "tmp/models/Rmodel.rds")

