from flask import Flask, request, jsonify
from flask_cors import CORS

import joblib
import pandas as pd

from analyzer import (
    extract_features,
    calculate_rule_score
)


app = Flask(__name__)

CORS(app)


MODEL_PATH = "model/safesurf_model.pkl"

model = joblib.load(MODEL_PATH)


FEATURE_ORDER = [
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


@app.route("/")
def home():

    return jsonify({
        "status": "SafeSurf API is running"
    })


@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No JSON data received"
        }), 400

    url = data.get("url")

    if not url:
        return jsonify({
            "error": "URL is required"
        }), 400

    try:

        features = extract_features(url)

        feature_values = [
            features[name]
            for name in FEATURE_ORDER
        ]

        input_data = pd.DataFrame(
            [feature_values],
            columns=FEATURE_ORDER
        )

        prediction = model.predict(
            input_data
        )[0]

        probability = model.predict_proba(
            input_data
        )[0]

        malicious_probability = (
            probability[1]
            if len(probability) > 1
            else 0
        )

        rule_score = calculate_rule_score(
            features
        )

        ml_score = (
            100 -
            int(malicious_probability * 100)
        )

        final_score = int(
            (rule_score * 0.5) +
            (ml_score * 0.5)
        )

        if final_score >= 80:

            status = "safe"

        elif final_score >= 50:

            status = "suspicious"

        else:

            status = "dangerous"

        return jsonify({

            "url": url,

            "score": final_score,

            "status": status,

            "prediction": int(prediction),

            "https": bool(
                features["https"]
            ),

            "domain_authentication":
                features["https"] == 1,

            "phishing":
                bool(
                    features["suspicious_word"]
                ),

            "ip_address":
                bool(
                    features["ip_address"]
                ),

            "features": features

        })

    except Exception as error:

        return jsonify({
            "error": str(error)
        }), 500


if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
