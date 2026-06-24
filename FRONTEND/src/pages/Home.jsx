function Home() {

    const email = localStorage.getItem("email");

    return (
        <div>
            <h1>AudioHub</h1>

            <h3>Welcome {email}</h3>

            <p>User Home Page</p>
        </div>
    );
}

export default Home;