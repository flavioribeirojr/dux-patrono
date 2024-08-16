'use client';

import { useEffect, use } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export function AppInitialRouteRedirect() {
  const supabaseClient = createClient();
  const session = use(supabaseClient.auth.getSession());
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/pedidos');
    } else {
      router.push('/auth/signin');
    }
  }, [session, router]);

  return null;
}