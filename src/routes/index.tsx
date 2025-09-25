import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
