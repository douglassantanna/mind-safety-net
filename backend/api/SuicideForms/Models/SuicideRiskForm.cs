using api.Patients.Models;
using api.Shared;

namespace api.SuicideForms.Models;
public class SuicideRiskForm : Entity
{
    public int PatientId { get; set; }
    public Patient Patient { get; set; } = null!;
    public DateTime DateSubmitted { get; set; }
    public Priority Priority { get; set; }
    public BaseForm BaseForm { get; set; } = null!;
    public int BaseFormId { get; set; }
}
