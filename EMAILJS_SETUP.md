# EmailJS Setup Guide

The contact form has been integrated with EmailJS. Follow these steps to complete the setup:

## Step 1: Create EmailJS Account

1. Sign up for a free account at [https://www.emailjs.com/](https://www.emailjs.com/)
2. Verify your email address

## Step 2: Create an Email Service

1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your chosen provider
5. Copy the **Service ID** (e.g., `service_xxxxxxxxx`)

## Step 3: Create an Email Template

1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Use the following template variables in your email template:

```
Subject: New Contact Form Submission from {{from_name}}

Hello,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Service Interested In: {{service}}
Message: {{message}}

---
This email was sent from your contact form.
```

4. Copy the **Template ID** (e.g., `template_xxxxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in your EmailJS dashboard
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxxxxxxx`)
3. Copy it

## Step 5: Configure Environment Variables

Create a `.env.local` file in the root of your project with the following content:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace the placeholder values with your actual EmailJS credentials.

## Step 6: Restart Your Development Server

After creating the `.env.local` file, restart your Next.js development server:

```bash
npm run dev
```

## Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check the email address you configured in EmailJS
4. You should receive the contact form submission

## Template Variables Used

The form sends the following variables to your EmailJS template:
- `from_name` - User's full name
- `from_email` - User's email address
- `phone` - User's phone number (or "Not provided")
- `service` - Selected service (or "Not specified")
- `message` - User's message
- `to_email` - Your receiving email (currently set to info@indianwebify.com)

You can modify the `to_email` value in `src/pages/contact.js` if needed.

## Troubleshooting

- If emails aren't sending, check the browser console for errors
- Verify all environment variables are set correctly
- Ensure your EmailJS service is properly connected
- Check that your email template uses the correct variable names
- Make sure you've verified your email address in EmailJS

