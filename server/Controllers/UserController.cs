using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public UserController(AppDbContext context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new {Message = "User registered successfully." });
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginRequest request)
        {
            // Validate user credentials
            var user = await AuthenticateUser(request.Email, request.Password);
            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            // Generate JWT token
            var token = GenerateJwtToken(user);

            return Ok(new
            {
                Token = token,
                User = new
                {
                    user.ID,
                    user.emailID,
                    user.firstName,
                    user.lastName
                }
            });
        }

        [Authorize]
        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetUserDetails(int id)
        {
            var userDetail = await _context.Users.FindAsync(id);
            if (userDetail != null)
            {
                return Ok(userDetail);
            }
            else
            {
                return NotFound();
            }
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
                new Claim(ClaimTypes.Email, user.emailID)
            }),
                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private async Task<User> AuthenticateUser(string email, string password)
        {
            var userDetail = await _context.Users.FirstOrDefaultAsync(u => u.emailID == email);
            // Checking user authencity by verifying the passwords 
            if (password == userDetail.password)
            {
                return userDetail;
            }
            return null;
        }

        //private async Task<User> AuthenticateUser(string email, string password)
        //{
        //    var userDetail = await _context.Users.FirstOrDefaultAsync(u => u.emailID == email);

        //    // Add null check
        //    if (userDetail == null)
        //    {
        //        return null;
        //    }

        //    if (email == userDetail.emailID && password == userDetail.password)
        //    {
        //        return userDetail;
        //    }
        //    return null;
        //}
    }
}
