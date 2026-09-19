import re
from urllib.parse import urlparse


SUSPICIOUS_WORDS = [
    "login",
    "verify",
    "account",
    "password",
    "secure",
    "update",
    "bank",
    "wallet",
    "claim",
    "free",
    "winner"
]


def extract_features(url):

    parsed = urlparse(url)

    domain = parsed.netloc.lower()

    if ":" in domain:
        domain = domain.split(":")[0]

    features = {}

    features["https"] = 1 if parsed.scheme == "https" else 0

    features["url_length"] = len(url)

    features["domain_length"] = len(domain)

    features["subdomain_count"] = max(
        len(domain.split(".")) - 2,
        0
    )

    features["special_char_count"] = (
        len(re.findall(r"[-_]", domain))
    )

    features["digit_count"] = (
        len(re.findall(r"\d", domain))
    )

    features["suspicious_word"] = 0

    for word in SUSPICIOUS_WORDS:

        if word in domain:
            features["suspicious_word"] = 1
            break

    ip_pattern = r"^(\d{1,3}\.){3}\d{1,3}$"

    features["ip_address"] = (
        1 if re.match(ip_pattern, domain) else 0
    )

    features["at_symbol"] = (
        1 if "@" in url else 0
    )

    features["hyphen_count"] = domain.count("-")

    features["query_length"] = len(parsed.query)

    return features


def calculate_rule_score(features):

    score = 100

    if features["https"] == 0:
        score -= 25

    if features["suspicious_word"] == 1:
        score -= 20

    if features["ip_address"] == 1:
        score -= 15

    if features["at_symbol"] == 1:
        score -= 15

    if features["subdomain_count"] > 3:
        score -= 10

    if features["domain_length"] > 40:
        score -= 10

    if features["hyphen_count"] > 3:
        score -= 10

    return max(0, min(100, score))
