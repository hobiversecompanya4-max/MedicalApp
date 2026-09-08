const sendEmail = async ({
  to,
  subject,
  message,
}) => {
  console.log("Email notification:");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("Message:", message);

  return {
    success: true,
    message: "Email queued successfully",
  };
};

export default sendEmail;