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
  date?: string;
  thumb: string;
  image?: string;
  thumbImage?: string;
  github?: string;
  demo?: string;
}

const STATUS_LABEL: Record<Project['status'], string> = {
  completed: 'Completed',
  progress: 'In Progress',
  planned: 'Planned',
};

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, title, status, order, summary, domain, keyMetric, date, thumb, image, thumbImage, github } = project;
  const cardImage = thumbImage ?? image;

  return (
    <article className="proj-card" data-status={status}>
      <div className="proj-thumb">
        <span className="proj-thumb-label mono">CASE {String(order).padStart(2, '0')} · {domain}</span>
        <span className={`status-pill status-${status} mono`}>{STATUS_LABEL[status]}</span>
        {cardImage ? <img className="proj-thumb-img" src={cardImage} alt={`${title} 썸네일`} loading="lazy" /> : <ProjectThumb thumb={thumb} />}
      </div>
      <div className="proj-body">
        <h3 className="proj-title">{title}</h3>
        <p className="proj-metric mono">{keyMetric}</p>
        <p className="proj-problem">{summary}</p>
        <div className="proj-footer">
          <div className="proj-links">
            <a className="proj-expand mono" href={`/projects/${slug}`}>Case Study 보기 <span className="arrow">→</span></a>
            {github && <a className="proj-link mono" href={github} target="_blank" rel="noopener">GitHub ↗</a>}
          </div>
          {date && <span className="proj-date mono">{date}</span>}
        </div>
      </div>
    </article>
  );
}
