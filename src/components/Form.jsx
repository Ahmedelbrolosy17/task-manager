import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addTask, upDateTask, clearTask } from '../redux/tasksSlice';

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    priority: yup.string().required('Priority is required'),
    state: yup.string().required('State is required'),
    image: yup.mixed().nullable(), 
});

const MyForm = ({ isForm, setIsForm, isEdited, setIsEdited }) => {
    const dispatch = useDispatch();
    const taskBeingUpdated = useSelector((state) => state.tasks.taskBeingUpdated);
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            priority: '',
            state: '',
            image: null,
        },
    });

    useEffect(() => {
        if (taskBeingUpdated) {
            setValue('title', taskBeingUpdated.title || '');
            setValue('description', taskBeingUpdated.description || '');
            setValue('priority', taskBeingUpdated.priority || '');
            setValue('state', taskBeingUpdated.state || '');
            setImagePreview(taskBeingUpdated.image || '');
        } else {
            reset(); // Reset if no task is being updated
        }
    }, [taskBeingUpdated, setValue, reset]);

    const onSubmit = async (data) => {
        let updatedData = { ...data };

        // Handle image file conversion if selected
        if (data.image && data.image[0]) {
            const file = data.image[0];
            const imageURL = await getBase64(file);
            updatedData.image = imageURL;
        } else if (imagePreview) {
            updatedData.image = imagePreview; // Use existing preview if no new image
        }

        if (isEdited && taskBeingUpdated) {
            updatedData.id = taskBeingUpdated.id;
            dispatch(upDateTask(updatedData));
            dispatch(clearTask());
            setIsEdited(false);
        } else {
            dispatch(addTask(updatedData));
        }

        reset(); // Reset after submission
        setIsForm(false);
        setImagePreview(''); // Clear image preview after submission
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Set the preview for the selected file
            setValue('image', file); 
        } else {
            setImagePreview(''); // Clear the preview if no file is selected
            setValue('image', null); // Clear the image field in form state
        }
    };

    return (
        <>
            {isForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="shadow-lg bg-white px-6 py-5 rounded-2xl flex flex-col items-center justify-center gap-4 w-full max-w-[90%] md:max-w-[80%] lg:max-w-[60%]"
                    >
                        {/* Title Input */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                {...register('title')}
                                className={`mt-1 block w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>

                        {/* Description Input */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                {...register('description')}
                                className={`mt-1 block w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>
                        {/* Priority Input */}
                        <div className="w-full overflow-hidden">
                                <label className="block text-sm font-medium text-gray-700">Priority</label>
                                <select 
                                    {...register('priority')} 
                                    className={`mt-1 block w-full p-2 border ${errors.priority ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm transition-all duration-200 ease-in-out`}
                                >
                                    <option value="">Select priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                                {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
                                </div>

                                            {/* State Input */}
                                <div className="w-full overflow-hidden">
                                    <label className="block text-sm font-medium text-gray-700">State</label>
                                    <select 
                                        {...register('state')} 
                                        className={`mt-1 block w-full p-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm transition-all duration-200 ease-in-out`}
                                    >
                                        <option value="">Select state</option>
                                        <option value="todo">To Do</option>
                                        <option value="doing">Doing</option>
                                        <option value="done">Done</option>
                                    </select>
                                    {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                                </div>

                        {/* File Input */}
                        <div className="w-full">
                            <input
                                type="file"
                                accept="image/*"
                                {...register('image')}
                                className="hidden"
                                onChange={handleFileChange} 
                                ref={fileInputRef} 
                            />
                            <label
                                onClick={() => fileInputRef.current.click()} 
                                className="flex items-center justify-center w-32 px-2 py-1 bg-lime-600 text-white rounded-lg cursor-pointer hover:bg-lime-700 transition duration-300"
                            >
                                Add Picture
                            </label>

                            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                        </div>

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="w-full mt-4">
                                <h4 className="text-gray-600 mb-2">Image Preview:</h4>
                                <img
                                    src={imagePreview}
                                    alt="Image Preview"
                                    className="w-[200px] h-auto rounded-lg shadow-md"
                                />
                            </div>
                        )}

                        {/* Submit and Close Buttons */}
                        <div className="flex justify-between w-full mt-4">
                            <button
                                type="button"
                                onClick={() => setIsForm(false)}
                                className="w-1/2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                {isEdited ? 'Update Task' : 'Add Task'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default MyForm;
