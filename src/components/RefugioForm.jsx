import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loader from './Loader';
import Button from './Button';

const RefugioForm = ({ onSubmit, initialData, isEdit = false, showTitle = true }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const [imagePreview, setImagePreview] = useState('');

    // Observar cambios en el campo de imagen para mostrar preview
    const imageUrl = watch('image');
    
    useEffect(() => {
        if (imageUrl) {
            setImagePreview(imageUrl);
        }
    }, [imageUrl]);

    useEffect(() => {
        if (initialData) {
            reset(initialData);
            if (initialData.image) {
                setImagePreview(initialData.image);
            }
        }
    }, [initialData, reset]);

    const handleFormSubmit = async (data) => {
        setIsLoading(true);
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Error en el formulario:', error);
            toast.error('Error al procesar el formulario');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            {/* Solo mostrar título si showTitle es true */}
            {showTitle && (
                <h2 className="text-2xl font-bold text-indigo-700 dark:text-blue-400 text-center mb-6">
                    {isEdit ? 'Editar Refugio' : 'Nuevo Refugio'}
                </h2>
            )}

            {/* Campo URL de Imagen con Preview */}
            <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">URL de la Imagen</label>
                <div className="flex flex-col items-center">
                    {imagePreview ? (
                        <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-48 h-48 object-cover rounded-lg mb-4 border-2 border-gray-300"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    ) : (
                        <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                            <i className="bi bi-image text-4xl text-gray-400"></i>
                        </div>
                    )}
                    <input
                        type="url"
                        {...register('image')}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="https://ejemplo.com/imagen.jpg"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Ingresa la URL de una imagen para el refugio
                    </p>
                </div>
            </div>

            {/* Campo Nombre */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Nombre del Refugio *</label>
                <input
                    {...register('name', { 
                        required: 'El nombre es requerido',
                        minLength: {
                            value: 2,
                            message: 'El nombre debe tener al menos 2 caracteres'
                        }
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Nombre del refugio"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Campo Dirección */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Dirección *</label>
                <input
                    {...register('address', { 
                        required: 'La dirección es requerida',
                        minLength: {
                            value: 5,
                            message: 'La dirección debe tener al menos 5 caracteres'
                        }
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Dirección completa del refugio"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Campo Teléfono */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Teléfono *</label>
                    <input
                        {...register('phone', { 
                            required: 'El teléfono es requerido',
                            pattern: {
                                value: /^[0-9+\s()-]+$/,
                                message: "Formato de teléfono inválido"
                            }
                        })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Número de teléfono"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                {/* Campo Email */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                    <input
                        type="email"
                        {...register('email', { 
                            required: 'El email es requerido',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Formato de email inválido"
                            }
                        })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="correo@ejemplo.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
            </div>

            {/* Campo Horario de Atención */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Horario de Atención</label>
                <input
                    {...register('openingHours')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ej: Lunes a Viernes 9:00 - 18:00"
                />
            </div>

            {/* Campo Descripción */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Descripción *</label>
                <textarea
                    {...register('description', { 
                        required: 'La descripción es requerida',
                        minLength: {
                            value: 10,
                            message: 'La descripción debe tener al menos 10 caracteres'
                        }
                    })}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Describe tu refugio, misión, valores, etc."
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Campo Proceso de Adopción */}
            <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Proceso de Adopción *</label>
                <textarea
                    {...register('adoptionProcess', { 
                        required: 'El proceso de adopción es requerido',
                        minLength: {
                            value: 10,
                            message: 'El proceso de adopción debe tener al menos 10 caracteres'
                        }
                    })}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Describe los pasos para adoptar una mascota de tu refugio"
                ></textarea>
                {errors.adoptionProcess && <p className="text-red-500 text-sm mt-1">{errors.adoptionProcess.message}</p>}
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:opacity-50"
            >
                {isLoading ? 'Guardando...' : isEdit ? 'Actualizar Refugio' : 'Crear Refugio'}
            </Button>
        </form>
    );
};

export default RefugioForm;