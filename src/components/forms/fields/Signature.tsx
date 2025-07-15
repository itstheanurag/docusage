import dynamic from 'next/dynamic';
import type SignatureCanvasType from 'react-signature-canvas'; // Import the type

// Explicitly type the dynamic import using `typeof SignatureCanvasType`
const SignatureCanvas = dynamic(() => import('react-signature-canvas'), {
  ssr: false,
}) as typeof SignatureCanvasType;

interface SignatureFieldProps {
  label: string;
}

export default function SignatureField({ label }: SignatureFieldProps) {
  return (
    <div>
      <label className="block mb-2">{label}</label>
      <SignatureCanvas
        penColor="black"
        canvasProps={{
          width: 400,
          height: 150,
          className: 'border rounded shadow-sm',
        }}
      />
    </div>
  );
}
