'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { FormErrorMessage } from '@/components/ui/form-error-message';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { createClient } from '@/utils/supabase/client';
import { Label } from '@radix-ui/react-label';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type SigninFormValues = {
  email: string;
  password: string;
}

export function SigninComponent() {
  const supabaseClient = createClient();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SigninFormValues>();
  const [ signinError, setSigninError ] = useState<string>();
  const router = useRouter();

  async function save(values: SigninFormValues) {
    setSigninError(undefined);

    const authenticationResponse = await supabaseClient.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (authenticationResponse.error) {
      setSigninError('Login inválido. Tente novamente');
      return;
    }

    router.push('/pedidos');
  }

  return (
    <form onSubmit={handleSubmit(save)}>
      <CardContent>
        <div className='flex flex-col gap-2 mb-3'>
          <Label htmlFor='email'>E-mail</Label>
          <Input
            id='email'
            placeholder='vendas@duxpatrono.com.br'
            type='email'
            {...register('email', {
              required: { value: true, message: 'Insira seu e-mail' },
            })}
          />
          { errors.email && <FormErrorMessage>{ errors.email.message }</FormErrorMessage> }
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='password'>Senha</Label>
          <Input
            id='password'
            placeholder='******'
            type='password'
            {...register('password', {
              required: { value: true, message: 'Insira sua senha' },
            })}
          />
          { errors.password && <FormErrorMessage>{ errors.password.message }</FormErrorMessage> }
        </div>
      </CardContent>
      <CardFooter className='flex flex-col'>
        { signinError && (
          <Alert variant='destructive' className='mb-5'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              { signinError }
            </AlertDescription>
          </Alert>
        )}
        <Button className='w-full' type='submit'>
          { isSubmitting ?
            <Spinner /> :
            'Acessar'
          }
        </Button>
      </CardFooter>
    </form>
  );
}