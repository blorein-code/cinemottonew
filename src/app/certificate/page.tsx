'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const CertificateForm = dynamic(() => import('./CertificateForm'), {
  loading: () => <div>Loading...</div>
});

export default function CertificatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CertificateForm />
    </Suspense>
  );
} 