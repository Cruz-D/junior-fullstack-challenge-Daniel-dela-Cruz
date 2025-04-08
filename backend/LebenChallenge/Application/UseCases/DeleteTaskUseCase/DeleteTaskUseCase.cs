using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;

namespace LebenChallenge.Application.UseCases;

public class DeleteTaskUseCase : IDeleteTaskUseCase
{
    private readonly ITaskRepository _taskRepository;

    public DeleteTaskUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public Task ExecuteAsync(DeleteTaskDTO taskToDelete)
    {
        //sends the task to delete to the repository
        return _taskRepository.DeleteAsync(taskToDelete.Id);
        
    }
}
