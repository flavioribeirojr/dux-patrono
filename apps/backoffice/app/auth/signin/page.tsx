import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SigninComponent } from './Signin.component';

export default async function SigninPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center'>
          Login
        </CardTitle>
        <CardDescription className='text-center'>
          Use suas credenciais para acessar o administrador da loja
        </CardDescription>
      </CardHeader>
      <SigninComponent />
    </Card>
  );
}