using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases
{
    public class UpdateTaskUseCase : IUpdateTaskUseCase
    {
        private readonly ITaskRepository _taskRepository;

        public UpdateTaskUseCase(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<TaskItem> ExecuteAsync(UpdateTaskDTO taskToUpdate, int id)
        {
            // Validate the input
            if (id != 0)
            {
                try
                {
                    // get task using id
                    var task = await _taskRepository.GetByIdAsync(id);

                    if (task != null)
                    {
                        // update the values for a task and send to de interface methods to save
                        task.Update(taskToUpdate.Name, taskToUpdate.Description, taskToUpdate.DueDate);

                        //send the task to the repository
                        await _taskRepository.UpdateAsync(task, null, null);

                        return task;
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("Task not found", ex);
                }
            }
            return null;
        }

    }

}
