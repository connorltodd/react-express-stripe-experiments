import "./App.css";
import ProductForm from "./ProductForm";

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Stripe Test payment system</h1>
      <form
        method="POST"
        action="/stripe-webhook/create-customer-portal-session"
      >
        <button type="submit">Manage billing</button>
      </form>
      <ProductForm />
    </div>
  );
}

export default App;
