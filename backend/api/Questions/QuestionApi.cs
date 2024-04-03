using api.Questions.Dtos;
using api.Questions.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Patients;
public static class QuestionApi
{
    public static RouteGroupBuilder MapQuestions(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/questions");

        group.MapPost("/create", async (IQuestionService questionService,
                                        [FromBody] CreateQuestionRequest request) =>
        {
            var response = await questionService.CreateAsync(request);
            return response.Success ?
             Results.Created("", response.Data) :
             Results.UnprocessableEntity(response.Data);
        });

        group.MapGet("/list", async (IQuestionService questionService) =>
       {
           var questions = await questionService.ListAsync();
           return Results.Ok(questions);
       });

        return group;
    }
}
