export function getCommandMetadata(command: string) {
  const formattedCommand = command.replace(/-/, " ");

  return {
    title: `${formattedCommand} | quickcast.dev`,
    description: `Learn how to use the '${formattedCommand}' command from Foundry's CLI toolkit. Examples, documentation and usage.`
  };
}
