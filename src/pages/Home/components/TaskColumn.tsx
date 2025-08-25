import TaskCard from "./TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: {
    id: string | number
    name: string
    description: string
    team: string[]
    createdAt: string
    updatedAt: string
  }[];
}

export default function TaskColumn({ 
  title, 
  tasks,
}: TaskColumnProps) {
  return (
    <div className="flex-1 rounded-md">
      <h3 className="font-bold text-xs mb-4 text-secondary">{title}</h3>
      {tasks.map((task, i) => (
        <TaskCard key={i} {...task} />
      ))}
    </div>
  );
}
