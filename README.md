## Environment Variables (.env file)

```dotenv
# .env File

# MongoDB Connection String
MONGODB_URI = "mongodb+srv://username:password@cluster.address/db_name?retryWrites=true&w=majority"

# Application Port
PORT = 5001

# JSON Web Token (JWT) secret key
JWT_SECRET = "secret_key"

# API key (optional)
API_KEY = "api_key"

# Allowed Origins (CORS)
ORIGIN_1 = "http://localhost:3000"
ORIGIN_2 = "http://example2.com"
ORIGIN_3 = "http://example1.com"
# Note: You can add multiple origins in this format:
# ORIGIN_4 = "http://neworigin.com"
```

