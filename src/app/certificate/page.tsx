import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const CertificateForm = dynamic(() => import('./CertificateForm'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function CertificatePage() {
  return <CertificateForm />;
} 