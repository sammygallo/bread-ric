const React = require('react')
const Default = require('./layouts/Default')

function Show ({bread, index}) {
    return (
        <Default>
        <h3>{bread.name}</h3>
        <p>
          {
            bread.hasGluten
            ? <span> Has gluten </span>
            : <span> Does NOT have gluten </span>
          }
        </p>
        <p id="ingredient-list">Ingredients: {bread.ingredients}</p>
        <script>let ingredientsList = document.getElementById("ingredient-list")</script>
        
        <img src={bread.image} alt={bread.name} />
        <a href={`/breads/${index}/edit`}><button>Edit</button></a>
        <form action={`/breads/${index}?_method=DELETE`} method="POST">
          <input type='submit' value="DELETE" />
        </form>
        <li><a href="/breads">Go home</a></li>
      </Default>
      
    )
}

module.exports = Show
