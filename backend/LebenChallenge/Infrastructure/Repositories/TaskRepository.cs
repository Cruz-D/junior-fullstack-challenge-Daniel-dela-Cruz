using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;
using LebenChallenge.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LebenChallenge.Infrastructure.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly InMemoryDbContext _context;

    public TaskRepository(InMemoryDbContext inMemoryDbContext)
    {
        _context = inMemoryDbContext;
    }

    public async Task<TaskItem> AddAsync(TaskItem task)
    {
        TaskItem taskItem = new TaskItem(task.Name, task.Description, task.DueDate, task?.Priority);
        _context.Tasks.Add(taskItem);

        await _context.SaveChangesAsync();

        return taskItem;
    }

    public Task DeleteAsync(int id)
    {
        TaskItem taskItem = _context.Tasks.FirstOrDefault(t => t.Id == id);

        if (taskItem != null) 
        {
            _context.Tasks.Remove(taskItem);
            return _context.SaveChangesAsync();
        }
        else
        {
            throw new Exception("Task not found");
        }
    }

    public async Task<IEnumerable<TaskItem>> GetAllAsync()
    {
        return await _context.Tasks.ToListAsync();
    }

    public Task<TaskItem> GetByIdAsync(int id)
    {
        TaskItem taskItem = _context.Tasks.FirstOrDefault(t => t.Id == id);

        if (taskItem == null)
        {
            throw new Exception("Task not found");
        }
        else
        {
            return Task.FromResult(taskItem);
        }
    }

    public async Task<TaskItem> UpdateAsync(TaskItem task, bool? isCompleted, int? priority)
    {
        //get the task to update
        var taskItem = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == task.Id);

        if (taskItem == null)
        {
            throw new Exception("Task not found");
        }

        try
        {
            // check the boolean value to update the task
            if (isCompleted.HasValue || isCompleted == false)
            {
                taskItem.MarkAsCompleted();
            }
            // check the priority value to update the task
            if (priority.HasValue)
            {
                taskItem.SetPriority((TaskItem.priorityRange)priority);
            }

            //update the task
            _context.Tasks.Update(taskItem);

            await _context.SaveChangesAsync();

            return taskItem;
        }
        catch (Exception ex)
        {
            throw new Exception("An error occurred while updating the task", ex);
        }
    }

}
