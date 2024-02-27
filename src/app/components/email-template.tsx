import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div>
    <h2>Message from Personal Portfolio!</h2>
    <p>
      <b>Message From:</b> {name} ({email})<br />
      <b>Message Content:</b>
      <br />
      {message}
    </p>
  </div>
);
