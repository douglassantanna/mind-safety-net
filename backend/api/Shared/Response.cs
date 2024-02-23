namespace api.Shared;
public record Response(string Message, bool Success = true, object Data = null);
