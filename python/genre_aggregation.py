import pandas as pd
import numpy as np

data = pd.read_csv("../data/bestsellers with categories.csv")


grouped_data = (
    data.groupby(["Year"]).aggregate({"User Rating": [np.max, np.min]}).reset_index()
)

grouped_data.columns = ["_".join(col).strip() for col in grouped_data.columns.values]


grouped_data.to_csv("../data/year_rating_var.csv", index=False)
