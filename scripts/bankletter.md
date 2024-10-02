title Bank Confirmation Letter Automated Flow

Client->Back Office Portal: Sends email requesting bank confirmation letter
Back Office Portal->Customer Portal Case Manager: Create ticket reference for request
Customer Portal Case Manager-->>Client: Notify ticket reference number
Back Office Portal->Bot: Trigger bot to fetch account details from Core Banking System
Bot->Core Banking System: Fetch client account information
Core Banking System-->>Bot: Return account details
Bot->Back Office Portal: Upload generated PDF confirmation letter to portal folder
Back Office Portal->Client: Send confirmation letter (PDF) via email
Back Office Portal->Customer Portal Case Manager: Update ticket reference status

note over Client,Back Office Portal: Email includes: - Bank letterhead and logo - Date of issue - Client's full name - Account number - Account currency - NIB, IBAN, NUIB - SWIFT code - Branch name, code, and address - Official bank signature

Client<--Back Office Portal: Receive confirmation letter (PDF)
Customer Portal Case Manager-->>Client: Notify ticket reference status update (e.g., completed)

Note over Client,System: Process is complete
Request is tracked via the Customer Portal
with timely status updates for transparency.
