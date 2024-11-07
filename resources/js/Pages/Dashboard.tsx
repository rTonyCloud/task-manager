import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import TaskManager from './Tasks/TaskManager';
import CreateTaskModal from './Tasks/TaskModal';

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <button
                                onClick={toggleModal}
                                className="mb-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                            >
                                Create Task
                            </button>
                            <TaskManager />
                            {isModalOpen && (
                                <CreateTaskModal
                                    onClose={toggleModal}
                                    show={true}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
