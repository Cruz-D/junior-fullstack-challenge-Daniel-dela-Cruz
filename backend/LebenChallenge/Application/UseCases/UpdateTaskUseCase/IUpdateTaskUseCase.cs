using LebenChallenge.Application.DTO;
using LebenChallenge.Domain;
namespace LebenChallenge.Application.UseCases
{
    public interface IUpdateTaskUseCase
    {
        Task<TaskItem> ExecuteAsync(UpdateTaskDTO taskToUpdate, int id);
    }
}
