import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
    const {currentUser} = useSelector((state) => state.user)
    // Outlet fait reference à tout ce qui est dans la route privée(PrivateRoute)
    return currentUser ? <Outlet /> : <Navigate to='/sign-in' />
}