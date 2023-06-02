import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"
import Spinner from "./Spinner"

// checks to see if user is logged in, displays 'loading' while check is ongoing. Redirects user to sign-in page user is not logged in. Renders the Outlet component from react-router if user is logged in. Check App component to see Outlet loads Profile component
function PrivateRoute() {
    const {loggedIn, loading} = useAuthStatus()

    if(loading) {
        return <Spinner />
    }

  return (
    <>
        {loggedIn ? <Outlet /> : <Navigate to='/sign-in' />}
    </>
  )
}

export default PrivateRoute