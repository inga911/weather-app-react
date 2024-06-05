import bgCover from "./assets/bg-cover.mp4";

import Main from './components/Main.jsx'

function App() {

  return (
    <div className="App">
      <video className="bg-video" autoPlay loop muted>
        <source src={bgCover} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Main />
    </div>
  );
}

export default App;
