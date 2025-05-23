using LebenChallenge.Domain;

namespace LebenChallenge.Application.Interfaces;

public interface ITaskRepository
{
    Task<TaskItem> AddAsync(TaskItem task);
    Task<TaskItem> GetByIdAsync(int id);
    Task<IEnumerable<TaskItem>> GetAllAsync();
    Task<TaskItem> UpdateAsync(TaskItem task, bool? isCompleted, int? priority = 1);
    Task DeleteAsync(int id);
}
