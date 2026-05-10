# Authentication

Every request to the Ambient Session API must include a valid token.
No token = request rejected.

---

## How It Works

You get a token from Suki. You send it with every API request. That's it.

:::tip
Think of the token like a **key to a door** — without it, you cannot get in.
:::

---

## Required Headers

Add these two headers to every request:

```http
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

| Header | Required | Value |
|---|---|---|
| `Authorization` | ✅ Yes | `Bearer YOUR_TOKEN_HERE` |
| `Content-Type` | ✅ Yes | `application/json` |
| `X-Partner-Token` | ⚠️ Some users | Contact Suki support to check |

---

## What is a Bearer Token?

A Bearer token is a long string of characters that proves who you are.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

:::warning
 Keep your token safe
- ❌ Never share your token with anyone
- ❌ Never put it directly in your frontend code
- ✅ Always store it in environment variables
:::

---

## What is X-Partner-Token?

Some partner integrations need an extra token called `X-Partner-Token`.

```http
Authorization: Bearer YOUR_TOKEN_HERE
X-Partner-Token: YOUR_PARTNER_TOKEN
Content-Type: application/json
```

:::note
Not sure if you need it? Contact **Suki Support** to confirm.
:::

---

## Example Request

### cURL

```bash
curl -X POST https://api.example.com/v1/ambient/sessions/start \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### JavaScript

```javascript
const response = await fetch('https://api.example.com/v1/ambient/sessions/start', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE',
    'Content-Type': 'application/json'
  }
});
```

### Python

```python
import requests

headers = {
    'Authorization': 'Bearer YOUR_TOKEN_HERE',
    'Content-Type': 'application/json'
}

response = requests.post(
    'https://api.example.com/v1/ambient/sessions/start',
    headers=headers
)
```

---

## Common Errors

| Error | Reason | Fix |
|---|---|---|
| `401 Unauthorized` | Token missing or wrong | Check your token is correct |
| `401 Unauthorized` | Token expired | Get a new token from Suki |
| `403 Forbidden` | Token valid but no permission | Contact Suki support |

:::danger
If you get a `401` error, **do not retry immediately**.
First check your token is correct, then try again.
:::

---




