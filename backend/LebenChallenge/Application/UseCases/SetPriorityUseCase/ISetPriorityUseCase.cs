using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public interface ISetPriorityUseCase
{
    
    Task<TaskItem> ExecuteAsync(PriorityTaskDTO taskToSetPriority, int priority);
}
