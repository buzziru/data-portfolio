import { useState } from 'react';
import ProjectCard, { type Project } from './ProjectCard';

type Filter = 'all' | 'completed' | 'progress' | 'planned';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'all' },
  { key: 'completed', label: 'completed' },
  { key: 'progress', label: 'in progress' },
  { key: 'planned', label: 'planned' },
];

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>('all');

  const visible = projects.filter((p) => filter === 'all' || p.status === filter);
  const count =
    filter === 'all'
      ? `${visible.length} entries · last sync 2026.07`
      : `${visible.length} entries · filter: ${filter}`;

  return (
    <>
      <div className="proj-toolbar">
        <div className="proj-filter">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={filter === f.key ? 'active' : undefined}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="proj-count mono">{count}</div>
      </div>

      <div className="proj-grid">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
