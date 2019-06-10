import React from "react";
import Header from "./Header";
import GoodsList from "./Goods/GoodsList";
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
      <hr />
      <GoodsList />
    </div>
  );
}

export default App;
