---
id: ai-usage
title: AI Usage & Reasoning
---

# AI Usage & Reasoning

---

## Tool Used

**Claude AI by Anthropic** 

---

## Why I Used AI

The goal was to convert raw, unstructured product notes into clean developer documentation. I used Claude AI to help with drafting and structuring — but every output was reviewed, tested, and modified before being accepted.

> I treated Claude's output as a **first draft**, not a final answer.

---

## Prompts I Used

| # | Prompt |
|---|---|
| 1 | Write a developer guide for Ambient Session API based on these product notes |
| 2 | Make it simpler and clearer for non-technical users |
| 3 | Add Docusaurus admonitions like warning, tip, danger boxes |
| 4 | Create tabs for code examples in JavaScript, Python and cURL |
| 5 | Improve the workflow diagram to be more visual and easy to understand |
| 6 | Make the homepage professional with feature cards |
| 7 | Workflow diagram is not rendering — fix it for Docusaurus |
| 8 | The important section needs a colored highlight box |
| 9 | Create a separate response examples page |
| 10 | Create a best practices page with code examples |

---

## What I Accepted & Why

| Output | Why Accepted |
|---|---|
| Overall structure and flow | Matched all 9 requirements of the assignment |
| Code examples in cURL, JS, Python | Technically correct and properly tested |
| Admonition boxes (warning, tip, danger) | Correct Docusaurus syntax, improved readability |
| Feature cards on homepage | Clean and professional for a documentation site |
| Error reference table | Covered all 4 error codes from the product notes |

---

## What I Rejected or Changed & Why

| AI Output | Problem | What I Did Instead |
|---|---|---|

| GitHub alert syntax `[!IMPORTANT]` | Does not render correctly in Docusaurus | Used `:::warning` and `:::tip` instead |
| Complex sequence diagram | Too confusing for non-technical users | Switched to simpler flowchart with emojis |
| Left to right flowchart direction | Too small and unreadable on mobile screens | Changed to top-down direction for better mobile view |
| Three separate code blocks | Hard to read and takes too much space | Replaced with Docusaurus Tabs component |
| Too much technical jargon in overview | Non-technical users could not understand | Rewrote in plain simple English |


---

## My Review Process

Every page was checked for:

- **Accuracy** — matches the original product notes
- **Clarity** — simple enough for non-technical users
- **Correct syntax** — works in Docusaurus without errors
- **Completeness** — all 9 assignment requirements covered
- **Professionalism** — no personal emails, no company names

---

## Final Note

AI helped me work faster — but every decision, every rejection, and every edit was made by me based on the assignment requirements and my own judgment.

---

*Documentation created as part of a technical writing assignment.*