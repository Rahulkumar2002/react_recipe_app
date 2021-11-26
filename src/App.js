import Axios from 'axios';
import './App.css';
import './Key'
import { useState } from 'react';
import RecipeTile from './components/RecipeTile'

function App({ YOUR_APP_ID, YOUR_APP_KEY }) {
  const [query, setquery] = useState("")
  const [recipes, setrecipe] = useState([])
  const [healthLabels, sethealthLabels] = useState("vegetarian")



  var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=10&calories=591-722&health=${healthLabels}`


  async function getRecipes() {
    var result = await Axios.get(url);
    setrecipe(result.data.hits)
    console.log(result.data)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  }
  return (
    <div className="App">
      <h1>Food Recipe Plaza 🍔</h1>
      <form className="app__searchform" onSubmit={onSubmit}>
        <input className="app__input" type="text" placeholder="Enter Ingridient" value={query} onChange={(e) => setquery(e.target.value)} />
        <input className="app__submit" type="submit" value="Search" />
        <select className="app__healthLabels">
          <option onClick={() => sethealthLabels("vegetarian")}>vegetarian</option>
          <option onClick={() => sethealthLabels("paleo")}>paleo</option>
          <option onClick={() => sethealthLabels("dairy-free")}>dairy-free</option>
          <option onClick={() => sethealthLabels("low-sugar")}>low-sugar</option>
        </select>
      </form>
      <div className="app__recipes">
        {recipes.map(recipe => {
          return <RecipeTile recipe={recipe} />
        })}
      </div>
    </div>

  );
}

export default App;
