import React from "react";
import Header from "./Header";
import AvailableLists from "./Lists/AvailableLists";

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <hr />
      </div>
      {/* <Auth /> */}
      <AvailableLists />
    </div>
  );
}

export default App;
