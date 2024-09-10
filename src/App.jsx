import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center">React Query</h1>
      <Link to="/" className="text-2xl mx-4">
        Home
      </Link>
      <Link to="/products" className="text-2xl mr-4">
        Products
      </Link>
    </>
  );
}

export default App;
