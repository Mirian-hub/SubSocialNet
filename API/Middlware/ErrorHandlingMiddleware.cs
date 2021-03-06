using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace API.Middlware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger;
            _next = next;

        }

        public async Task Invoke(HttpContext context) 
        {
          try {
            await _next(context);
          } 
          catch (Exception ex) 
          {
             await HandleExceptionAsync(context, ex, _logger);
          }
        } 

        private async Task HandleExceptionAsync(HttpContext context, Exception exception, ILogger<ErrorHandlingMiddleware> logger) 
        {
            object errors = null;
            switch (exception) {
                case RestException re: 
                logger.LogError(exception, "ResT Error");
                errors = re.Errors;
                context.Response.StatusCode = (int)re.Code;
                break;
                case Exception ex: 
                logger.LogError(exception, "Server Error");
                errors = string.IsNullOrWhiteSpace(ex.Message)? "Error": ex.Message;
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                break;
            }

            context.Response.ContentType = "application/json";
            if(errors !=null) {
                var result = JsonSerializer.Serialize(
                    new {
                         errors
                    });
                await context.Response.WriteAsync(result);
            }
        }
    }
}