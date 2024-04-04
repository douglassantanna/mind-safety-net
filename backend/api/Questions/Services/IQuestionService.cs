using api.Data;
using api.Questions.Dtos;
using api.Questions.Models;
using api.Shared;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace api.Questions.Services;
public interface IQuestionService
{
    Task<Response> CreateAsync(CreateQuestionRequest request);
    Task<IEnumerable<ViewQuestionDTO>> ListAsync();
}
public class QuestionService(
    DataContext context,
    IValidator<CreateQuestionRequest> createQuestionvalidator) : IQuestionService
{
    private readonly DataContext _context = context;
    private readonly IValidator<CreateQuestionRequest> _createQuestionvalidator = createQuestionvalidator;

    public async Task<Response> CreateAsync(CreateQuestionRequest request)
    {
        var validationResult = await _createQuestionvalidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage);
            return new Response("", false, errors);
        }

        var newQuestion = new Question(request.Description, request.Answers);
        try
        {
            _context.Questions.Add(newQuestion);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {0}", ex.Message);
        }
        return new Response("", true, newQuestion.Id);
    }

    public async Task<IEnumerable<ViewQuestionDTO>> ListAsync()
    {
        IEnumerable<ViewQuestionDTO> questions = [];
        try
        {
            questions = await _context.Questions
                                          .Select(q => new ViewQuestionDTO(
                                              q.Id,
                                              q.Description,
                                              q.Enabled,
                                              q.Answers.Select(a => new ViewAnswerDTO(a.Id, a.Description, a.Value))
                                          ))
                                          .ToListAsync();

        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {0}", ex.Message);
        }
        return questions;
    }
}