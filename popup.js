document.addEventListener("DOMContentLoaded", function () {

    const scanButton = document.querySelector(".search-box button");
    const currentTabButton = document.querySelector(".scan-button");

    scanButton.addEventListener("click", scanWebsite);

    currentTabButton.addEventListener("click", scanCurrentTab);

});


function scanWebsite() {

    const input = document.getElementById("urlInput");
    const loading = document.getElementById("loading");

    let url = input.value.trim();

    if (url === "") {
        alert("Please enter a website URL.");
        return;
    }

    if (
        !url.startsWith("http://") &&
        !url.startsWith("https://")
    ) {
        url = "https://" + url;
    }

    loading.classList.remove("hidden");

    setTimeout(function () {

        loading.classList.add("hidden");

        analyzeURL(url);

    }, 1000);
}


function analyzeURL(url) {

    const scoreElement =
        document.getElementById("score");

    const resultText =
        document.getElementById("resultText");

    const domainElement =
        document.getElementById("domain");

    const httpsStatus =
        document.getElementById("httpsStatus");

    const domainStatus =
        document.getElementById("domainStatus");

    const phishingStatus =
        document.getElementById("phishingStatus");

    try {

        const parsedURL = new URL(url);

        const domain =
            parsedURL.hostname.toLowerCase();

        domainElement.textContent = domain;

        let score = 100;

        /*
         * HTTPS CHECK
         */

        if (parsedURL.protocol === "https:") {

            httpsStatus.textContent = "✓ Secure";
            httpsStatus.className = "passed";

        } else {

            score -= 25;

            httpsStatus.textContent = "⚠ HTTP";
            httpsStatus.className = "warning";
        }


        /*
         * SUSPICIOUS KEYWORDS
         */

        const suspiciousWords = [
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
        ];

        let suspicious = false;

        for (const word of suspiciousWords) {

            if (domain.includes(word)) {
                suspicious = true;
                break;
            }

        }


        if (suspicious) {

            score -= 20;

            phishingStatus.textContent =
                "⚠ Suspicious";

            phishingStatus.className =
                "warning";

        } else {

            phishingStatus.textContent =
                "✓ None";

            phishingStatus.className =
                "passed";
        }


        /*
         * DOMAIN LENGTH CHECK
         */

        if (domain.length > 40) {
            score -= 10;
        }


        /*
         * SUBDOMAIN CHECK
         */

        const parts = domain.split(".");

        if (parts.length > 4) {
            score -= 10;
        }


        /*
         * IP ADDRESS CHECK
         */

        const ipPattern =
            /^(\d{1,3}\.){3}\d{1,3}$/;

        if (ipPattern.test(domain)) {
            score -= 15;
        }


        /*
         * SPECIAL CHARACTER CHECK
         */

        const specialCharacters =
            (domain.match(/[-_]/g) || []).length;

        if (specialCharacters > 3) {
            score -= 10;
        }


        /*
         * LIMIT SCORE
         */

        if (score < 0) {
            score = 0;
        }

        if (score > 100) {
            score = 100;
        }


        /*
         * UPDATE SCORE
         */

        scoreElement.textContent = score;


        /*
         * DOMAIN STATUS
         */

        if (score >= 80) {

            domainStatus.textContent =
                "✓ Verified";

            domainStatus.className =
                "passed";

        } else if (score >= 50) {

            domainStatus.textContent =
                "⚠ Review";

            domainStatus.className =
                "warning";

        } else {

            domainStatus.textContent =
                "⚠ Risky";

            domainStatus.className =
                "danger";
        }


        /*
         * FINAL RESULT
         */

        if (score >= 80) {

            resultText.textContent =
                "Website Looks Safe";

            resultText.className =
                "safe-text";

        } else if (score >= 50) {

            resultText.textContent =
                "Use With Caution";

            resultText.className =
                "safe-text warning";

        } else {

            resultText.textContent =
                "Potentially Unsafe";

            resultText.className =
                "safe-text danger";
        }


        /*
         * UPDATE SCORE CIRCLE
         */

        updateScoreCircle(score);

    } catch (error) {

        alert("Invalid URL.");

    }
}


function updateScoreCircle(score) {

    const circle =
        document.querySelector(".score-circle");

    const degree =
        (score / 100) * 360;

    circle.style.background =
        `
        radial-gradient(
            circle,
            #0b111e 62%,
            transparent 63%
        ),
        conic-gradient(
            #55ff9a 0deg,
            #55ff9a ${degree}deg,
            #26344b ${degree}deg,
            #26344b 360deg
        )
        `;
}


function scanCurrentTab() {

    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        function (tabs) {

            if (!tabs || tabs.length === 0) {
                return;
            }

            const url = tabs[0].url;

            if (
                url.startsWith("chrome://") ||
                url.startsWith("chrome-extension://")
            ) {

                alert(
                    "Chrome internal pages cannot be scanned."
                );

                return;
            }

            document.getElementById(
                "urlInput"
            ).value = url;

            analyzeURL(url);
        }
    );
}
