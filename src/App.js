/* eslint-disable no-unused-vars */
import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paired, failed, reset } from "./pointerSlice";
import Card from "./components/Card";
import {
  FaVuejs,
  FaReact,
  FaAngular,
  FaCss3,
  FaJs,
  FaHtml5,
  FaAndroid,
  FaBootstrap,
  FaApple,
  FaAws,
  FaGithub,
  FaGoogle,
  FaNode,
  FaNpm,
  FaMicrosoft,
  FaReddit,
  FaStackOverflow,
  FaUbuntu,
  FaQuestion,
} from "react-icons/fa";

const pairs = [
  "FaVuejs",
  "FaReact",
  "FaAngular",
  "FaCss3",
  "FaJs",
  "FaHtml5",
  "FaAndroid",
  "FaBootstrap",
  "FaApple",
  "FaAws",
  "FaGithub",
  "FaGoogle",
  "FaNode",
  "FaNpm",
  "FaMicrosoft",
  "FaReddit",
  "FaStackOverflow",
  "FaUbuntu",
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.point.value);
  const [GameList, setList] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isFinished, setFinished] = useState(false);
  const [icons] = useState({
    FaVuejs,
    FaReact,
    FaAngular,
    FaCss3,
    FaJs,
    FaHtml5,
    FaAndroid,
    FaBootstrap,
    FaApple,
    FaAws,
    FaGithub,
    FaGoogle,
    FaNode,
    FaNpm,
    FaMicrosoft,
    FaReddit,
    FaStackOverflow,
    FaUbuntu,
    FaQuestion,
  });

  useEffect(() => {
    const reserveList = [];
    let queue = [...Array(36).keys()];

    const prepareCards = () => {
      pairs.map((element) => {
        let order = getRandomInt(18);
        while (!queue.includes(order)) {
          order = getRandomInt(36);
        }
        queue = queue.filter((element) => (element === order ? false : true));
        const obj = {
          name: element,
          order: order,
          hasFlipped: false,
          matched: false,
        };
        reserveList.push(obj);
        return 0;
      });
      pairs.map((element) => {
        let order = queue[0];
        queue = queue.filter((element) => (element === order ? false : true));
        const obj = {
          name: element,
          order: order,
          hasFlipped: false,
          matched: false,
        };
        reserveList.push(obj);
        return 0;
      });
      reserveList.sort(function (a, b) {
        return a.order - b.order;
      });
      setList(reserveList);
    };

    prepareCards();
  }, [isFinished]);

  const handleClick = (item) => {
    if (current >= 2 || item.hasFlipped || item.matched) {
      return 0;
    }

    // kartı açtığını gösterme
    setCurrent((prev) => {
      prev++;
      return prev;
    });

    // Cartı Açma
    setList((prev) => {
      const reserve = [...prev];
      reserve[item.order].hasFlipped = true;
      return reserve;
    });

    // Maks 2 tane açma ve kontrol mekanizması
    if (current === 1) {
      const cards = GameList.filter((item) => item.hasFlipped);

      // eşleşme kontrol
      if (item.name === cards[0].name) {
        item.matched = true;
        cards[0].matched = true;
        dispatch(paired());
      } else {
        dispatch(failed());
      }

      setTimeout(() => {
        setCurrent(0);
        setList((prev) => {
          const reserve = [...prev].map((item) => {
            item.hasFlipped = false;
            return item;
          });
          return reserve;
        });
      }, 800);
    }

    const matchedList = GameList.filter((element) => element.matched);
    if (matchedList.length === 36) {
      setFinished(true);
    }
  };

  const resetGame = () => {
    dispatch(reset());
    setFinished(false);
  };

  return (
    <div className="App">
      <div className="GamePlane">
        <p className="score"> {score} </p>
        {isFinished ? (
          <div className="resetContainer">
            <button onClick={resetGame} className="resetButton">
              {" "}
              Play Again{" "}
            </button>
          </div>
        ) : (
          <div className="Game">
            {GameList.map((item, index) => {
              const TagName = item.matched
                ? icons[item.name]
                : item.hasFlipped
                ? icons[item.name]
                : icons["FaQuestion"];
              return (
                <div
                  key={index}
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  <TagName className={`icon ${
                    item.matched ? "matched" : item.hasFlipped ? "flipped" : null
                  }`} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
