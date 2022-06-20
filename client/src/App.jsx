import Initiatives from "./components/Initiatives";
import Navigationbar from "./components/Navigationbar";
import UploadInitiative from "./components/UploadInitiative";
import YourInitiatives from "./components/YourInitiatives";

function App() {
  return (
    <div className="App">
      <Navigationbar/>
      <h3 style={{color: 'red'}}>Connect the wallet to GOERLI TEST NETWORK</h3>
      <UploadInitiative/>
      <YourInitiatives/>
      <Initiatives/>
    </div>
  );
}

export default App;
