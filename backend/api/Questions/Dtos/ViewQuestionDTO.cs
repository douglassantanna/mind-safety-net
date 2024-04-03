namespace api.Questions.Dtos;
public record ViewQuestionDTO(int Id, string Description, IEnumerable<ViewAnswerDTO> Answers);
public record ViewAnswerDTO(int Id, string Description, int Value);