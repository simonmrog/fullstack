import Container from "react-bootstrap/Container";

// Components
import PollForm from "./components/PollForm";
import Chart from "./components/Chart";

function App() {
  return (
    <div className="App">
      <Container>
        <h1>OS Vote</h1>
        <p>Vote for your favorite OS to develop on</p>
        <PollForm></PollForm>
        <Chart></Chart>
      </Container>
    </div>
  );
}

export default App;
