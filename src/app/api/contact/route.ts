import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const Schema = z.object({ name: z.string().min(2), email: z.string().email(), message: z.string().min(10) });

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = Schema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });

    // Example SMTP via NodeMailer (commented placeholders)
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT || 587),
    //   secure: false,
    //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    // });
    // await transporter.sendMail({
    //   from: process.env.EMAIL_FROM,
    //   to: process.env.EMAIL_TO,
    //   subject: `New contact from ${parsed.data.name}`,
    //   replyTo: parsed.data.email,
    //   text: parsed.data.message
    // });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

