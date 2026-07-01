function Button({ children }) {
  return (
    <button
      className="
      bg-white
      text-black
      px-8
      py-4
      rounded-full
      font-semibold
      hover:bg-gray-200
      hover:scale-105
      transition-all
      duration-300
      shadow-lg"
    >
      {children}
    </button>
  );
}

export default Button;