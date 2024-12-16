import {FieldValues, useForm} from 'react-hook-form'

import  categories from '../categories' 
import { z } from  'zod'
import { zodResolver } from '@hookform/resolvers/zod';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void
}

const schema =z.object({
    description: z.string().min(3, {message: 'Description should be at least 3 characters long'}).max(50),
    amount: z.number({invalid_type_error: 'Amount is required'}).min(0.01).max(100_000),
    category: z.enum(categories, { errorMap: () => ({message: 'Select a category'})})
});


type ExpenseFormData = z.infer<typeof schema>
 
export const ExpenseForm = ({onSubmit}: ExpenseFormProps) => {

      const {register, handleSubmit, reset, formState: {errors}} = useForm<ExpenseFormData>({resolver: zodResolver(schema)})



  const handleFormSubmit = (data: ExpenseFormData) => {
   
    console.log('Form submitted with data:', data);
    
    
    onSubmit(data);
    
   
    reset();
  };

  
  return (
    
        <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mb-3">
        <label htmlFor="descriiption" className="form-label">
          Descriiption
        </label>
        <input {...register('description')} id="name" type="text" className="form-control" />
        {errors.description && <p className='text-danger'>{errors.description.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input  {...register('amount', {valueAsNumber: true})} id="amount" type="number" className="form-control" />
        {errors.amount && <p className='text-danger'>{errors.amount.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register('category')} id="category" className="form-select" >
          <option value="">Categories</option>
          {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
        </select>
        {errors.category && <p className='text-danger'>{errors.category.message}</p>}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
    
  )
}
