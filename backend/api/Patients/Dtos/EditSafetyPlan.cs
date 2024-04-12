namespace api.Patients.Dtos;
public record EditSafetyPlan(int PatientId,
                             string WarningSigns,
                             string Distractions,
                             string ReasonsForLiving,
                             string SituationFever,
                             string ProfessionalSupport);