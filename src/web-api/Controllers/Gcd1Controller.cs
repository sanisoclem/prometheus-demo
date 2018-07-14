using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;

namespace web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Gcd1Controller : ControllerBase
    {
        public static readonly string data = string.Join(' ', Enumerable.Repeat(0,1000).Select(c=> Guid.NewGuid().ToString()).ToArray());
        
        [HttpGet]
        public ActionResult<string> Get(int difficulty)
        {
            string retval = null;
            for (int i=0; i<difficulty;i++) {
                retval = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: data,
                    salt: Encoding.UTF8.GetBytes("tae"),
                    prf: KeyDerivationPrf.HMACSHA1,
                    iterationCount: 10000,
                    numBytesRequested: 512 / 8));
            }
            return Ok(retval);
        }
    }
}
