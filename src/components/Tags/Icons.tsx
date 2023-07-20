import { useAppDispatch } from "@/app/hooks";
import { addHeading } from "@/app/reducer/editor";
import { GripVertical, Wrench, Plus } from "lucide-react";

type SettingsProps = {
  show: boolean;
};

function ShowIconsLeft({ show }: SettingsProps) {
  const dispatch = useAppDispatch();
  if (!show) return <p className="mx-7" />;
  return (
    <div className="flex items-center">
      <Plus
        size={20}
        className="mr-2 cursor-pointer"
        onClick={() => {
          dispatch(
            addHeading({
              variant: "h3",
              placeholder: "placeholder text",
            })
          );
        }}
      />
      <GripVertical size={20} className="mr-2" />
    </div>
  );
}

function ShowIconsRight({ show }: Omit<SettingsProps, "dispatch">) {
  if (!show) return <span className="mx-4" />;
  return <Wrench className="ml-[0.6rem]" />;
}

export { ShowIconsLeft, ShowIconsRight };
