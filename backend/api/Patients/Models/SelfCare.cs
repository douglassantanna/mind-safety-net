using api.Shared;

namespace api.Patients.Models;
public class SelfCare : Entity
{
    public void Update(string positivePoints, string pointsToImprove, string strategies)
    {
        PositivePoints = positivePoints;
        PointsToImprove = pointsToImprove;
        Strategies = strategies;
    }

    public string PositivePoints { get; set; } = string.Empty;
    public string PointsToImprove { get; set; } = string.Empty;
    public string Strategies { get; set; } = string.Empty;
    public string PatientEmail { get; set; } = string.Empty;
    public int PatientId { get; set; }
    public Patient Patient { get; set; } = null!;
}
