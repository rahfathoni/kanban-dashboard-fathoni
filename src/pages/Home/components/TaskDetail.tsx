import type { ITask } from "@/types/task"
import UiTag from "@/components/ui/UiTag"
import { teamItems } from "@/constants/options"
import { formatIsoToDate } from "@/utils/index"

interface TaskDetailProps {
  task: ITask
}

export default function TaskDetail({
  task,
}: TaskDetailProps) {
  const getTagData = (tagLabel: string) => {
    return teamItems.find(item => item.label === tagLabel);
  };

  return (
    <div className="bg-white p-5 flex flex-col w-full rounded-lg shadow-custom-sm">
      <h2 className="font-bold text-2xl mb-2">{task.name}</h2>

      <div className="flex flex-col w-full">
        <div className="flex flex-col lg:flex-row w-full gap-5 lg:gap-7 lg:flex-1 mb-5">

          <div className="flex-1">
            <p className="leading-relaxed">{task.description || "No Description"}</p>
          </div>

          <div className="lg:w-1/3 lg:mt-0">
            <h3 className="font-bold">Info</h3>
            <p className="font-normal">Created at: {task.createdAt ? formatIsoToDate(task.createdAt) : " - " }</p>
            <p className="font-normal">Updated at: {task.updatedAt ? formatIsoToDate(task.updatedAt) : " - " }</p>
          </div>
        </div>

        {task && task.team.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {task.team.map((tag, i) => {
              const tagData = getTagData(tag);
              return (
                <UiTag
                  key={i}
                  style={{
                    backgroundColor: tagData?.bgColor || 'black',
                    color: tagData?.color || 'white',
                  }}
                >
                  {tag}
                </UiTag>
              );
            })}
          </div>
        )}

        <p className="text-sm font-medium">Status: {task.status}</p>
      </div>
    </div>
  )
}