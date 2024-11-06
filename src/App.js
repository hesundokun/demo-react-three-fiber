import {useState} from "react";

import {Box, Shoe, TShirt, Innomize} from "./demo";

function App() {
    const [tab, setTab] = useState("box");

    return (
        <div>
            <div className="tabs">
                <button onClick={() => setTab("box")}>Box</button>
                <button onClick={() => setTab("circle")}>Circle</button>
                <button onClick={() => setTab("t-shirt")}>T-shirt</button>
                <button onClick={() => setTab("shoe")}>Shoe</button>
                <button onClick={() => setTab("office")}>Innomize</button>
            </div>
            <div id="canvas-container">
                {tab === "box" && <Box position={[0, 0, 0]} />}
                {tab === "t-shirt" && <TShirt />}
                {tab === "shoe" && <Shoe />}
                {tab === "office" && <Innomize />}
            </div>
        </div>
    );
}

export default App;
