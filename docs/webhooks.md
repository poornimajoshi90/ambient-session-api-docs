---
id: webhooks
title: Webhooks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Webhooks

---

## What is a Webhook?

A webhook is a notification your system receives when something is done.

:::tip 
Simple Example
Think of it like a **food delivery notification** —
you place an order and go about your day.
When food arrives, you get a notification.
You do not keep checking every minute.
:::

In this API — you start a session and when the notes are ready, the API **automatically notifies your system.**

---

## Why Use Webhooks?

| | Webhook ✅ | Polling ⚠️ |
|---|---|---|
| How it works | API notifies you when done | You keep checking every few seconds |
| Speed | Instant | Delayed |
| Server load | Low | High |
| Recommended | ✅ Yes | ⚠️ Only as fallback |

:::warning
Polling is supported but **not recommended.**
Use webhooks wherever possible.
:::

---

## How It Works

```
1. You register your webhook URL with Suki
2. You start a session
3. API processes the notes (2–5 minutes)
4. API sends a POST request to your webhook URL
5. Your system receives the notification
6. You fetch the notes using sessionId
```

---

## Webhook Payload

When notes are ready, the API sends this to your URL:

```json
{
  "sessionId": "abc123",
  "status": "completed",
  "summaryAvailable": true
}
```

| Field | Description |
|---|---|
| `sessionId` | The session that just completed |
| `status` | `"completed"` — notes are ready to fetch |
| `summaryAvailable` | `true` means notes are available |

---

## Setting Up Your Webhook

### Step 1 — Create an endpoint in your system

Your endpoint must:
- Accept `POST` requests
- Return `200 OK` within **5 seconds**
- Be reachable over **HTTPS**

### Step 2 — Register your URL with Suki

Contact Suki Support and share your webhook URL:

```
https://your-system.com/webhooks/session-complete
```

### Step 3 — Handle the incoming payload

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```javascript
app.post('/webhooks/session-complete', (req, res) => {
  const { sessionId, status, summaryAvailable } = req.body;

  // Always respond fast
  res.status(200).send('OK');

  // Then do your work
  if (status === 'completed' && summaryAvailable) {
    console.log('Notes ready for session:', sessionId);
    // Fetch notes using sessionId
  }
});
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from flask import Flask, request

app = Flask(__name__)

@app.route('/webhooks/session-complete', methods=['POST'])
def handle_webhook():
    data = request.json
    session_id = data.get('sessionId')
    status = data.get('status')
    summary_available = data.get('summaryAvailable')

    # Always respond fast
    if status == 'completed' and summary_available:
        print(f'Notes ready for session: {session_id}')
        # Fetch notes using session_id

    return 'OK', 200
```

  </TabItem>
</Tabs>

---

## Polling Fallback

:::warning
Only use polling if you cannot set up a webhook.
:::

If webhooks are not possible, you can check the session status manually.

**Suggested strategy:**

| Step | Action |
|---|---|
| 1 | Wait at least **2 minutes** after session starts |
| 2 | Check status every **30–60 seconds** |
| 3 | Stop when status is `completed` |
| 4 | Stop after **10 minutes** even if not completed |

:::danger
Do **not** poll immediately after starting a session.
Notes take 2–5 minutes — polling too early wastes requests.
:::

---

## Common Mistakes

| Mistake | Problem | Fix |
|---|---|---|
| Not responding within 5 seconds | Webhook marked as failed | Respond with `200 OK` first, then process |
| Polling immediately after start | Wastes requests, no notes yet | Wait at least 2 minutes |
| Not saving `sessionId` | Cannot fetch notes when webhook fires | Save `sessionId` as soon as session starts |
| Using HTTP instead of HTTPS | Webhook will not be delivered | Always use HTTPS for your endpoint |

---



