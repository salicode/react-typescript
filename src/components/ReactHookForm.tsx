
import {FieldValues, useForm} from 'react-hook-form'
const ReactHookForm = () => {
    const {register, handleSubmit} = useForm()
    const onSubmit = (data: FieldValues) => {
        console.log(data)

    }
  return (
     <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name RHF
        </label>
        <input {...register('name')} id="name" type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age  RHF
        </label>
        <input  {...register('age')} id="age" type="number" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}

export default ReactHookForm
