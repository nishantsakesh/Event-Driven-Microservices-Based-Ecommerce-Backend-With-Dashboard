import { useState } from "react";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { AudioButton, AudioCard, AudioInput, AudioText } from "../components/common";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");
        setLoading(true);

        try {

            const response = await loginUser(formData);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("role", response.data.role);

            if (response.data.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (error) {
            setError("Invalid credentials. Please check your email and password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white">
            <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
                <div>
                    <Link to="/" className="text-sm font-semibold tracking-[8px] text-white">
                        AUDIOHUB
                    </Link>
                    <p className="mt-16 text-sm uppercase tracking-[10px] text-gray-500">
                        Secure access
                    </p>
                    <h1 className="mt-8 text-6xl font-black leading-none md:text-8xl">
                        Welcome
                        <br />
                        Back.
                    </h1>
                    <AudioText className="mt-8 max-w-xl text-xl">
                        Manage a curated premium audio catalogue with the calm precision your customers expect.
                    </AudioText>
                </div>

                <AudioCard className="mx-auto w-full max-w-xl">
                    <h2 className="text-3xl font-black">Login</h2>
                    <AudioText className="mt-3">
                        Use your AudioHub admin account to continue.
                    </AudioText>

                    <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                        <AudioInput
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <AudioInput
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        {error && (
                            <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
                                {error}
                            </p>
                        )}

                        <AudioButton type="submit" className="w-full" disabled={loading}>
                            {loading ? "Signing in..." : "Login"}
                        </AudioButton>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        New to AudioHub?{" "}
                        <Link to="/register" className="text-white">
                            Create account
                        </Link>
                    </p>
                </AudioCard>
            </section>
        </main>
    );
}

export default Login;
