import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './component/NavBar';
import axios from 'axios';
import Food from './component/Food';

function App() {

  const [foods, setFoods] = useState([])
  const [input, setInput] = useState("")
  const [rech, setRech] = useState("")

  function search(input) {
    axios.get(`https://world.openfoodfacts.org/api/v0/product/${input}.json`).then(datas => {
      if (datas.status === 200 && datas.data.status === 1) {
        let tmp = [...foods]
        tmp.push(datas.data.product)
        setFoods(tmp)
      }
      setInput("")
      // console.log(datas)
      // console.log("foods", foods)
    })
  }

  useEffect(() => {
    let foodsBDD = localStorage.getItem("foods");
    if (foodsBDD === null) {
      localStorage.setItem("foods", JSON.stringify([]));
      foodsBDD = [];
    }
    // setFoods(JSON.parse(foodsBDD));
  }, [])

  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods));
  }, [foods])

  function supprimer(food) {
    let tmp = [...foods];
    const indice = foods.indexOf(food);
    if (indice > -1) tmp.splice(indice, 1);
    setFoods(tmp);
  }

  function rechercher(strRech, liste) {
    let tmpRech = strRech.toLowerCase();
    let res = liste.filter((food) => {
      if (food) {
        let lowerFood = food.product_name.toLowerCase();
        if (lowerFood.indexOf(tmpRech) > -1) return food;
      }
    })
    return res;
  }

  return (
    <div className="App">
      <header className="App-header">
        <NavBar titre="TP-FOOD-EAN BY Ismail Hedi" />
      </header>
      <main className="container">
        <div className="row">
          <div className="col-md-6 mt-5 d-flex">
            <input type="text" aria-label="Product" value={input} className="form-control" onChange={(e) => setInput(e.target.value)} />
            <button type="button" className="btn btn-info" onClick={() => search(input)}>Scan</button>
          </div>
        </div>
        <div>
          {foods.length > 0 && (
            <div className="input-group mb-3 mt-3">
              <input
                type="search"
                value={rech}
                onChange={(e) => {
                  setRech(e.target.value);
                }}
                className="form-control"
                placeholder="Rechercher ..."
              />
              <button className="btn btn-outline-info" type="button">
                Rechercher
              </button>
            </div>
          )}
          <h3 className="text-center mt-3">Liste des Produits : {rechercher(rech, foods).length} {rechercher(rech, foods).length > 1 ? "éléments" : "élément"}</h3>
          <hr />
          <div className="food">
            {foods && rechercher(rech, foods).map((food, i) => {
              return (
                <Food key={"food-" + i} food={food} supprimer={supprimer} />
              )
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
