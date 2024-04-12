using api.Shared;

namespace api.Patients.Models;
public class SafetyPlan : Entity
{
    public string WarningSigns { get; set; } = string.Empty;
    public string Distractions { get; set; } = string.Empty;
    public string ReasonsForLiving { get; set; } = string.Empty;
    public string SituationFever { get; set; } = string.Empty;
    public string ProfessionalSupport { get; set; } = string.Empty;
    public int PatientId { get; set; }
    public Patient Patient { get; set; }
}
