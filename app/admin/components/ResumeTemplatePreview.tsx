'use client';
import { getTemplateById } from './templateMetadata';

interface ResumeTemplatePreviewProps {
  templateId: number;
}

// Mock software engineer resume data for preview
const MOCK_RESUME = {
  name: 'Sarah Johnson',
  headline: 'Senior Software Engineer',
  contact: {
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarahjohnson',
  },
  experience: [
    {
      title: 'Senior Software Engineer at TechCorp',
      dates: '01/2022 – Present',
      bullets: [
        'Led microservices architecture redesign, reducing latency by 40%',
        'Mentored 5 junior engineers, improving team velocity',
        'Implemented automated testing framework, increasing coverage to 85%',
      ],
    },
    {
      title: 'Software Engineer at StartupXYZ',
      dates: '06/2020 – 12/2021',
      bullets: [
        'Built scalable React/Node.js platform serving 100K+ users',
        'Optimized database queries, reducing response time by 60%',
        'Established CI/CD pipeline using GitHub Actions and AWS',
      ],
    },
  ],
  skills: [
    { category: 'Languages', items: 'TypeScript, Python, JavaScript, SQL, Go' },
    { category: 'Frontend', items: 'React, Next.js, TailwindCSS, Redux' },
    { category: 'Backend', items: 'Node.js, PostgreSQL, AWS, Docker, Kubernetes' },
  ],
  education: [
    {
      degree: "Bachelor's in Computer Science",
      institution: 'UC Berkeley',
      year: '2020',
    },
  ],
};

export default function ResumeTemplatePreview({ templateId }: ResumeTemplatePreviewProps) {
  const template = getTemplateById(templateId);

  if (!template) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Template not found</p>
      </div>
    );
  }

  // Get template-specific styling
  const getTemplateStyles = () => {
    switch (templateId) {
      case 1: // Bold Header
        return {
          headerClass: 'border-b-2 border-gray-400 pb-4 mb-4',
          nameSize: 'text-3xl',
          sectionClass: 'mt-6 mb-3 uppercase font-bold text-sm border-b-2 border-gray-400 pb-2',
          margin: 'px-12 py-8',
        };
      case 3: // Minimalist
        return {
          headerClass: 'pb-6 mb-6',
          nameSize: 'text-4xl',
          sectionClass: 'mt-8 mb-4 text-sm font-semibold border-t border-gray-300 border-b border-gray-300 py-2',
          margin: 'px-16 py-10',
        };
      case 6: // Executive Minimal
        return {
          headerClass: 'pb-8 mb-8',
          nameSize: 'text-4xl tracking-tight',
          sectionClass: 'mt-10 mb-5 text-sm font-semibold border-t border-gray-300 pt-4',
          margin: 'px-20 py-12',
        };
      case 8: // Premium Timeline
        return {
          headerClass: 'pb-6 mb-6',
          nameSize: 'text-3xl',
          sectionClass: 'mt-8 mb-4 text-sm font-semibold border-b border-gray-300 pb-2',
          margin: 'px-12 py-8',
        };
      case 10: // Ultra Clean ATS+
        return {
          headerClass: 'pb-3 mb-4',
          nameSize: 'text-2xl',
          sectionClass: 'mt-5 mb-3 text-xs font-bold uppercase',
          margin: 'px-10 py-6',
        };
      default:
        return {
          headerClass: 'pb-4 mb-4',
          nameSize: 'text-3xl',
          sectionClass: 'mt-6 mb-3 font-bold text-sm',
          margin: 'px-12 py-8',
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className="w-full max-w-3xl mx-auto bg-white">
      {/* A4 Preview Container */}
      <div className={`bg-white text-gray-800 ${styles.margin} space-y-4 text-sm leading-relaxed`}>
        {/* Header */}
        <div className={styles.headerClass}>
          <h1 className={`${styles.nameSize} font-bold text-gray-900 mb-1`}>
            {MOCK_RESUME.name}
          </h1>
          <p className="text-gray-600 text-sm mb-3">{MOCK_RESUME.headline}</p>
          <p className="text-gray-600 text-xs">
            {MOCK_RESUME.contact.location} • {MOCK_RESUME.contact.phone} • {MOCK_RESUME.contact.email}
          </p>
        </div>

        {/* Professional Summary Section (simulated) */}
        <div>
          <div className={styles.sectionClass}>Professional Summary</div>
          <p className="text-gray-700 text-xs leading-relaxed">
            Experienced software engineer with 5+ years building scalable systems. Expertise in full-stack development,
            cloud infrastructure, and team leadership.
          </p>
        </div>

        {/* Experience */}
        <div>
          <div className={styles.sectionClass}>Experience</div>
          <div className="space-y-4">
            {MOCK_RESUME.experience.map((job, idx) => (
              <div key={idx}>
                <div className="font-semibold text-gray-900 text-xs">
                  {job.title.split(' at ')[0]}
                </div>
                <div className="text-gray-600 text-xs mb-2">
                  {job.title.split(' at ')[1]} • {job.dates}
                </div>
                <ul className="space-y-1 ml-4">
                  {job.bullets.slice(0, 2).map((bullet, bIdx) => (
                    <li key={bIdx} className="text-gray-700 text-xs flex">
                      <span className="mr-2">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className={styles.sectionClass}>Skills</div>
          <div className="space-y-2">
            {MOCK_RESUME.skills.map((skill, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-semibold text-gray-900">{skill.category}:</span>
                <span className="text-gray-700 ml-2">{skill.items}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div className={styles.sectionClass}>Education</div>
          <div className="text-xs">
            <div className="font-semibold text-gray-900">
              {MOCK_RESUME.education[0].degree}
            </div>
            <div className="text-gray-600">
              {MOCK_RESUME.education[0].institution} • {MOCK_RESUME.education[0].year}
            </div>
          </div>
        </div>
      </div>

      {/* Template Info Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 bg-gray-50 px-12 py-6 text-center">
        <div className="text-sm font-semibold text-gray-800 mb-1">
          {template.label}
        </div>
        <p className="text-xs text-gray-600">{template.description}</p>
      </div>
    </div>
  );
}
