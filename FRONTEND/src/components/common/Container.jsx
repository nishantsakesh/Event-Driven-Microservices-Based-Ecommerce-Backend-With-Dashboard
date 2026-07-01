function Container({ children }) {

    return (

        <div
            className="mx-auto px-8"
            style={{
                maxWidth: "1320px"
            }}
        >
            {children}
        </div>

    );

}

export default Container;