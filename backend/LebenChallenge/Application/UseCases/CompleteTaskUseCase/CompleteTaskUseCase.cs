using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public class CompleteTaskUseCase : ICompleteTaskUseCase
{
    private readonly ITaskRepository _taskRepository;

    public CompleteTaskUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<TaskItem> ExecuteAsync(CompleteTaskDTO taskToComplete)
    {
        // get task using id
        var task = await _taskRepository.GetByIdAsync(taskToComplete.Id);

        if (task == null)
        {
            throw new Exception("Task not found");
        }

        // get task using id and bool true for complete the task
        return await _taskRepository.UpdateAsync(task, true);
    }
}
