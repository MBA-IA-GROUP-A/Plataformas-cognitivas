import pandas as pd
import sys
import os
sys.path.append('get_data')
from get_data import GetData

class NormalizedData():
  boolean_fields = [
    {
      'name': 'loan_limit',
      'map0': 'ncf',
      'map1': 'cf'
    },
    {
      'name': 'approv_in_adv',
      'map0': 'nopre',
      'map1': 'pre'
    },
    {
      'name': 'Credit_Worthiness',
      'map0': 'l1',
      'map1': 'l2'
    },
    {
      'name': 'open_credit',
      'map0': 'nopc',
      'map1': 'opc'
    },
    {
      'name': 'Neg_ammortization',
      'map0': 'not_neg',
      'map1': 'neg_amm'
    },
    {
      'name': 'interest_only',
      'map0': 'not_int',
      'map1': 'int_only'
    },
    {
      'name': 'lump_sum_payment',
      'map0': 'not_lpsm',
      'map1': 'lpsm'
    },
    {
      'name': 'construction_type',
      'map0': 'sb',
      'map1': 'mh'
    },
    {
      'name': 'Secured_by',
      'map0': 'land',
      'map1': 'home'
    },
    {
      'name': 'business_or_commercial',
      'map0': 'nob/c',
      'map1': 'b/c'
    },
    {
      'name': 'Security_Type',
      'map0': 'Indriect',
      'map1': 'direct'
    },
    {
      'name': 'co_applicant_credit_type',
      'map0': 'CIB',
      'map1': 'EXP'
    },
    {
      'name': 'submission_of_application',
      'map0': 'not_inst',
      'map1': 'to_inst'
    }
  ]

  median_na_fields = [
    'rate_of_interest',
    'Upfront_charges',
    'term',
    'property_value',
    'income',
    'LTV',
    'dtir1'
  ]

  def __init__(self):
    pathToData = 'tmp/data.csv'
    if (os.path.exists(pathToData) == False):
      print('Data not found, downloading...')
      self.get_data = GetData()
      self.pathToData = self.get_data.get_to_temp_folder('data.csv')
    else:
      self.pathToData = pathToData

    self.dataset = pd.read_csv(self.pathToData)


  def normalize_to_csv(self):
    path = 'tmp/data_normalized.csv'
    dataToCsv = []

    if 'ID' in self.dataset :
      dataToCsv = self.normalize_data()
    else:
      dataToCsv = self.dataset

    dataToCsv.to_csv(path, index=False)
    return path

  def normalize_data(self):   
    self.dataset.drop(['ID'], axis=1, inplace=True)
    self.dataset.drop(['year'], axis=1, inplace=True)
    self.dataset.drop(['Interest_rate_spread'], axis=1, inplace=True)

    for index, item in enumerate(self.boolean_fields):
      self.__normalized_cat_bool(item['name'], item['map0'], item['map1'])

    self.__normalize_gender()
    self.__normalize_loan_type()
    self.__normalize_loan_purpose()
    self.__normalize_total_units()
    self.__normalize_occupancy_type()
    self.__normalize_credit_type()
    self.__normalize_age()
    self.__normalize_region()

    for field in self.median_na_fields:
      self.__fill_na_median(field)

    print('Dataset normalized: ', self.dataset.info())

    return self.dataset

  def __fill_na_median(self, field):
    self.dataset[field] = self.dataset[field].fillna(self.dataset[field].median())

  def __normalized_cat_bool(self, field, map0, map1):
    toMap = {}
    toMap[map0] = 0
    toMap[map1] = 1
    self.dataset[field] = self.dataset[field].map(toMap)
    self.dataset[field] = self.dataset[field].fillna(0)

  def __normalize_gender(self):
    self.dataset['GenderMale'] = self.dataset['Gender'].map({ 'Male': 1, 'Female': 0, 'Joint': 0, 'Sex Not Available': 0 })
    self.dataset['GenderFemale'] = self.dataset['Gender'].map({ 'Male': 0, 'Female': 1, 'Joint': 0, 'Sex Not Available': 0 })
    self.dataset['GenderJoint'] = self.dataset['Gender'].map({ 'Male': 0, 'Female': 0, 'Joint': 1, 'Sex Not Available': 0 })
    self.dataset.drop(['Gender'], axis=1, inplace=True)

  def __normalize_loan_type(self):
    self.dataset['loan_type1'] = self.dataset['loan_type'].map({ 'type1': 1, 'type2': 0, 'type3': 0 })
    self.dataset['loan_type2'] = self.dataset['loan_type'].map({ 'type1': 0, 'type2': 1, 'type3': 0 })
    self.dataset['loan_type3'] = self.dataset['loan_type'].map({ 'type1': 0, 'type2': 0, 'type3': 1 })
    self.dataset.drop(['loan_type'], axis=1, inplace=True)

  def __normalize_loan_purpose(self):
    self.dataset['loan_purpose_p1'] = self.dataset['loan_purpose'].map({ 'p1': 1, 'p2': 0, 'p3': 0, 'p4': 0, 'nan': 0 })
    self.dataset['loan_purpose_p2'] = self.dataset['loan_purpose'].map({ 'p1': 0, 'p2': 1, 'p3': 0, 'p4': 0, 'nan': 0 })
    self.dataset['loan_purpose_p3'] = self.dataset['loan_purpose'].map({ 'p1': 0, 'p2': 0, 'p3': 1, 'p4': 0, 'nan': 0 })
    self.dataset['loan_purpose_p4'] = self.dataset['loan_purpose'].map({ 'p1': 0, 'p2': 0, 'p3': 0, 'p4': 1, 'nan': 0 })
    self.dataset['loan_purpose_p1'] = self.dataset['loan_purpose_p1'].fillna(0)
    self.dataset['loan_purpose_p2'] = self.dataset['loan_purpose_p2'].fillna(0)
    self.dataset['loan_purpose_p3'] = self.dataset['loan_purpose_p3'].fillna(0)
    self.dataset['loan_purpose_p4'] = self.dataset['loan_purpose_p4'].fillna(0)
    self.dataset.drop(['loan_purpose'], axis=1, inplace=True)

  def __normalize_occupancy_type(self):
    self.dataset['occupancy_type_pr'] = self.dataset['occupancy_type'].map({ 'pr': 1, 'ir': 0, 'sr': 0 })
    self.dataset['occupancy_type_ir'] = self.dataset['occupancy_type'].map({ 'pr': 0, 'ir': 1, 'sr': 0 })
    self.dataset['occupancy_type_sr'] = self.dataset['occupancy_type'].map({ 'pr': 0, 'ir': 0, 'sr': 1 })
    self.dataset.drop(['occupancy_type'], axis=1, inplace=True)

  def __normalize_total_units(self):
    self.dataset['total_units'] = self.dataset['total_units'].map({ '1U': 1, '2U': 2, '3U': 3, '4U': 4 })

  def __normalize_credit_type(self):
    self.dataset['credit_type_equi'] = self.dataset['credit_type'].map({ 'EQUI': 1, 'CRIF': 0, 'CIB': 0, 'EXP': 0 })
    self.dataset['credit_type_crif'] = self.dataset['credit_type'].map({ 'EQUI': 0, 'CRIF': 1, 'CIB': 0, 'EXP': 0 })
    self.dataset['credit_type_cib'] = self.dataset['credit_type'].map({ 'EQUI': 0, 'CRIF': 0, 'CIB': 1, 'EXP': 0 })
    self.dataset['credit_type_exp'] = self.dataset['credit_type'].map({ 'EQUI': 0, 'CRIF': 0, 'CIB': 0, 'EXP': 1 })
    self.dataset.drop(['credit_type'], axis=1, inplace=True)

  def __normalize_age(self):
    self.dataset['age_<25'] = self.dataset['age'].map({ '<25': 1, '25-34': 0, '35-44': 0, '45-54': 0, '55-64': 0, '65-74': 0, '>74': 0 })
    self.dataset['age_<25'] = self.dataset['age_<25'].fillna(0)

    self.dataset['age_25-34'] = self.dataset['age'].map({ '<25': 0, '25-34': 1, '35-44': 0, '45-54': 0, '55-64': 0, '65-74': 0, '>74': 0 })
    self.dataset['age_25-34'] = self.dataset['age_25-34'].fillna(0)

    self.dataset['age_35-44'] = self.dataset['age'].map({ '<25': 0, '25-34': 0, '35-44': 1, '45-54': 0, '55-64': 0, '65-74': 0, '>74': 0 })
    self.dataset['age_35-44'] = self.dataset['age_35-44'].fillna(0)

    self.dataset['age_45-54'] = self.dataset['age'].map({ '<25': 0, '25-34': 0, '35-44': 0, '45-54': 1, '55-64': 0, '65-74': 0, '>74': 0 })
    self.dataset['age_45-54'] = self.dataset['age_45-54'].fillna(0)

    self.dataset['age_55-64'] = self.dataset['age'].map({ '<25': 0, '25-34': 0, '35-44': 0, '45-54': 0, '55-64': 1, '65-74': 0, '>74': 0 })
    self.dataset['age_55-64'] = self.dataset['age_55-64'].fillna(0)

    self.dataset['age_65-74'] = self.dataset['age'].map({ '<25': 0, '25-34': 0, '35-44': 0, '45-54': 0, '55-64': 0, '65-74': 1, '>74': 0 })
    self.dataset['age_65-74'] = self.dataset['age_65-74'].fillna(0)

    self.dataset['age_>74'] = self.dataset['age'].map({ '<25': 0, '25-34': 0, '35-44': 0, '45-54': 0, '55-64': 0, '65-74': 0, '>74': 1 })
    self.dataset['age_>74'] = self.dataset['age_>74'].fillna(0)

    self.dataset.drop(['age'], axis=1, inplace=True)

  def __normalize_region(self):
    self.dataset['Region_North'] = self.dataset['Region'].map({ 'North': 1, 'central': 0, 'south': 0, 'North-East': 0 })
    self.dataset['Region_Central'] = self.dataset['Region'].map({ 'North': 0, 'central': 1, 'south': 0, 'North-East': 0 })
    self.dataset['Region_South'] = self.dataset['Region'].map({ 'North': 0, 'central': 0, 'south': 1, 'North-East': 0 })
    self.dataset['Region_North-East'] = self.dataset['Region'].map({ 'North': 0, 'central': 0, 'south': 0, 'North-East': 1 })
    self.dataset['Region_North'] = self.dataset['Region_North'].fillna(0)
    self.dataset['Region_Central'] = self.dataset['Region_Central'].fillna(0)
    self.dataset['Region_South'] = self.dataset['Region_South'].fillna(0)
    self.dataset['Region_North-East'] = self.dataset['Region_North-East'].fillna(0)
    self.dataset.drop(['Region'], axis=1, inplace=True)