'use client';

export function TextViewer() {
  return (
    <div className="w-full h-full bg-white p-6 overflow-auto">
      <div className="prose prose-sm max-w-none">
        <h1 className="text-2xl font-bold mb-4">About My Dayjob Work</h1>

        <p className="mb-4">
          This section contains a personal statement about the dayjob work and projects
          featured on this page.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Projects</h2>

        <ul className="space-y-2">
          <li>
            <strong>Hannibal</strong> - Brand identity and web presence
          </li>
          <li>
            <strong>Fabio Tozzo</strong> - Portfolio website design
          </li>
          <li>
            <strong>Swing</strong> - Creative digital experience
          </li>
          <li>
            <strong>Another Narrative</strong> - Studio website and branding
          </li>
          <li>
            <strong>Brooke Jackson</strong> - Personal portfolio
          </li>
        </ul>

        <p className="mt-6 text-neutral-600 italic">
          [Replace this placeholder content with your personal statement about your dayjob work,
          philosophy, and these specific projects.]
        </p>
      </div>
    </div>
  );
}
