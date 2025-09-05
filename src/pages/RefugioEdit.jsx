import React from 'react';
import RefugioEditForm from '../components/RefugioEditForm';

const RefugioEdit = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 transition-colors duration-700">
            <div className="container mx-auto px-4 md:px-8">
                {/* El título se maneja dentro del formulario RefugioEditForm */}
                <RefugioEditForm />
            </div>
        </div>
    );
};

export default RefugioEdit;