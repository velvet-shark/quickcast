import { CommandPageTemplate, CommandPageTemplateProps } from "./CommandPageTemplate";
import { commandCustomizations } from "@/app/lib/command-customizations";
import path from "path";

interface CommandPageTemplateWithCustomizationsProps extends Omit<CommandPageTemplateProps, "examples" | "runCommand"> {
  commandPath: string;
}

export function CommandPageTemplateWithCustomizations({
  commandPath,
  ...props
}: CommandPageTemplateWithCustomizationsProps) {
  // Get customizations for this command
  const customization = commandCustomizations[commandPath];
  
  return (
    <CommandPageTemplate
      {...props}
      examples={customization?.examples}
      runCommand={customization?.runCommand}
    />
  );
}