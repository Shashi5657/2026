# 🚀 Backend Infrastructure Setup (AWS + OAuth + JWT)

## 📌 Overview

This project integrates multiple external services for authentication, storage, and security:

- AWS Cognito (Authentication)
- AWS S3 (File Storage)
- Google OAuth
- Facebook OAuth
- JWT-based Authentication

---

## 🧠 Architecture

```
Client → OAuth / Cognito → Backend → JWT → Database
                                 → AWS S3 (File Storage)
```

---

## 🔐 Environment Variables

Create a `.env.development` file:

```env
PORT=5000

# AWS
AWS_REGION=ap-south-1
AWS_ACCESS_KEY=<your-access-key>
AWS_SECRET_KEY=<your-secret-key>

# AWS Cognito
USER_POOL_ID=<user-pool-id>
USER_POOL_CLIENT_ID=<client-id>

# AWS S3
PUBLIC_BUCKET=develiteconsultancy
PRIVATE_BUCKET=develiteprivate
PROFILE_URL=https://develiteconsultancy.s3.ap-south-1.amazonaws.com
DOCUMENT_URL=https://develiteprivate.s3.ap-south-1.amazonaws.com/
VIDEO_URL=https://develiteconsultancy.s3.ap-south-1.amazonaws.com

# Google OAuth
GOOGLE_OAUTH_CLIENT_ID=<client-id>
GOOGLE_OAUTH_CLIENT_SECRET=<client-secret>

# Google API
GOOGLE_KEY=<google-api-key>

# Facebook OAuth
FB_OAUTH_CLIENT_ID=<client-id>
FB_OAUTH_CLIENT_SECRET=<client-secret>

# JWT
SHORT_LIVED_SECRET=<secret>
ACCESS_SECRET=<secret>
REFRESH_SECRET=<secret>

# Application Domain
APPLICATION_DOMAIN=<your-domain>
```

---

## ☁️ AWS Setup

### 1. IAM User

- Create IAM user
- Assign permissions:
  - AmazonS3FullAccess
  - AmazonCognitoPowerUser

- Generate access keys

---

### 2. Cognito Setup

1. Create User Pool
2. Configure:
   - Email login
   - Password policy

3. Create App Client
4. Copy:
   - User Pool ID
   - Client ID

---

### 3. S3 Setup

Create two buckets:

| Bucket  | Purpose        |
| ------- | -------------- |
| Public  | Images, videos |
| Private | Documents      |

---

## 🌐 OAuth Setup

### Google OAuth

1. Google Cloud Console
2. Create OAuth Client
3. Add redirect URI

---

### Facebook OAuth

1. Facebook Developers
2. Create App
3. Enable Login
4. Configure redirect URI

---

## 🔐 JWT Authentication

Used for:

- Secure API access
- Token-based authentication

### Tokens:

| Token       | Purpose       |
| ----------- | ------------- |
| Access      | API calls     |
| Refresh     | Renew session |
| Short-lived | OTP / temp    |

---

## 📦 S3 Usage

- Upload files using pre-signed URLs
- Store:
  - Profile images
  - Videos
  - Documents

---

## ⚠️ Security Best Practices

- Never expose secrets
- Use IAM roles in production
- Use HTTPS only
- Rotate keys periodically

---

## 🚀 Future Improvements

- Use IAM Roles instead of static keys
- Add file upload via pre-signed URLs
- Add rate limiting
- Add logging & monitoring

---

## 👨‍💻 Author

Shashidhar Sangepu
