import pandas as pd
import sys
import os
sys.path.append(os.getcwd())
from normalization import NormalizedData

if __name__ == "__main__":
  normalizedData = NormalizedData()
  normalizedData.normalize_to_csv()
  pass