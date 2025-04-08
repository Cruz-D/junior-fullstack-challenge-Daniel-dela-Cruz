using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public class CreateTaskUseCase : ICreateTaskUseCase
{
    private readonly ITaskRepository _taskRepository;

    public CreateTaskUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<TaskItem> ExecuteAsync(CreateTaskDTO taskToCreate)
    {
        var task = new TaskItem(taskToCreate.Name, taskToCreate.Description, taskToCreate.DueDate, null);
        return await _taskRepository.AddAsync(task);
    }
}
