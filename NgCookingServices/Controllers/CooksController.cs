﻿using System.Data.Entity;
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
    public class CooksController : ApiController
    {
        private NgCookingServicesContext db = new NgCookingServicesContext();

        // GET: api/Cooks
        public IQueryable<Cook> GetCooks()
        {
            return db.Cooks;
        }

        // GET: api/Cooks/5
        [ResponseType(typeof(Cook))]
        public IHttpActionResult GetCook(int id)
        {
            Cook cook = db.Cooks.Find(id);
            if (cook == null)
            {
                return NotFound();
            }

            return Ok(cook);
        }

        // PUT: api/Cooks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCook(int id, Cook cook)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cook.Id)
            {
                return BadRequest();
            }

            db.Entry(cook).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CookExists(id))
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

        // POST: api/Cooks
        [ResponseType(typeof(Cook))]
        public IHttpActionResult PostCook(Cook cook)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Cooks.Add(cook);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cook.Id }, cook);
        }

        // DELETE: api/Cooks/5
        [ResponseType(typeof(Cook))]
        public IHttpActionResult DeleteCook(int id)
        {
            Cook cook = db.Cooks.Find(id);
            if (cook == null)
            {
                return NotFound();
            }

            db.Cooks.Remove(cook);
            db.SaveChanges();

            return Ok(cook);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CookExists(int id)
        {
            return db.Cooks.Count(e => e.Id == id) > 0;
        }
    }
}