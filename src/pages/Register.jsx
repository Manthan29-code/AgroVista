import AuthLayout from '../components/layout/AuthLayout.jsx';
import RegisterForm from '../components/forms/RegisterForm.jsx';

export default function Register(){
  return (
    <AuthLayout title="Create account">
      <RegisterForm />
    </AuthLayout>
  );
}
