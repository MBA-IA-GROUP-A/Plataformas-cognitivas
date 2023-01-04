# Running the requirements
source("./r_model/requirements.R")


# Saving the model in tmp/models if it doesn't exist
if (!file.exists("./tmp/models/Rmodel.rda")) {
  print("R model not found! Running the training")
  source("./r_model/model.R")
  print("Model saved!")
} else {
  print("R Model found")
}
