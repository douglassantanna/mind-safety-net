using api.Patients.Models;

namespace api.Patients.Dtos;
public record ViewQuestions(int Id, string Description, IEnumerable<ViewAnswer> Answers);
public record ViewAnswer(int Id, string Description, int Value);
public record ViewPatientDTO(int Id,
                             string FullName,
                             string Email,
                             DateTime DateSubmittedForm,
                             Priority Priority,
                             bool IsScheduled,
                             DateTime Appointment);
public record ViewPatientProfileDTO(int Id,
                                    string FullName,
                                    string PhoneNumber,
                                    string Email,
                                    DateTime DateSubmittedForm,
                                    Priority Priority,
                                    bool IsScheduled,
                                    DateTime Appointment,
                                    IEnumerable<ViewQuestions> Questions,
                                    ViewSafetyPlan SafetyPlan);
public record CreateQuestionsDTO(int QuestionId, int AnswerId, int AnswerValue);

public record ViewSafetyPlan(int SafetyPlanId,
                             string WarningSigns,
                             string Distractions,
                             string ReasonsForLiving,
                             string SituationFever,
                             string ProfessionalSupport);

public record ViewSelfCare(int SafetyPlanId,
                           string PositivePoints,
                           string PointsToImprove,
                           string Strategies);