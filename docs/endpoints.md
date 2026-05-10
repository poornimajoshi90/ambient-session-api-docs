---
id: endpoints
title: Endpoint
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Endpoint

---

## Base URL

```
https://api.example.com
```

---

## Start a Session

| Method | URL |
|---|---|
| `POST` | `/v1/ambient/sessions/start` |

:::note
Both `/sessions/start` and `/session/start` work.
Always use `/sessions/start` for new projects.
:::

---

## Request Headers

```http
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

---

## Request Body

```json
{
  "patientId": "patient-7890",
  "visitId": "visit-20250509-001",
  "clinicianId": "dr-smith-42",
  "diagnoses": ["Z00.00", "J06.9"],
  "metadata": {
    "department": "Primary Care",
    "priority": "medium"
  }
}
```

---

## Parameter Reference

### Required Fields

| Parameter | Type | Description |
|---|---|---|
| `patientId` | string | Unique ID of the patient |
| `visitId` | string | Unique ID of the visit. One session per visit only. |

### Optional Fields

| Parameter | Type | Description |
|---|---|---|
| `clinicianId` | string | ID of the treating doctor |
| `diagnoses` | string[] | ICD-10 codes — helps AI generate better notes |
| `metadata` | object | Extra info like department and priority |

### Metadata Fields

| Parameter | Type | Values | Description |
|---|---|---|---|
| `department` | string | Any string | e.g. `"Cardiology"`, `"Primary Care"` |
| `priority` | string | `low` · `medium` · `high` | Processing priority |

---

## Response Examples

### ✅ Success — 200 OK

```json
{
  "sessionId": "abc123",
  "status": "started",
  "createdAt": "2025-05-09T10:30:00Z"
}
```

| Field | Description |
|---|---|
| `sessionId` | Save this — you need it to fetch notes later |
| `status` | Always `"started"` — notes are NOT ready yet |
| `createdAt` | Time when session was created |

:::warning
`status: "started"` does **not** mean notes are ready.
Wait for the webhook before fetching notes.
:::

---

## Error Reference

| Code | Meaning | Reason | Fix |
|---|---|---|---|
| `400` | Bad Request | Missing `patientId` or `visitId` | Check your request body |
| `401` | Unauthorized | Invalid or missing token | Check your token |
| `409` | Conflict | Session already exists for this `visitId` | Use existing `sessionId` |
| `500` | Server Error | Something went wrong | Retry after a few seconds |

### Error Response Example

```json
{
  "error": {
    "code": "SESSION_ALREADY_EXISTS",
    "message": "A session already exists for visitId: visit-20250509-001"
  }
}
```

:::danger
If you get a `409` error — do **not** create a new session.
Find the existing `sessionId` for that visit and use it.
:::

---

## Example Usage

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
curl -X POST https://api.example.com/v1/ambient/sessions/start \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "patient-7890",
    "visitId": "visit-20250509-001",
    "clinicianId": "dr-smith-42",
    "diagnoses": ["Z00.00", "J06.9"],
    "metadata": {
      "department": "Primary Care",
      "priority": "medium"
    }
  }'
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
const response = await fetch('https://api.example.com/v1/ambient/sessions/start', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    patientId: 'patient-7890',
    visitId: 'visit-20250509-001',
    clinicianId: 'dr-smith-42',
    diagnoses: ['Z00.00', 'J06.9'],
    metadata: {
      department: 'Primary Care',
      priority: 'medium'
    }
  })
});

const data = await response.json();
console.log('Session started:', data.sessionId);
// Now wait for webhook — do not fetch notes yet
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import requests

response = requests.post(
    'https://api.example.com/v1/ambient/sessions/start',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN_HERE',
        'Content-Type': 'application/json'
    },
    json={
        'patientId': 'patient-7890',
        'visitId': 'visit-20250509-001',
        'clinicianId': 'dr-smith-42',
        'diagnoses': ['Z00.00', 'J06.9'],
        'metadata': {
            'department': 'Primary Care',
            'priority': 'medium'
        }
    }
)

data = response.json()
print('Session started:', data['sessionId'])
# Now wait for webhook — do not fetch notes yet
```

  </TabItem>
</Tabs>

---




