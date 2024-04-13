namespace api.Patients.Dtos;
public record EditSafetyPlan(string WarningSigns,
                             string Distractions,
                             string ReasonsForLiving,
                             string SituationFever,
                             string ProfessionalSupport);