import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, clearTask, upDateTask } from '../redux/TasksSlice';
import { useEffect, useRef, useState } from 'react';

// Validation schema using Yup
const schema = Yup.object().shape({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required")
        .min(10, "description must be at least 10 characters"),
    priority: Yup.mixed().required("priority is required")
        .oneOf(['low', 'medium', 'high'], 'invalid choice'),
    state: Yup.mixed().required("state is required")
        .oneOf(['todo', 'doing', 'done'], 'invalid choice'),
    image: Yup.mixed().required('An image is required')
        .test('fileType', 'Unsupported File Format', value => {
            return value && value[0] && ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
                .includes(value[0].type);
        }),
});

const MyForm = ({ isForm, setIsForm, isEdited, setIsEdited }) => {
    const dispatch = useDispatch();
    const taskBeingUpdated = useSelector((state) => state.tasks.taskBeingUpdated);
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef();

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (taskBeingUpdated) {
            reset({
                title: taskBeingUpdated.title,
                description: taskBeingUpdated.description,
                priority: taskBeingUpdated.priority,
                state: taskBeingUpdated.state,
                image: null,
            });

            if (taskBeingUpdated.image) {
                setImagePreview(taskBeingUpdated.image);
            } else {
                setImagePreview('');
            }
        }
    }, [taskBeingUpdated, reset]);

    const onSubmit = async (data) => {
        let updatedData = { ...data };

        if (data.image && data.image[0]) {
            const file = data.image[0];
            const imageURL = await getBase64(file);
            updatedData.image = imageURL;
        } else if (imagePreview) {
            updatedData.image = imagePreview;
        }

        if (isEdited && taskBeingUpdated) {
            updatedData.id = taskBeingUpdated.id;
            dispatch(upDateTask(updatedData));
            dispatch(clearTask());
            setIsEdited(false);
        } else {
            dispatch(addTask(updatedData));
        }

        setIsForm(false);
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const image = watch('image');
    const handleFileInputClick = () => {
      fileInputRef.current.click();
  };
  

    return (
        <>
            {isForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="shadow-lg bg-white px-6 py-5 rounded-2xl flex flex-col items-center justify-center gap-4 w-full max-w-[400px] md:w-[80%] lg:w-[60%]"
                    >
                        <div className="w-full">
                            <input
                                type="text"
                                {...register('title')}
                                placeholder="Title of your task"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>

                        <div className="w-full">
                            <input
                                type="text"
                                {...register('description')}
                                placeholder="Description"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>

                        <div className="w-full">
                            <select
                                {...register('state')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
                            >
                                <option value="">Select state</option>
                                <option value="todo">Todo</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                        </div>

                        <div className="w-full">
                            <select
                                {...register('priority')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
                            >
                                <option value="">Select priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
                        </div>

                        <div className="w-full">
                        <input
                            type="file"
                            accept="image/*"
                            {...register('image')}
                            className="hidden"  
                            ref={fileInputRef}   
                        />
                         <label
                              onClick={handleFileInputClick} 
                              className="flex items-center justify-center w-32 px-2 py-1 bg-lime-600 text-white rounded-lg cursor-pointer hover:bg-lime-700 transition duration-300"
                          >
                              Add Picture
                          </label>

                            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                        </div>

                        {(imagePreview || (image && image[0])) && (
                            <div className="w-full mt-4">
                                <h4 className="text-gray-600 mb-2">Image Preview:</h4>
                                <img
                                    src={imagePreview || URL.createObjectURL(image[0])}
                                    alt="Image Preview"
                                    className="w-[200px] h-auto rounded-lg shadow-md"
                                />
                            </div>
                        )}

                       <div className='flex gap-3 justify-center items-center mt-4'>
                       <button
                            type="submit"
                            className={` px-6 py-2 text-white rounded-full shadow-md transition duration-300 ${
                                isEdited ? 'bg-lime-600 hover:bg-lime-700' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {isEdited ? 'Update' : 'Add'}
                        </button>

                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={
                              () => {
                                setIsForm(false)
                                setIsEdited(false)
                                dispatch(clearTask())

                              }
                            }
                            className=" px-6 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition duration-300"
                        >
                            Close
                        </button>
                       </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default MyForm;
