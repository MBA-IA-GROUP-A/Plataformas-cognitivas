import pandas as pd
import sys
sys.path.append('normalization')
from normalization import NormalizedData

if __name__ == "__main__":
  normalizedData = NormalizedData()
  normalizedData.normalize_to_csv()
  pass