const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

const url = 'https://login.microsoftonline.com/common/GetCredentialType?mkt=en-US';

const payloadTemplate = {
    isOtherIdpSupported: true,
    checkPhones: false,
    isRemoteNGCSupported: true,
    isCookieBannerShown: false,
    isFidoSupported: true,
    country: "NG",
    forceotclogin: false,
    isExternalFederationDisallowed: false,
    isRemoteConnectSupported: false,
    federationFlags: 0,
    isSignup: false,
    flowToken: "AQABAAEAAAAtyolDObpQQ5VtlI4uGjEPmVTvB5eZTaL_xvRdNX8zoF_M9oCPfpR1_3-Wz9ETrDbl5ca9Avq0LYJkoyoMgY5LIhrw_zFYKZPKDynsKoHPZfgeKmWiIAs1DXbLOrj1FwddvGzTm1ABWqIWhpNkryjIGv9-pljgbUnhPWj9pTn9ffvUpp8V2MtaAhrj46pyDne0WQmgpo5yxrOcie6NRDmX-vIRN1MIuXjLJ27VP51D0OM2hEp1OD47P6dtU6fk3-n2oCqUh1nP1tJCP1Pr47Uw2d3Hx3uCPYHHQJ8S3DkYwNqi4ieYGWQoRIaGrswGKuHiQRsyIuf8jtXEVXyOGqJhVIrV13orhsMe8QFdNAQE95yTcr7oSV6cXL7EWJdelszMsPUosCWSNdpwVI3lFGrKkYHetSaT2PrQem5AJIKBpKpvdLzk4q_P1P5_HA5hrOLCjH451cW4GJ2aVLL8wejgiEdppAzICHiHJOAthyGUP1R7w0z62wD6Ml9QOrRuqGS1KRxOCycJSUhLQcXDX5yIL1PCokaNJIAca5y1wkJb4zMbwhsGoVaUnWZK8XjTWYovsLqEn1dvUW_GrQxdQzwyIAA",
    isAccessPassSupported: true,
};

const headers = {
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "close",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0"
};

app.post('/check-mail', async (req, res) => {
    const { email } = req.body;

    console.log(email);
    console.log(req.body);

    if (!email) {
        return res.status(400).json({ error: "Missing email in request body." });
    }

    try {
        const payload = { ...payloadTemplate, username: email };

        const response = await axios.post(url, payload, { headers });

        const result = response.data?.IfExistsResult;

        if (result === 5 || result === 0) {
            return res.json({ status: "valid", code: result });
        } else {
            return res.json({ status: "invalid", code: result });
        }

    } catch (error) {
        console.error("Error validating email:", error.message);
        return res.status(500).json({ error: "Failed to validate email." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
