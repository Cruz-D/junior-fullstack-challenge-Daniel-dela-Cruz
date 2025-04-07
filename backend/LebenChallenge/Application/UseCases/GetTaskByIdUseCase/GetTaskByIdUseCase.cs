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

    public Task<TaskItem> ExecuteAsync(int id)
    {

        if (id <= 0)
        {
            throw new ArgumentException("Task ID cannot be zero.");
        }
        else
        {
            try
            {
                return _taskRepository.GetByIdAsync(id);
            }
            catch (Exception ex)
            {
                // Log the exception
                throw new Exception("An error occurred while retrieving the task.", ex);

            }
        }

    }
}
