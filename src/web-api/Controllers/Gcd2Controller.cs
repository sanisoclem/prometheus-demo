using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;

namespace web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Gcd2Controller : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> Get(int difficulty)
        {
            string retval = "null";
            for (int i=0; i<difficulty*2;i++) {
                retval = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: Gcd1Controller.data + Guid.NewGuid().ToString(),
                    salt: System.Text.Encoding.UTF8.GetBytes("tae"),
                    prf: KeyDerivationPrf.HMACSHA1,
                    iterationCount: 10000,
                    numBytesRequested: 512 / 8));
            }
            return Ok(retval);
        }
    }
}
