import { Resend } from "resend";
import { EmailTemplate } from "../../components/email-template";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  const reqParams = await request.json();
  const { name, email, toEmails, message } = reqParams;
  try {
    const data = await resend.emails.send({
      from: name + "<" + email + ">",
      to: toEmails,
      subject: "Hello World",
      react: EmailTemplate({
        name: name,
        email: email,
        message: message,
      }),
      text: "",
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
