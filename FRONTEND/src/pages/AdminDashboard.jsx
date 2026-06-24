function AdminDashboard() {

    const email = localStorage.getItem("email");

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <h3>{email}</h3>

            <p>Product Management Area</p>
        </div>
    );
}

export default AdminDashboard;