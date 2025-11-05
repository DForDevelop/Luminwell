import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Text,
  Preview,
  Section,
  Img,
} from "@react-email/components";

interface resetPasswordProps {
  username?: string;
  resetUrl: string;
}

export const sendResetEmail = ({ username, resetUrl }: resetPasswordProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your Luminwell account password</Preview>

      <Body>
        <Container>
          <Img
            src="/public/assets/logo.jpg"
            width="48"
            height="48"
            alt="Luminwell Logo"
            className="mx-auto mb-4"
          />

          <Section>
            <Text>Hi {username || "there"},</Text>

            <Text>
              Someone recently requested a password change for your Luminwell
              account. If this was you, click the button below to reset your
              password.
            </Text>

            <Button href={resetUrl}>Reset Password</Button>

            <Text>
              If you didn’t request this change, you can safely ignore this
              email.
            </Text>

            <Text>
              For account safety, please do not forward this email to anyone.
            </Text>

            <Text>– The Luminwell Team</Text>

            <Text>Need help? Visit our Help Center</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
