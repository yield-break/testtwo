using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Testtwo.Controllers
{
    [Route("api/[controller]")]
    public class HeroesController : Controller
    {
        private readonly Dictionary<int, Hero> _heroes;

        public HeroesController()
        {
            _heroes = new Dictionary<int, Hero>{
                { 
                    1,
                    new Hero {
                        Id = 1,
                        Name = "Average Joe",
                    }
                },
                { 
                    2,
                    new Hero {
                        Id = 2,
                        Name = "Mad Malcolm",
                    }
                },
                { 
                    3,
                    new Hero {
                        Id = 3,
                        Name = "Spider Dude",
                    }
                },
                { 
                    4,
                    new Hero {
                        Id = 4,
                        Name = "The Flasher",
                    }
                },
                { 
                    5,
                    new Hero {
                        Id = 5,
                        Name = "Tea Boy",
                    }
                },
            };
        }
        
        [HttpGet("[action]")]
        public IEnumerable<Hero> LoadAll()
        {
            return _heroes.Values;
        }

        public class Hero
        {
            public int Id { get; set;}
            public string Name { get; set;}
        }
    }
}
