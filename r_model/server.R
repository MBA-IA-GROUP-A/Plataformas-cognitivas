# Saving the model in tmp/models if it doesn't exist
if (!file.exists("../tmp/models/Rmodel.rds")) {
  print("R model not found! Running the training")
  source("r_model/model.R")
  print("Model saved!")
  # source("r_model/plumber.R")
} else {
  print("R Model found")
  # source("r_model/plumber.R")
}
