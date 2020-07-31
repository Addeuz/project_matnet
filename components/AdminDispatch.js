import Loader from './Loader';

const { default: userService } = require('../services/user.service');
const { default: ErrorPage } = require('../pages/_error');

// Component used to wrap other components to see if the user can access it.
// If the user is not logged in or is not an admin an error page will show.

const AdminDispatch = ({ children }) => {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    userService.isAdmin().catch(err => {
      setError({
        errorCode: err.response.status,
        errorMessage: err.response.data.message,
      });
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return <>{children}</>;
};

export default AdminDispatch;
