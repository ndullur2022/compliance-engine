# Data Security

Source: [Trust Center > Data Security](https://security.twilio.com/?itemName=data_security&source=click)

---

## Data Retention

Source: [Trust Center > Data Security > Data Retention](https://security.twilio.com/?itemName=data_security&source=click&itemUid=af8eb7bc-d4b7-4e13-a4b7-6f05e2744c22)

Twilio generally processes your end users' personal data for the purpose of providing the services you request under your Twilio account – like enabling your end users to send or receive SMS messages, make and receive voice calls, or make and receive video calls.

Twilio provides its customers with the ability to keep records of the end user communications made under their Twilio accounts. As a Twilio customer, if you choose to enable this then Twilio will retain records of your end users communications for as long you instruct, except where a specific product's API documentation indicates that a specific limited retention period applies for technical or other reasons (for example, the data is only retained for 30 days).

If you subsequently instruct us to delete or no longer retain such communications records, we will delete these records, except where such records continue to be needed for the purposes explained below (please note that it may take up to 30 days to completely purge these records from Twilio's services). Technical details regarding how to instruct Twilio with regard to such communications records retention and deletion may vary from product to product, and are documented in the product-specific API documentation.

In addition to the above, for number-based communications, Twilio retains communications metadata, (including originating and termination numbers and the date and time of the communication), for up to 120 days for billing, invoice reconciliation and troubleshooting purposes. We may also need to store this communications metadata for the purposes of detecting and preventing spam or fraudulent activity, and detecting and preventing network exploits and abuse. We will delete communications metadata once it is no longer needed for these fraud and abuse prevention efforts.

Further, when delivering SMS-related services, Twilio may need to process and store SMS message content for purposes of detecting, preventing, and investigating spam, fraudulent activity, network exploits/abuse, or, in certain jurisdictions, other types of communications prohibited by local law. We do this in order to protect and maintain our network and ensure deliverability of customer communications. We store SMS message content only where necessary for these purposes and, to the extent stored at all, we will delete this data when no longer needed for such purposes.

Source: [Privacy Policy](https://www.twilio.com/legal/privacy)

---

## Encryption at Rest

Source: [Trust Center > Data Security > Encryption-at-rest](https://security.twilio.com/?itemUid=ef061e5b-a2f4-469e-92bc-ab973e3d7842&source=title)

Data flagged as PII will be field level encrypted with AES-256 encryption. Call recordings uses S3 SSE which is AES 256-Bit Encryption.

---

## Encryption in Transit

Source: [Trust Center > Data Security > Encryption-in-transit](https://security.twilio.com/?itemUid=4ea65d1e-79fb-47cf-95a8-bdb24d2d6a4b&source=title)

For the Twilio Services, Customer Data is encrypted when in transit between Customer's software application and the Services using TLS v1.2. For the SendGrid Services, Twilio provides opportunistic TLS v1.1 or higher for emails in transit between Customer's software application and the recipient's email server. The SendGrid Services are designed to opportunistically try outbound TLS v1.1 or higher when attempting to deliver an email to a recipient. This means that if a recipient's email server accepts an inbound TLS v1.1 or higher connection, Twilio will deliver an email over a TLS encrypted connection. If a recipient's email server does not support TLS, Twilio will deliver an email over the default unencrypted connection. The SendGrid Services provide an optional feature, which Customer has to enable, that allows Customer to enforce TLS encryption. If Customer enables the enforced TLS feature, Twilio will only deliver an email to a recipient if the recipient's email server accepts an inbound TLS v1.1 or higher connection. For the Segment Services, Customer Data is encrypted at rest using the Advanced Encryption Standard.

---

## Physical Security

Source: [Trust Center > Data Security > Physical Security](https://security.twilio.com/?itemUid=3715f476-6732-4dff-a174-d09ba7025191&source=title)

Twilio's infrastructure is housed in Amazon Web Services (AWS) data centres, which are secured by a professional security staff as well as a variety of physical controls at the perimeter and building ingress points. Additional details on the physical security services provided by Amazon are available at https://aws.amazon.com/compliance/data-center/data-centers/

NOTE: AWS does not permit visitors within their data centers.

Twilio HQ and offices have a security program that manages visitors, building entrances, CCTVs, and overall office security. Employees, contractors, and visitors are required to wear identification badges however the formal policies for this program are still being developed to support our global offices and employees.
