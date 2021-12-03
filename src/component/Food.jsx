export default function Food({ food, supprimer }) {
   return (
      <div className="card mt-3" style={{ width: "18rem" }}>
         <img
            src={food.image_url}
            style={{ width: "286px", height: "144px" }}
            className="card-img-top"
            alt={food.product_name}
         />
         <div className="card-body">
            <h5 className="card-title">{food.product_name}</h5>
            <p className="card-text">Marque: {food.brands}</p>
            <p className="card-text">Score: {food.nutriscore_score}</p>

            <button className="btn btn-danger" onClick={() => supprimer(food)}>
               Remove
            </button>
         </div>
      </div>
   );
}
