import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { AudioButton, AudioCard, AudioInput, AudioText } from "../components/common";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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

            await registerUser(formData);

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {
            setError("Registration failed. Try another email or check the service.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white">
            <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-12 lg:grid-cols-[.95fr_1.05fr]">
                <AudioCard className="mx-auto w-full max-w-xl">
                    <h2 className="text-3xl font-black">Create account</h2>
                    <AudioText className="mt-3">
                        Start with a secure profile for the AudioHub experience.
                    </AudioText>

                    <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                        <AudioInput
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

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
                            {loading ? "Creating..." : "Register"}
                        </AudioButton>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Already registered?{" "}
                        <Link to="/login" className="text-white">
                            Login
                        </Link>
                    </p>
                </AudioCard>

                <div>
                    <Link to="/" className="text-sm font-semibold tracking-[8px] text-white">
                        AUDIOHUB
                    </Link>
                    <p className="mt-16 text-sm uppercase tracking-[10px] text-gray-500">
                        Premium retail
                    </p>
                    <h1 className="mt-8 text-6xl font-black leading-none md:text-8xl">
                        Built
                        <br />
                        On Trust.
                    </h1>
                    <AudioText className="mt-8 max-w-xl text-xl">
                        Genuine products, thoughtful curation, and a refined customer journey from the first click.
                    </AudioText>
                </div>
            </section>
        </main>
    );
}

export default Register;
