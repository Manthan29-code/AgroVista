import AuthLayout from '../components/layout/AuthLayout.jsx';
import LoginForm from '../components/forms/LoginForm.jsx';

export default function Login(){
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  );
}
