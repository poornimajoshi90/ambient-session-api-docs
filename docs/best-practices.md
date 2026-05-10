---
id: best-practices
title: Best Practices
---

# Best Practices

---

:::tip
Following these practices will save you hours of debugging.
:::

---

## 1. Never Assume Notes Are Ready on Start

This is the most common mistake.

:::danger
Don't do this

```javascript
const session = await startSession();
const notes = await fetchNotes(session.sessionId); // Too early
```

:::

:::tip
Do this instead

```javascript
//  wait for webhook
const session = await startSession();
// Save sessionId and wait for webhook notification
saveSessionId(session.sessionId);
```

:::

---

## 2. Always Use Webhooks Over Polling

| Situation                        | Use                    |
| -------------------------------- | ---------------------- |
| You can set up an HTTPS endpoint | ✅ Webhook             |
| You cannot set up a webhook      | ⚠️ Polling as fallback |
| You want instant notification    | ✅ Webhook             |
| You are testing locally          | ⚠️ Polling as fallback |

:::tip
Local Testing
For local development, use tools like **ngrok** to expose your local server and test webhooks easily.
:::

---

## 3. Save sessionId Immediately

As soon as you get a response from the start call — save the `sessionId`.

```javascript
// Save it right away
const data = await response.json();
await db.save({ sessionId: data.sessionId, visitId: visitId });

// When webhook fires - already have it ready
```

:::warning
If you lose the `sessionId` you cannot fetch the notes.
There is no way to recover it without contacting support.
:::

---

## 4. Handle 409 Conflict Correctly

A `409` means a session already exists for that `visitId`.

:::danger 
Don't do this

```javascript
// do not create a new session
if (error.code === 409) {
  await startNewSession(visitId); // This will fail again
}
```

:::

:::tip
Do this instead

```javascript
// CORRECT — find the existing session
if (error.code === 409) {
  const existingSession = await db.findByVisitId(visitId);
  // Use existingSession.sessionId to fetch notes
}
```

:::

---

## 5. Retry on 500 Errors

Server errors are temporary. Do not give up on the first failure.

**Use exponential backoff:**

| Attempt   | Wait Before Retry |
| --------- | ----------------- |
| 1st retry | 5 seconds         |
| 2nd retry | 15 seconds        |
| 3rd retry | 45 seconds        |
| After 3rd | Stop and alert    |

```javascript
// Simple retry with backoff
const delays = [5000, 15000, 45000];

for (let i = 0; i < delays.length; i++) {
  const response = await startSession();
  if (response.ok) break;
  await sleep(delays[i]);
}
```

---

## 6. Keep Your Token Safe

:::danger
Never do this

- ❌ Never hardcode token in your code
- ❌ Never push token to GitHub
- ❌ Never share token in Slack or email
  :::

:::tip
Always do this

- ✅ Store token in environment variables
- ✅ Use `.env` file locally
- ✅ Use secret manager in production
  :::

```javascript
const token = process.env.SUKI_API_TOKEN;

const token = "eyJhbGciOiJIUzI1NiIsInR5...";
```

---

## 7. Respond to Webhooks Fast

Your webhook endpoint must respond within **5 seconds.**

:::danger
If you take too long
The API will mark the webhook as failed and may retry — causing duplicate processing.
:::

```javascript
app.post("/webhooks/session-complete", async (req, res) => {
  res.status(200).send("OK");

  await processNotes(req.body.sessionId);
});
```

---

## 8. Timing Summary

| Stage                    | Time        | What To Do                        |
| ------------------------ | ----------- | --------------------------------- |
| After session starts     | 0 minutes   | Save `sessionId`, do nothing else |
| While processing         | 2–5 minutes | Wait for webhook                  |
| Webhook fires            | Instant     | Fetch notes using `sessionId`     |
| No webhook after 10 mins | —           | Check with support                |

---

## Quick Checklist

Before going live — make sure you have done all of this:

- ✅ Token stored in environment variable
- ✅ `sessionId` saved to database on session start
- ✅ Webhook endpoint set up and registered with Suki
- ✅ Webhook responds with `200 OK` within 5 seconds
- ✅ `409` error handled — no duplicate sessions
- ✅ Retry logic added for `500` errors
- ✅ Not fetching notes immediately after session start

---
