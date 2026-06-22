import ProjectThumb from './ProjectThumb';

export interface Project {
  slug: string;
  title: string;
  status: 'completed' | 'progress' | 'planned';
  order: number;
  summary: string;
  domain: string;
  role: string;
  methods: string[];
  tools: string[];
  keyMetric: string;
  thumb: string;
  github?: string;
  demo?: string;
}

const STATUS_LABEL: Record<Project['status'], string> = {
  completed: 'Completed',
  progress: 'In Progress',
  planned: 'Planned',
};

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, title, status, order, summary, domain, role, methods, tools, keyMetric, thumb, github, demo } = project;

  return (
    <article className="proj-card" data-status={status}>
      <div className="proj-thumb">
        <span className="proj-thumb-label mono">CASE {String(order).padStart(2, '0')} · {thumb}</span>
        <span className={`status-pill status-${status} mono`}>{STATUS_LABEL[status]}</span>
        <ProjectThumb thumb={thumb} />
      </div>
      <div className="proj-body">
        <h3 className="proj-title">{title}</h3>
        <p className="proj-problem">{summary}</p>
        <dl className="proj-meta">
          <dt>Domain</dt><dd>{domain}</dd>
          <dt>Role</dt><dd>{role}</dd>
          <dt>Methods</dt><dd>{methods.join(' · ')}</dd>
          <dt>Tools</dt><dd>{tools.join(', ')}</dd>
          <dt>Key Metric</dt><dd>{keyMetric}</dd>
        </dl>
        <div className="proj-footer">
          <div className="proj-links">
            <a className="proj-expand mono" href={`/projects/${slug}`}>Case Study 보기 <span className="arrow">→</span></a>
            {github && <a className="proj-link mono" href={github} target="_blank" rel="noopener">GitHub ↗</a>}
            {demo && <a className="proj-link mono" href={demo} target="_blank" rel="noopener">Demo ↗</a>}
          </div>
        </div>
      </div>
    </article>
  );
}
