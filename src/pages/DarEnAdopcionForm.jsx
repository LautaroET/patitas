import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DarEnAdopcionFormComponent from '../components/DarEnAdopcionFormComponent';

const DarEnAdopcionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dar en adopción</h1>
      <DarEnAdopcionFormComponent
        refugioId={id}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default DarEnAdopcionForm;