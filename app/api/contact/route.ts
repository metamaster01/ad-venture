import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, inquiry } = body;

    // Basic server-side validation
    if (!name || !email || !inquiry) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Send email to admin
    const { error } = await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>", // Replace with your verified domain e.g. "no-reply@noir-studio.com"
      to: [process.env.ADMIN_EMAIL!],                  // Your admin email set in .env
      replyTo: email,                                   // So you can reply directly to the client
      subject: `New Project Inquiry from ${name}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0f0f0f; color: #e0e0e0; border: 1px solid #222; border-radius: 4px; overflow: hidden;">
          
          <!-- Header -->
          <div style="background: #f0c000; padding: 24px 32px;">
            <p style="margin: 0; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #000;">
              New Project Inquiry
            </p>
          </div>

          <!-- Body -->
          <div style="padding: 36px 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; width: 100px;">
                  <span style="font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: #666; font-weight: 600;">Name</span>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e;">
                  <span style="font-size: 14px; color: #fff; font-weight: 500;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e;">
                  <span style="font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: #666; font-weight: 600;">Email</span>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e;">
                  <a href="mailto:${email}" style="font-size: 14px; color: #c8a84b; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 16px 0 0; vertical-align: top;">
                  <span style="font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: #666; font-weight: 600;">Inquiry</span>
                </td>
                <td style="padding: 16px 0 0;">
                  <p style="font-size: 14px; color: #bbb; line-height: 1.8; margin: 0; white-space: pre-wrap;">${inquiry}</p>
                </td>
              </tr>
            </table>
          </div>

          <!-- Footer -->
          <div style="padding: 20px 32px; border-top: 1px solid #1e1e1e;">
            <p style="margin: 0; font-size: 10px; color: #444; letter-spacing: 0.1em; text-transform: uppercase;">
              Sent from your website contact form
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}