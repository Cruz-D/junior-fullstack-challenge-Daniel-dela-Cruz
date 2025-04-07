using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public class GetTaskByIdUseCase : IGetTaskByIdUseCase
{
    private readonly ITaskRepository _taskRepository;

    public GetTaskByIdUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<TaskItem> ExecuteAsync(int id)
    {
        // validate the id
        if (id <= 0)
        {
            throw new ArgumentException("Task ID cannot be zero or negative.");
        }

        try
        {
            // get the task by id
            return await _taskRepository.GetByIdAsync(id);
        }
        catch (Exception ex)
        {
            
            throw new Exception("An error occurred while retrieving the task.", ex);
        }
    }
}
