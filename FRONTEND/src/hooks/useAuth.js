import { useNavigate } from "react-router-dom";

function useAuth() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const email = localStorage.getItem("email");

    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return {

        token,

        email,

        role,

        logout,

        isLoggedIn: !!token

    };

}

export default useAuth;