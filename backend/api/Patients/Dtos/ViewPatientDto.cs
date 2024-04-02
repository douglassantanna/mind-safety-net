using api.Patients.Models;

namespace api.Patients.Dtos;
public record ViewQuestions(int Id, string Description, List<ViewAnswer> Answers);
public record ViewAnswer(int Id, string Description, int Value);
public record ViewPatientDTO(string FullName, string Email, DateTime DateSubmittedForm, Priority Priority);