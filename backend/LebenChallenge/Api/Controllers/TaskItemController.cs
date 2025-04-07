using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;
using LebenChallenge.Application.UseCases;
using LebenChallenge.Domain;
using Microsoft.AspNetCore.Mvc;

namespace LebenChallenge.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TaskItemController : ControllerBase
{
    private readonly ICreateTaskUseCase _createTaskUseCase;
    private readonly IGetAllTasksUseCase _getAllTasksUseCase;
    private readonly ICompleteTaskUseCase _completeTaskUseCase;
    private readonly IGetTaskByIdUseCase _getTaskByIdUseCase;
    private readonly IDeleteTaskUseCase _deleteTaskUseCase;

    public TaskItemController(
        ICreateTaskUseCase createTaskUseCase,
        ICompleteTaskUseCase completeTaskUseCase,
        IGetAllTasksUseCase getAllTasksUseCase,
        IGetTaskByIdUseCase getTaskByIdUseCase,
        IDeleteTaskUseCase deleteTaskUseCase

    )
    {
        _createTaskUseCase = createTaskUseCase;
        _completeTaskUseCase = completeTaskUseCase;
        _getAllTasksUseCase = getAllTasksUseCase;
        _getTaskByIdUseCase = getTaskByIdUseCase;
        _deleteTaskUseCase = deleteTaskUseCase;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tasks = await _getAllTasksUseCase.ExecuteAsync();
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        // validate the id
        if (id <= 0)
        {
            return BadRequest("Invalid task ID");
        }

        try
        {
            // get the task by id param
            var task = await _getTaskByIdUseCase.ExecuteAsync(id);

            // verify the task exists
            if (task == null)
            {
                return NotFound("Task not found");
            }

            // if all was ok, retun it
            return Ok(task);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while retrieving the task: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTaskDTO dto)
    {
        TaskItem newTaskItem = await _createTaskUseCase.ExecuteAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = newTaskItem.Id }, newTaskItem);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        // check the id param
        if (id <= 0)
        {
            return BadRequest("Task ID cannot be zero or negative.");
        }

        try
        {
            // send id to the use case to delete the task
            var taskToDelete = await _getTaskByIdUseCase.ExecuteAsync(id);

            // check if the task exists
            if (taskToDelete == null)
            {
                return NotFound("Task not found");
            }

            // delete the task using the use case
            await _deleteTaskUseCase.ExecuteAsync(new DeleteTaskDTO { Id = taskToDelete.Id });

            // return no content for successful deletion
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting the task: {ex.Message}");
        }
    }


    [HttpPut("{id}/complete")]
    public async Task<IActionResult> Complete(int id)
    {
        // check the id param
        if (id <= 0)
        {
            return BadRequest("Task ID cannot be zero or negative.");
        }
        
        try
        {
            // get the task by id to complete by id param
            var taskToComplete = await _completeTaskUseCase.ExecuteAsync(new CompleteTaskDTO { Id = id });

            // check if the task exists
            if (taskToComplete == null)
            {
                return NotFound("Task not found");
            }
            else
            {
                // check if the task is already completed
                return Ok(taskToComplete);

            }
        }
        catch (Exception ex)
        {

            throw new Exception("An error occurred while completing the task.", ex);
        }
        
    }
}
