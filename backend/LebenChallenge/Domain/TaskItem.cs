namespace LebenChallenge.Domain
{
    public class TaskItem
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public int? Priority { get; private set; } 
        public DateTime DueDate { get; private set; }
        public bool IsCompleted { get; private set; }

        public TaskItem()
        {
            
        }

        // enum for priority levels
        public enum priorityRange
        {
            Low = 1,
            Medium = 2,
            High = 3,
            Urgent = 4,
            Critical = 5
        }

        public TaskItem(string name, string description, DateTime dueDate, int? priority)
        {
            Name = name;
            Description = description;
            DueDate = dueDate;
            Priority = priority;
            IsCompleted = false;
        }

        // methods to update task properties
        public void Update(string? name, string? description, DateTime? dueDate)
        {
            if (!string.IsNullOrEmpty(name))
            {
                Name = name;
            }

            if (!string.IsNullOrEmpty(description))
            {
                Description = description;
            }

            if (dueDate.HasValue)
            {
                DueDate = dueDate.Value;
            }
        }

        public void MarkAsCompleted()
        {
            IsCompleted = true;
        }

        // method to set priority using the enum
        public void SetPriority(priorityRange? priority)
        {
            if (priority != null)
            {
                // check it is a valid enum value
                Priority = (int)priority;
            }
            else
            {
                throw new ArgumentException("Priority must be a valid enum value.");
            }
        }
    }
}
