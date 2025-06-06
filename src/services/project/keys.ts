export const projectInfoKey = (id: number) =>
  ['project', 'projectInfo', id] as const;

export const newProjectKey = () => ['project', 'newProject'] as const;

export const deleteProjectKey = (id: number) =>
  ['project', 'deleteProject', id] as const;
