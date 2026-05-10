---
id: response-examples
title: Response Examples
---

# Response Examples

---

## Success Response — 200 OK

Session successfully created.

```json
{
  "sessionId": "abc123",
  "status": "started",
  "createdAt": "2025-05-09T10:30:00Z"
}
```

| Field       | Type   | Description                                  |
| ----------- | ------ | -------------------------------------------- |
| `sessionId` | string | Save this — needed to fetch notes later      |
| `status`    | string | Always `"started"` — notes are NOT ready yet |
| `createdAt` | string | Timestamp of session creation                |

:::warning
`status: "started"` does **not** mean notes are ready.
Always wait for the webhook before fetching notes.
:::

---

## Error Responses

### 400 — Bad Request

Missing or invalid fields in request body.

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "patientId is required"
  }
}
```

**Common causes:**

- `patientId` missing
- `visitId` missing
- JSON format is wrong

---

### 401 — Unauthorized

Token is missing or invalid.

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing Bearer token"
  }
}
```

**Common causes:**

- Token not added in headers
- Token expired
- Token is incorrect

---

### 409 — Conflict

A session already exists for this `visitId`.

```json
{
  "error": {
    "code": "SESSION_ALREADY_EXISTS",
    "message": "A session already exists for visitId: visit-20250509-001"
  }
}
```

:::danger
Do **not** create a new session on `409`.
Find the existing `sessionId` and use it.
:::

---

### 500 — Server Error

Something went wrong on the server.

```json
{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Something went wrong. Please try again."
  }
}
```

**What to do:**

- Wait a few seconds
- Retry with exponential backoff
- Contact Suki Support if it keeps happening

---

## Quick Reference

| Code  | Meaning         | Action                             |
| ----- | --------------- | ---------------------------------- |
| `200` | ✅ Success      | Save `sessionId`, wait for webhook |
| `400` | ❌ Bad Request  | Check request body and fields      |
| `401` | ❌ Unauthorized | Check your token                   |
| `409` | ❌ Conflict     | Use existing `sessionId`           |
| `500` | ❌ Server Error | Retry with backoff                 |

---
