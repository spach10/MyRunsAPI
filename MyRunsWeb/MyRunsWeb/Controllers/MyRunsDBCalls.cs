using System.Net.Http;
using System.Text;

namespace MyRunsWeb.Controllers
{
    public class MyRunsDBCalls
    {
        const string path = "http://10.4.136.224:9090/api/";

        public static string MyRunsApiCallGet(string extension)
        {
            string result = null;
            using (var client = new HttpClient())
            {
                var response = client.GetAsync(path + extension).Result;
                if (response.IsSuccessStatusCode)
                    result = response.Content.ReadAsStringAsync().Result;

            }
            return result;
        }

        public static string MyRunsApiCallPost(string json, string extension)
        {
            HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");
            string result = null;
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = client.PostAsync(path + extension, content).GetAwaiter().GetResult();
                if (response.IsSuccessStatusCode)
                    result = response.Content.ReadAsStringAsync().Result;
            }
            return result;
        }
    }
}
