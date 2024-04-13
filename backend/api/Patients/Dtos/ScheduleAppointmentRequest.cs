namespace api.Patients.Dtos;
public record ScheduleAppointmentRequest(int ChoosenDay,
                                         int ChoosenMonth,
                                         int ChoosenYear,
                                         int ChoosenHour,
                                         int ChoosenMinute);
