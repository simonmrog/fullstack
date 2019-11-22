# %%importing the libraries
import pandas as pd
import numpy as np

# %%loading the data
dataset = pd.read_csv ("salary-data.csv")
x = dataset.iloc [:, :-1].values
y = dataset.iloc [:, -1].values

# %%train-test splitting
from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split (x, y, test_size=0.2, random_state=0)

# %%fitting model to the data
from sklearn.linear_model import LinearRegression
model = LinearRegression ()
model.fit (x_train, y_train)
y_pred = model.predict (x_test)
acc = model.score (x_test, y_test)
print ("acc: {}%".format (acc * 100))
y_pred = model.predict ([[1.4]])
print (y_pred)

# %%saving model to disk
import pickle
pickle.dump (model, open ("model.pkl", "wb"))