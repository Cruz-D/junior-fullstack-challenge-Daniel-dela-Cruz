using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public class SetPriorityUseCase : ISetPriorityUseCase
{
    private readonly ITaskRepository _taskRepository;

    public SetPriorityUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<TaskItem> ExecuteAsync(PriorityTaskDTO taskToSetPriority, int id)
    {
        try
        {
            // get the task by id
            var task = await _taskRepository.GetByIdAsync(id);

            if (task == null)
            {
                throw new Exception("Task not found");
            }

            // sends task and priority number to update de pirority status
            return await _taskRepository.UpdateAsync(task, null, taskToSetPriority.priority);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error setting priority: {ex.Message}");

        }
    }
}


