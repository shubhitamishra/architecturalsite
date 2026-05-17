// app/api/contact/route.js
// Install nodemailer: npm install nodemailer
//
// Add these to your .env.local:
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=587
//   SMTP_USER=zoneofcoc1@gmail.com
//   SMTP_PASS=your-app-password        ← Gmail App Password (not your login password)
//   SMTP_TO=zoneofcoc1@gmail.com     ← where enquiries land
//   SMTP_FROM=zoneofcoc1@gmail.com   ← must match SMTP_USER for Gmail

import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const { name, email, phone, projectType, message } = await request.json()

        // ── Basic server-side validation ──────────────────────────────────
        if (!name?.trim() || !email?.trim() || !message?.trim() || !projectType?.trim()) {
            return NextResponse.json(
                { error: "Required fields missing." },
                { status: 400 }
            )
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
        }

        // ── Nodemailer transporter ─────────────────────────────────────────
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        // ── HTML email body ────────────────────────────────────────────────
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry — Architecture Site</title>
</head>
<body style="margin:0;padding:0;background:#f7f4ef;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ef;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header band -->
          <tr>
            <td style="background:#1c1510;border-radius:16px 16px 0 0;padding:36px 44px;">
              <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#7a6a58;font-weight:600;">
                Architecture Site
              </p>
              <h1 style="margin:0;font-size:28px;font-weight:300;color:#e8ddd0;letter-spacing:-0.01em;line-height:1.2;">
                New Project <em style="color:#c8a96e;font-style:italic;">Enquiry</em>
              </h1>
              <div style="margin-top:18px;height:1px;background:linear-gradient(to right, rgba(200,169,110,0.5), transparent);"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 44px;">

              <!-- Detail rows -->
              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                    { label: "Name", value: name },
                    { label: "Email", value: email },
                    { label: "Phone", value: phone || "—" },
                    { label: "Project Type", value: projectType },
                ].map(row => `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0ece5;vertical-align:top;width:130px;">
                    <span style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:#b09070;font-weight:700;">${row.label}</span>
                  </td>
                  <td style="padding:10px 0 10px 20px;border-bottom:1px solid #f0ece5;vertical-align:top;">
                    <span style="font-family:Georgia,serif;font-size:15px;color:#2c2318;">${row.value}</span>
                  </td>
                </tr>`).join("")}
              </table>

              <!-- Message block -->
              <div style="margin-top:28px;">
                <p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:#b09070;font-weight:700;">
                  Message
                </p>
                <div style="background:#faf9f6;border-left:3px solid #c8a96e;border-radius:0 8px 8px 0;padding:18px 22px;">
                  <p style="margin:0;font-family:Georgia,serif;font-size:15px;color:#2c2318;line-height:1.8;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                </div>
              </div>

              <!-- Reply CTA -->
              <div style="margin-top:32px;text-align:center;">
                <a href="mailto:${email}" style="display:inline-block;background:#2c2318;color:#c8a96e;text-decoration:none;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;font-weight:700;padding:14px 32px;border-radius:8px;">
                  Reply to ${name} ↗
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f7f4ef;border-radius:0 0 16px 16px;padding:20px 44px;border-top:1px solid rgba(200,169,110,0.18);">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;color:#b09070;letter-spacing:0.05em;">
                Architecture Site · SF-204, The Peach Tree Complex, Sushant Lok Phase-1, Sector-43, Gurgaon — 122002
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

        // ── Send mail ──────────────────────────────────────────────────────
        await transporter.sendMail({
            from: `"Architecture Site" <${process.env.SMTP_FROM}>`,
            to: process.env.SMTP_TO,
            replyTo: email,
            subject: `New Enquiry from ${name} — ${projectType}`,
            html,
            // Plain-text fallback
            text: [
                `New enquiry via Architecture Site`,
                ``,
                `Name:         ${name}`,
                `Email:        ${email}`,
                `Phone:        ${phone || "—"}`,
                `Project Type: ${projectType}`,
                ``,
                `Message:`,
                message,
            ].join("\n"),
        })

        // ── Auto-reply to the enquirer ─────────────────────────────────────
        await transporter.sendMail({
            from: `"Architecture Site" <${process.env.SMTP_FROM}>`,
            to: email,
            subject: `We received your enquiry — Architecture Site`,
            html: `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f7f4ef;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ef;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#1c1510;border-radius:16px 16px 0 0;padding:36px 44px;">
            <h1 style="margin:0;font-size:24px;font-weight:300;color:#e8ddd0;">
              Thank you, <em style="color:#c8a96e;font-style:italic;">${name}.</em>
            </h1>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:36px 44px;">
            <p style="font-family:Georgia,serif;font-size:15px;color:#2c2318;line-height:1.8;margin:0 0 20px;">
              We've received your enquiry about <strong>${projectType}</strong> and will get back to you within 24 hours.
            </p>
            <p style="font-family:Georgia,serif;font-size:15px;color:#2c2318;line-height:1.8;margin:0 0 20px;">
              In the meantime, feel free to reach out via email at
              <a href="mailto:shubhitamishra@gmail.com" style="color:#c8a96e;">shubhitamishra@gmail.com</a>.
            </p>
            <p style="font-family:Arial,sans-serif;font-size:13px;color:#a08060;margin:0;">
              Warm regards,<br/>
              <strong style="color:#2c2318;">Architecture Site Team</strong>
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f7f4ef;border-radius:0 0 16px 16px;padding:20px 44px;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;color:#b09070;">
              Architecture Site · Architecture · Interiors · Turnkey · Landscape
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
            text: `Hi ${name},\n\nThank you for reaching out. We've received your enquiry about ${projectType} and will get back to you within 24 hours.\n\nWarm regards,\nArchitecture Site Team`,
        })

        return NextResponse.json({ success: true }, { status: 200 })

    } catch (error) {
        console.error("[contact/route] SMTP error:", error)
        return NextResponse.json(
            { error: "Failed to send message. Please try again." },
            { status: 500 }
        )
    }
}
