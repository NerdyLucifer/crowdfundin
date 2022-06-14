import Initiatives from "./components/Initiatives";
import Navigationbar from "./components/Navigationbar";
import UploadInitiative from "./components/UploadInitiative";
import YourInitiatives from "./components/YourInitiatives";

function App() {
  return (
    <div className="App">
      <Navigationbar/>
      <UploadInitiative/>
      <YourInitiatives/>
      <Initiatives/>
    </div>
  );
}

export default App;
