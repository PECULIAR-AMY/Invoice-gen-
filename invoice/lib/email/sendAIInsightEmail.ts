import { Resend } from "resend"


const resend = new Resend(process.env.RESEND_API_KEY)


export async function sendAIInsightEmail(email: string, insight: string) {
await resend.emails.send({
from: "Insights <insights@yourapp.com>",
to: email,
subject: "Your daily business insight",
html: `
<h2>Your AI Business Insight</h2>
<p>${insight.replace(/
/g, "<br />")}</p>
`,
})
}