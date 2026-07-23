import PropTypes from "prop-types";

export default function PageContainer({ children }) {
    return (
        <main className="flex-1 overflow-y-auto bg-muted/30">
            <div className="mx-auto w-full max-w-7xl p-6">
                {children}
            </div>
        </main>
    );
}

PageContainer.propTypes = {
    children: PropTypes.node,
};