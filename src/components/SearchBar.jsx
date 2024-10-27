import React from 'react'; 
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setSearchTerm } from '../redux/TasksSlice';

const schema = yup.object().shape({
  name: yup.string().nullable(), // Allow an empty string for live search
});

const SearchBar = () => {
  const dispatch = useDispatch();

  const { register, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Watch the name field for changes
  const searchTerm = watch('name');

  // Update the Redux state whenever the search term changes
  React.useEffect(() => {
    dispatch(setSearchTerm(searchTerm || ''));
  }, [searchTerm, dispatch]);

  return (
    <form className="flex items-center justify-center">
      <input
        type="text"
        {...register('name')}
        placeholder="Search by title"
        className="border w-[80%] border-gray-300 rounded-lg px-3 py-2 focus:outline-none transition duration-200"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
    </form>
  );
};

export default SearchBar;
