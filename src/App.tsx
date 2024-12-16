

import { Alert } from './components/Alert'
import { useState, useEffect } from 'react'

import ListGroup from './components/ListGroup'
import Button from './components/Button'
import { Like } from './components/Like'
import NavBar from './components/NavBar'
import Cart from './components/Cart'
import { ExpandableText } from './components/ExpandableText'
import Form from './components/Form'
import ReactHookForm from './components/ReactHookForm';
import ExpenseList from "./expense-tracker/components/ExpenseList"
import { ExpenseFilter } from "./expense-tracker/components/ExpenseFilter"
import { ExpenseForm } from './expense-tracker/components/ExpenseForm'
import apiClient, { CanceledError} from './services/api-client'

interface User {
  id: number;
  name: string;
 
}
function App() {
  const [alerVisible, setAlertVisiblity] = useState(false)
  const [cartItems, setCartItems] = useState(['product1', 'product2', 'product3', 'product4', 'product5'])
  const [selectedcategory, setSelectedCategory] = useState('')
  const [ expenses, setExpenses] = useState([
  {id:1, description: 'Kayan gwari', amount: 30, category: 'Groceries'},
  {id:2, description: 'kayan lantarki', amount: 30, category: 'Entertainment'},
  {id:3, description: 'biro', amount: 50, category: 'Utilities'},
  {id:4, description: 'shadda', amount: 40, category: 'Clothes'},
  {id:5, description: 'lace', amount: 40, category: 'Electronics'},
 ])

 const [users, setUsers] = useState<User[]>([])
 const [error , setError] = useState('')
 const [loading, setLoading] = useState(false)

 useEffect(() => {
  const controller = new AbortController()
  setLoading(true);
  apiClient.get<User[]>('/users', {
    signal: controller.signal
  })
  .then(response => {
    setUsers(response.data);
    setLoading(false);
    })
  .catch(error => {
    if(error instanceof  CanceledError) return;
    setError(error.message);
    setLoading(false);

  });

  return () => controller.abort()
 }, [])

//  useEffect(() => {
//     const controller = new AbortController();
    
//     setLoading(true);
//     axios.get<User[]>('https://jsonplaceholder.typicode.com/users', {
//       signal: controller.signal
//     })
//     .then(response => setUsers(response.data))
//     .catch(error => {
//       if (error instanceof CanceledError) return;
//       setError(error.message);
//     })
//     .finally(() => setLoading(false));

//     return () => controller.abort();
//   }, []);


//  useEffect(() => {
//     const controller = new AbortController();

//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users', {
//           signal: controller.signal
//         });
//         setUsers(response.data);
//       } catch (error) {
//         if (error instanceof CanceledError) return;
//         setError(error instanceof Error ? error.message : 'An error occurred');
//       }
//     };

//     fetchUsers();

//     return () => controller.abort();
//   }, []);

console.log("Category Selected", selectedcategory)


  const handleSelectItem = (item: string) => {
    console.log(item)
  }

  const visibleExpenses = selectedcategory ? expenses.filter(expense => expense.category === selectedcategory) : expenses
  console.log("visibleExpenses", visibleExpenses)
  const addUser = () => {
    const originalUser = [...users];
    const newUser = {
      id: 0,
      name: 'Salisu',
     
    };
    setUsers([...users, newUser]);
    apiClient.post('/users', newUser)
     .then(({data: savedUser}) => setUsers([...users, savedUser])
     )
     .catch(error => {
       setError(error.message);
       setUsers(originalUser);
     })
  }

  const updateUsers = ((user: User) => {
    const originalUsers = [...users];
    const updatedUser =  {
      ...user,
      name: user.name + '!',
    }     
    setUsers(users.map((user) => user.id === updatedUser.id ? updatedUser : user));
    apiClient.put(`/users/${user.id}`, updatedUser)
    .catch(error => {
      setError(error.message);
      setUsers(originalUsers);
    })
  })

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    apiClient.delete(`/users/${user.id}`)
    .catch(error => {
      setError(error.message);
      setUsers(originalUsers);
    })

  } 
  return (
    
    <div className="App">
     {error && <p className='mb-5 text-bg-danger'> {error}</p>}  
     {loading && <div className='spinner-border'></div>}
     <button className='btn btn-primary mb-3' onClick={addUser}>Add</button>
      <ul className="list-group">
          
           { users.map((user) => {
            return (
             <li key={user.id} className='list-group-item d-flex justify-content-between align-items-center'>
              {user.name}
              <div>
                 <button className='btn btn-outline-secondary mx-1' onClick={() => updateUsers(user)}>Update</button>
              <button className='btn btn-danger' onClick={() => deleteUser(user)}>Delete</button>
              </div>
              
              </li>
            )
            })
}

      </ul>
     {/* { alerVisible && <Alert onClose={() => setAlertVisiblity(false)}><p>Hello world from Alert component</p></Alert>}

     <Button onClick={() => setAlertVisiblity(!alerVisible)} >My Button</Button> */}
     <div className='mb-5'>
      <ExpenseForm onSubmit={(expense) => setExpenses([...expenses, {...expense, id: expenses.length + 1}])} />
     </div>
     <div className='mb-3'>
        <ExpenseFilter onSelectCategory={(category) => setSelectedCategory(category)}/>
     </div>
     
     <ExpenseList expenses={visibleExpenses} onDelete={(id) => setExpenses(expenses.filter(expense => expense.id !== id))}/>
      
    </div>
  )
}

export default App
