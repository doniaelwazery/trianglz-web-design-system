// Step 6 test screen: Figma "add New Project" (Testing - Design System Handoff, node 2:570).
// The page content uses only Trianglz components and tokens; the ensido chrome lives in AppShell.
import { Button, Input, Textarea, UploadField } from '../../components';
import { AppShell } from './AppShell';

export function AddNewProject() {
  return (
    <AppShell>
      <div className="flex flex-col items-start py-3 px-6">
        <Button variant="link" size="xs" iconPosition="left" icon="chevron-left" onClick={() => history.back()}>
          Back to Projects
        </Button>
        <h1 className="text-2xl leading-3xl font-semibold text-primary">Add New Project</h1>
      </div>

      <form id="add-project" className="px-6" onSubmit={e => e.preventDefault()}>
        <div className="flex flex-col gap-4 rounded-lg bg-primary p-6 shadow-sm">
          <UploadField label="Logo" optional hint="Accepted Formats: JPG or PNG, Max file size 5 MB" accept="image/png,image/jpeg" />
          <div className="flex gap-4">
            <Input label="Title" name="title" placeholder="Enter the title" />
            <Input label="Timeline" name="timeline" placeholder="Select the duration dates" />
          </div>
          <Textarea label="Description" optional name="description" placeholder="Enter the description..." rows={6} />
        </div>
      </form>

      <div className="flex justify-end gap-2 p-6">
        <Button variant="outline" size="sm" onClick={() => history.back()}>
          Cancel
        </Button>
        <Button size="sm" type="submit" form="add-project">
          Save
        </Button>
      </div>
    </AppShell>
  );
}
