using System.Collections.Generic;
using System.Web.Mvc;
using MyRunsWeb.Models;
using Newtonsoft.Json;

namespace MyRunsWeb.Controllers
{
    public class HomeController : Controller
    {
        #region constants
        const string insertExerciseEntryEndpoint = "insert-exercise-entry/";
        const string insertLatLngCoordinatesEndpoint = "insert-lat-lng-coordinates/";
        const string getExerciseEntriesEndpoint = "get-exercise-entries/";
        const string getExerciseEntryEndpoint = "get-exercise-entry/";
        const string getLatLngCoordinatesEndpoint = "get-lat-lng-points/";
        #endregion

        public ActionResult Index()
        {
            return View();
        }

        ExerciseEntry GetExerciseEntry(int id)
        {
            string json = "{\"id\": \"" + id + "\"}";
            var response = MyRunsDBCalls.MyRunsApiCallPost(json, getExerciseEntryEndpoint);
            return JsonConvert.DeserializeObject<ExerciseEntry>(response);
        }

        IEnumerable<ExerciseEntry> GetExerciseEntries()
        {
            var response = MyRunsDBCalls.MyRunsApiCallGet(getExerciseEntriesEndpoint);
            return JsonConvert.DeserializeObject<IEnumerable<ExerciseEntry>>(response);
        }

        IEnumerable<LatLngPoint> GetLatLngPoints(int id)
        {
            string json = "{\"id\": \"" + id + "\"}";
            var response = MyRunsDBCalls.MyRunsApiCallPost(json, getLatLngCoordinatesEndpoint);
            return JsonConvert.DeserializeObject<IEnumerable<LatLngPoint>>(response);
        }
    }
}
