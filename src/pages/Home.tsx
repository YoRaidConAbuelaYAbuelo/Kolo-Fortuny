import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h1>Witaj w grze językowej Koło Niemieckiej Fortuny</h1>
      <button onClick={() => navigate("/zasady")}>
        Przejdź dalej
      </button>
    </div>
  );
};

export default Home;