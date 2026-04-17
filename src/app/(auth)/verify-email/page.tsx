import VerifyOtpForm from '@/components/feture/auth/verify-otp-form';

export default function VerifyEmailPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
      <VerifyOtpForm />
    </div>
  );
}
