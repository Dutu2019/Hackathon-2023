import { useEffect } from "react";
import Bking from "../../icons/king.svg";
import Bbishop from "../../icons/bishop.svg";
import Bknight from "../../icons/knight.svg";
import Bpawn from "../../icons/pawn.svg";
import Brook from "../../icons/rook.svg";
import Bqueen from "../../icons/queen.svg";
import Wking from "../../icons/Wking.svg";
import Wbishop from "../../icons/Wbishop.svg";
import Wknight from "../../icons/Wknight.svg";
import Wpawn from "../../icons/Wpawn.svg";
import Wrook from "../../icons/Wrook.svg";
import Wqueen from "../../icons/Wqueen.svg";

import Board from "./Board";
import "./Home.css";

function Home() {
  useEffect(() => {
    // Select Tiles
    const A1 = document.querySelector(".A1");
    const B1 = document.querySelector(".B1");
    const C1 = document.querySelector(".C1");
    const D1 = document.querySelector(".D1");
    const E1 = document.querySelector(".E1");
    const F1 = document.querySelector(".F1");
    const G1 = document.querySelector(".G1");
    const H1 = document.querySelector(".H1");

    const A2 = document.querySelector(".A2");
    const B2 = document.querySelector(".B2");
    const C2 = document.querySelector(".C2");
    const D2 = document.querySelector(".D2");
    const E2 = document.querySelector(".E2");
    const F2 = document.querySelector(".F2");
    const G2 = document.querySelector(".G2");
    const H2 = document.querySelector(".H2");

    const A3 = document.querySelector(".A3");
    const B3 = document.querySelector(".B3");
    const C3 = document.querySelector(".C3");
    const D3 = document.querySelector(".D3");
    const E3 = document.querySelector(".E3");
    const F3 = document.querySelector(".F3");
    const G3 = document.querySelector(".G3");
    const H3 = document.querySelector(".H3");

    const A4 = document.querySelector(".A4");
    const B4 = document.querySelector(".B4");
    const C4 = document.querySelector(".C4");
    const D4 = document.querySelector(".D4");
    const E4 = document.querySelector(".E4");
    const F4 = document.querySelector(".F4");
    const G4 = document.querySelector(".G4");
    const H4 = document.querySelector(".H4");

    const A5 = document.querySelector(".A5");
    const B5 = document.querySelector(".B5");
    const C5 = document.querySelector(".C5");
    const D5 = document.querySelector(".D5");
    const E5 = document.querySelector(".E5");
    const F5 = document.querySelector(".F5");
    const G5 = document.querySelector(".G5");
    const H5 = document.querySelector(".H5");

    const A6 = document.querySelector(".A6");
    const B6 = document.querySelector(".B6");
    const C6 = document.querySelector(".C6");
    const D6 = document.querySelector(".D6");
    const E6 = document.querySelector(".E6");
    const F6 = document.querySelector(".F6");
    const G6 = document.querySelector(".G6");
    const H6 = document.querySelector(".H6");

    const A7 = document.querySelector(".A7");
    const B7 = document.querySelector(".B7");
    const C7 = document.querySelector(".C7");
    const D7 = document.querySelector(".D7");
    const E7 = document.querySelector(".E7");
    const F7 = document.querySelector(".F7");
    const G7 = document.querySelector(".G7");
    const H7 = document.querySelector(".H7");

    const A8 = document.querySelector(".A8");
    const B8 = document.querySelector(".B8");
    const C8 = document.querySelector(".C8");
    const D8 = document.querySelector(".D8");
    const E8 = document.querySelector(".E8");
    const F8 = document.querySelector(".F8");
    const G8 = document.querySelector(".G8");
    const H8 = document.querySelector(".H8");
  }, []);

  return (
    <div className="Home">
      <Board />
    </div>
  );
}
export default Home;
