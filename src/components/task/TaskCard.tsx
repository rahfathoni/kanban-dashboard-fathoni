import { UiTag } from "@/components/ui/index"
import { teamItems } from "@/constants/options"
import { Link } from "react-router-dom";

interface TaskCardProps {
  id: string | number
  name: string
  description: string
  team: string[]
  createdAt: string
  updatedAt: string
}

export default function TaskCard ({ 
  id,
  name,
  description = "", 
  team = [], 
}: TaskCardProps) {
  const getTagData = (tagLabel: string) => {
    return teamItems.find(item => item.label === tagLabel);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-custom-sm mb-4 transition-colors duration-200">
      <h3 className="font-bold text-lg mb-1 cursor-pointer hover:underline hover:text-primary transition-colors duration-200">
        <Link to={`/task/${id}`}>{name}</Link>
      </h3>
      {description && <p className="text-sm text-secondary line-clamp-2 mb-5">{description}</p>}
      {team && (
        <div className="flex flex-wrap gap-2">
          {team.map((tag, i) => {
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
    </div>
  )
}
