
interface buttonPros {
    children: string;
    onClick: () => void;
    color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}
const Button = ({children, onClick, color= 'primary'}: buttonPros) => {
  return (
    <button className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
