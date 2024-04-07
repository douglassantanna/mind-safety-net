using api.Patients.Models;

namespace api.Patients.Dtos;
public record ViewQuestions(int Id, string Description, IEnumerable<ViewAnswer> Answers);
public record ViewAnswer(int Id, string Description, int Value);
public record ViewPatientDTO(int Id, string FullName, string Email, DateTime DateSubmittedForm, Priority Priority);
public record ViewPatientProfileDTO(int Id,
                                    string FullName,
                                    string PhoneNumber,
                                    string Email,
                                    DateTime DateSubmittedForm,
                                    Priority Priority,
                                    IEnumerable<ViewQuestions> Questions);
public record CreateQuestionsDTO(int QuestionId, int AnswerId, int AnswerValue);