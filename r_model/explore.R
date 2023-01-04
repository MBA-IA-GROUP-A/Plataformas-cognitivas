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

colnames(data)