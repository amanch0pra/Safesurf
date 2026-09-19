import pandas as pd
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score


DATASET = "website_dataset.csv"

df = pd.read_csv(DATASET)

features = [
    "https",
    "url_length",
    "domain_length",
    "subdomain_count",
    "special_char_count",
    "digit_count",
    "suspicious_word",
    "ip_address",
    "at_symbol",
    "hyphen_count",
    "query_length"
]

X = df[features]

y = df["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    class_weight="balanced"
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    predictions
)

print("Model Accuracy:", accuracy)

joblib.dump(
    model,
    "model/safesurf_model.pkl"
)

print("Model saved successfully.")
