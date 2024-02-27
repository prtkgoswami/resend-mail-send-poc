import { Resend } from "resend";
import { EmailTemplate } from "../../components/email-template";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  const reqParams = await request.json();
  try {
    const data = await resend.emails.send({
      from: "John Doe <johndoe@xyz.com>",
      to: ["<Receiver Email>"],
      subject: "Hello World",
      react: EmailTemplate({
        name: reqParams.name,
        email: reqParams.email,
        message: reqParams.message,
      }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
