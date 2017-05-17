using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using NgCookingClasses;
using NgCookingServices.Models;
using System.Web.Http.Cors;

namespace NgCookingServices.Controllers
{
    [EnableCors(origins: "http://localhost:63280", headers: "*", methods: "*")]
    public class IngredientsController : ApiController
    {
        private NgCookingServicesContext db = new NgCookingServicesContext();

        // GET: api/Ingredients
        public IQueryable<Ingredient> GetIngredients()
        {
            return db.Ingredients;
        }

        // GET: api/Ingredients/5
        [ResponseType(typeof(Ingredient))]
        public IHttpActionResult GetIngredient(string id)
        {
            Ingredient ingredient = db.Ingredients.Find(id);
            if (ingredient == null)
            {
                return NotFound();
            }

            return Ok(ingredient);
        }

        // PUT: api/Ingredients/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutIngredient(string id, Ingredient ingredient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ingredient.Id)
            {
                return BadRequest();
            }

            db.Entry(ingredient).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IngredientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Ingredients
        [ResponseType(typeof(Ingredient))]
        public IHttpActionResult PostIngredient(Ingredient ingredient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Ingredients.Add(ingredient);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (IngredientExists(ingredient.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = ingredient.Id }, ingredient);
        }

        // DELETE: api/Ingredients/5
        [ResponseType(typeof(Ingredient))]
        public IHttpActionResult DeleteIngredient(string id)
        {
            Ingredient ingredient = db.Ingredients.Find(id);
            if (ingredient == null)
            {
                return NotFound();
            }

            db.Ingredients.Remove(ingredient);
            db.SaveChanges();

            return Ok(ingredient);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool IngredientExists(string id)
        {
            return db.Ingredients.Count(e => e.Id == id) > 0;
        }
    }
}