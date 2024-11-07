import React, { useState } from 'react';
import Loader from '../../Components/Loader';
import Modal from '../../Components/Modal';
import { useTasks } from '../../Context/TaskContext';
import { Task } from '../../types/tasks';

interface CreateTaskModalProps {
    show: boolean;
    onClose: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ show, onClose }) => {
    const { addTask } = useTasks();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // This creates a new task object
        const newTask: Task = {
            id: Date.now(),
            title,
            description,
            deadline,
            status: 'pending',
        };

        await addTask(newTask);
        setLoading(false);
        onClose();
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold">Create Task</h2>
                {loading ? (
                    <div className="mb-4 flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Deadline
                            </label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="mr-2 inline-flex items-center rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                            >
                                Create Task
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
};

export default CreateTaskModal;
