import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { type QuestionType } from "types/survey";
import { cn } from "@/lib/utils";

interface QuestionOptionProps {
  option: {
    id?: string | null;
    optionId?: string | null | number;
    text: string;
  };
  index: number;
  selectedOptions: string[];
  type?: QuestionType;
  handleOptionChange: (optionId: string) => void;
  onOptionChange?: (optionId: string, value: string) => void;
}

export function QuestionOption({
  option,
  index,
  selectedOptions,
  type = "single",
  handleOptionChange,
}: QuestionOptionProps) {
  if (!option.optionId) return null;

  const optionId = option.optionId.toString();

  const rankingNumber =
    type === "ranking" ? selectedOptions.indexOf(optionId) + 1 : null;
  const isRanked = rankingNumber !== null && rankingNumber !== 0;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, x: 20 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.3,
            delay: index * 0.1,
          },
        },
      }}
      className="w-full"
    >
      <Label
        htmlFor={optionId}
        className={`flex cursor-pointer items-center space-x-3 rounded-xl border-2 p-4 transition-all duration-200 ease-in-out ${
          selectedOptions.includes(optionId)
            ? "border-purple-500 bg-purple-50"
            : "border-gray-200 hover:border-purple-200 hover:bg-purple-50/50"
        }`}
      >
        {type === "single" && (
          <RadioGroupItem
            value={optionId}
            id={optionId}
            className="border-purple-300 text-purple-600"
          />
        )}
        {type === "multiple" && (
          <Checkbox
            id={optionId}
            checked={selectedOptions.includes(optionId)}
            onCheckedChange={() => handleOptionChange(optionId)}
            className="border-purple-300 text-purple-600"
          />
        )}
        {type === "ranking" && (
          <div className="flex items-center space-x-3">
            <Checkbox
              id={optionId}
              checked={selectedOptions.includes(optionId)}
              onCheckedChange={() => handleOptionChange(optionId)}
              className="border-purple-300 text-purple-600"
              hidden={true}
            />
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                isRanked
                  ? "bg-purple-500 text-white"
                  : "bg-purple-100 text-purple-600",
              )}
            >
              {!isRanked ? (
                <span className="relative -top-[1px]">+</span>
              ) : (
                rankingNumber
              )}
            </div>
          </div>
        )}
        <span className="text-sm font-medium text-gray-700">{option.text}</span>
      </Label>
    </motion.div>
  );
}
