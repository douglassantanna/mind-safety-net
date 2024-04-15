using api.Questions.Dtos;
using api.Questions.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Patients;
public static class QuestionApi
{
    public static RouteGroupBuilder MapQuestions(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/questions");

        group.MapGet("/list", async (IQuestionService questionService) =>
       {
           var questions = await questionService.ListAsync();
           return Results.Ok(questions);
       });

        group.MapPost("/create", async (IQuestionService questionService,
                                        [FromBody] CreateQuestionRequest request) =>
        {
            var response = await questionService.CreateAsync(request);
            return response.Success ?
             Results.Created("", response.Data) :
             Results.UnprocessableEntity(response.Data);
        });

        group.MapPost("/delete/{id}", (int id, IQuestionService questionService) =>
        {
            var response = questionService.DeleteQuestion(id);
            return Results.Ok();
        });

        group.MapPut("/set-enable-status", async (IQuestionService questionService,
                                                 [FromBody] SetQuestionEnableStatusRequest request) =>
        {
            var response = await questionService.SetEnableStatusAsync(request);
            if (response.Success)
            {
                return Results.Ok(response.Data);
            }

            return response.Data is 404 ?
            Results.NotFound(response.Message) :
            Results.UnprocessableEntity(response.Data);
        });

        return group;
    }
}
