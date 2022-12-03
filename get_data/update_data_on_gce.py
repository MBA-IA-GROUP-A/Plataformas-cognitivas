
from get_data import GetData

getData = GetData()

data = getData.get_big_query_data(
    'emf-teacher', 'trabalho_loans', 'loan_default')

getData.write_in_storage_as_csv('data.csv', data)

getData.get_url_file('data.csv')
getData.get_url_file('data.json')
