import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loader from './Loader';
import Button from './Button';

const MascotaForm = ({ onSubmit, initialData, isEdit = false, refugioId, showTitle = true }) => {
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
        if (refugioId && !isEdit) {
            reset({
                ...initialData,
                refugio: { id: parseInt(refugioId) }
            });
        } else if (initialData) {
            reset(initialData);
            if (initialData.image) {
                setImagePreview(initialData.image);
            }
        }
    }, [initialData, isEdit, refugioId, reset]);

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

    const statusOptions = ['En adopción', 'Adoptado', 'En proceso', 'Reservado'];
    const genderOptions = ['Macho', 'Hembra'];
    const sizeOptions = ['Pequeño', 'Mediano', 'Grande'];
    const personalityOptions = ['Juguetón', 'Tranquilo', 'Energico', 'Cariñoso', 'Timido', 'Sociable'];

    if (isLoading) {
        return <Loader />;
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            {/* Solo mostrar título si showTitle es true */}
            {showTitle && (
                <h2 className="text-2xl font-bold text-indigo-700 dark:text-blue-400 text-center mb-6">
                    {isEdit ? 'Editar Mascota' : 'Nueva Mascota'}
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
                        Ingresa la URL de una imagen para la mascota
                    </p>
                </div>
            </div>

            {/* Campo Nombre */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Nombre *</label>
                <input
                    {...register('name', { 
                        required: 'El nombre es requerido',
                        minLength: {
                            value: 2,
                            message: 'El nombre debe tener al menos 2 caracteres'
                        }
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Nombre de la mascota"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Campo Edad */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Edad (años) *</label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="30"
                        {...register('age', { 
                            required: 'La edad es requerida',
                            min: {
                                value: 0,
                                message: 'La edad debe ser mayor o igual a 0'
                            },
                            max: {
                                value: 30,
                                message: 'La edad debe ser menor o igual a 30'
                            }
                        })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="0.0"
                    />
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
                </div>

                {/* Campo Género */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Género *</label>
                    <select
                        {...register('gender', { required: 'El género es requerido' })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Seleccionar género</option>
                        {genderOptions.map(gender => (
                            <option key={gender} value={gender}>{gender}</option>
                        ))}
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Campo Tamaño */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Tamaño *</label>
                    <select
                        {...register('size', { required: 'El tamaño es requerido' })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Seleccionar tamaño</option>
                        {sizeOptions.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                    {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size.message}</p>}
                </div>

                {/* Campo Raza */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Raza *</label>
                    <input
                        {...register('breed', { 
                            required: 'La raza es requerida',
                            minLength: {
                                value: 2,
                                message: 'La raza debe tener al menos 2 caracteres'
                            }
                        })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Raza de la mascota"
                    />
                    {errors.breed && <p className="text-red-500 text-sm mt-1">{errors.breed.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Campo Estado */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Estado *</label>
                    <select
                        {...register('status', { required: 'El estado es requerido' })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Seleccionar estado</option>
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                </div>

                {/* Campo Personalidad */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Personalidad *</label>
                    <select
                        {...register('personality', { required: 'La personalidad es requerida' })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Seleccionar personalidad</option>
                        {personalityOptions.map(personality => (
                            <option key={personality} value={personality}>{personality}</option>
                        ))}
                    </select>
                    {errors.personality && <p className="text-red-500 text-sm mt-1">{errors.personality.message}</p>}
                </div>
            </div>

            {/* Campo Descripción */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Descripción</label>
                <textarea
                    {...register('description')}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Describe a la mascota (opcional)"
                />
            </div>

            {/* Campo Historia */}
            <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Historia</label>
                <textarea
                    {...register('history')}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Historia de la mascota (opcional)"
                />
            </div>

            {/* Campos ocultos para datos del refugio */}
            {refugioId && (
                <input
                    type="hidden"
                    {...register('refugio.id')}
                    value={parseInt(refugioId)}
                />
            )}

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:opacity-50"
            >
                {isLoading ? 'Guardando...' : isEdit ? 'Actualizar Mascota' : 'Crear Mascota'}
            </Button>
        </form>
    );
};

export default MascotaForm;