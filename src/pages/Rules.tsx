import { useNavigate } from "react-router-dom";

const Rules = () => {
  const navigate = useNavigate();

  return (
  <div className="app-container">
    <h2>Zasady gry</h2>
    <ul style={{ listStyle: "none", marginBottom: "20px" }}>
      <li>Masz 3 próby na odgadnięcie słowa.</li>
      <li>Wpisujesz jedną literę naraz, lub cały zwrot.</li>
      <li>Jeśli litera jest poprawna — pojawia się w słowie.</li>
      <li>Jeśli nie — tracisz próbę.</li>
    </ul>

    <button onClick={() => navigate("/game")}>
      Rozpocznij grę
    </button>
  </div>
);
};

export default Rules;
