import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    Navigate({ to: "/"})
  }
  return children;
};

export default PrivateRoute;
