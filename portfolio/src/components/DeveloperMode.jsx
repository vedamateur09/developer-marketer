import { motion } from 'framer-motion'
import { Mail, ExternalLink } from 'lucide-react'
import TerminalHero from './TerminalHero'
import ArchitectureDiagram from './ArchitectureDiagram'
import PostHogWidget from './PostHogWidget'

/* ─── Use Case Cards ─── */
const USE_CASES = [
  {
    filename: 'use_case_01.py',
    title: 'LLM-Powered SEO Intelligence',
    tags: ['LLM', 'Python', 'SEO Analytics', 'NLP'],
    code: [
      { type: 'comment', text: '# Market Research Engagement' },
      { type: 'blank' },
      { type: 'line', parts: [
        { type: 'var', text: 'input' }, { type: 'op', text: '  = ' },
        { type: 'string', text: '"unstructured_market_data + competitor_content"' },
      ]},
      { type: 'line', parts: [
        { type: 'var', text: 'model' }, { type: 'op', text: '  = ' },
        { type: 'string', text: '"LLM (extraction + clustering)"' },
      ]},
      { type: 'line', parts: [
        { type: 'var', text: 'output' }, { type: 'op', text: ' = ' },
        { type: 'string', text: '"keyword_clusters[], content_gap_report"' },
      ]},
      { type: 'blank' },
      { type: 'comment', text: '# Surfaced [X] opportunities across [Y] categories' },
    ],
  },
  {
    filename: 'use_case_02.sql',
    title: 'Behavioural Micro-Segmentation',
    tags: ['Analytics', 'Segmentation', 'SQL', 'GA4'],
    code: [
      { type: 'comment', text: '-- Analytics → Cohort Definition' },
      { type: 'line', parts: [
        { type: 'keyword', text: 'SELECT ' },
        { type: 'prop', text: 'user_id, behaviour_cluster, engagement_score' },
      ]},
      { type: 'line', parts: [
        { type: 'keyword', text: 'FROM ' },
        { type: 'fn', text: 'analytics_events' },
      ]},
      { type: 'line', parts: [
        { type: 'keyword', text: 'WHERE ' },
        { type: 'prop', text: 'session_depth ' },
        { type: 'op', text: '> ' },
        { type: 'var', text: 'threshold' },
      ]},
      { type: 'line', parts: [
        { type: 'keyword', text: 'GROUP BY ' },
        { type: 'prop', text: 'micro_segment' },
      ]},
      { type: 'blank' },
      { type: 'comment', text: '-- Output: actionable cohorts for campaign targeting' },
    ],
  },
  {
    filename: 'use_case_03.yaml',
    title: 'Lead Management Architecture',
    tags: ['SFMC', 'Lead Scoring', 'CRM', 'Process Design'],
    code: [
      { type: 'comment', text: '# Lead Flow Redesign' },
      { type: 'line', parts: [
        { type: 'prop', text: 'source' }, { type: 'op', text: ':    ' },
        { type: 'string', text: 'inbound_form | paid_campaign | organic' },
      ]},
      { type: 'line', parts: [
        { type: 'prop', text: 'scoring' }, { type: 'op', text: ':   ' },
        { type: 'value', text: 'firmographic_weight + behavioural_weight' },
      ]},
      { type: 'line', parts: [
        { type: 'prop', text: 'routing' }, { type: 'op', text: ':   ' },
      ]},
      { type: 'line', parts: [
        { type: 'op', text: '  if score > 80  → ' },
        { type: 'fn', text: 'sales_qualified' },
      ]},
      { type: 'line', parts: [
        { type: 'op', text: '  if score 40-80 → ' },
        { type: 'fn', text: 'nurture_sequence(SFMC)' },
      ]},
      { type: 'line', parts: [
        { type: 'op', text: '  if score < 40  → ' },
        { type: 'fn', text: 're-engagement_flow' },
      ]},
    ],
  },
]

function CodeLine({ parts }) {
  return (
    <div>
      {parts.map((part, i) => (
        <span key={i} className={`token-${part.type}`}>{part.text}</span>
      ))}
    </div>
  )
}

function CodeCard({ filename, title, tags, code }) {
  return (
    <div className="dev-code-card flex flex-col">
      <div className="file-tab font-jetbrains text-xs flex items-center gap-2">
        <span style={{ color: '#8B949E' }}>📄</span>
        <span>{filename}</span>
      </div>
      <div className="p-4 flex-1 space-y-0.5">
        {code.map((line, i) => {
          if (line.type === 'blank') return <div key={i} className="h-2" />
          if (line.type === 'comment') {
            return <div key={i} className="token-comment">{line.text}</div>
          }
          return <CodeLine key={i} parts={line.parts} />
        })}
      </div>
      <div className="px-4 pb-4 flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              background: '#0D1117',
              color: '#8B949E',
              border: '1px solid #30363D',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Dev Footer ─── */
function DevFooter() {
  return (
    <footer
      className="relative px-6 md:px-16 py-16"
      style={{ borderTop: '1px solid #30363D', zIndex: 1 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div>
          <p className="font-bold text-lg mb-1" style={{ fontFamily: '"JetBrains Mono", monospace', color: '#E6EDF3' }}>
            [YOUR_NAME]
          </p>
          <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#8B949E' }}>
            Marketing Technologist
          </p>
        </div>

        <div className="space-y-1.5">
          {[
            { method: 'GET', path: '/hire-me', status: '200 OK', color: '#00FF87' },
            { method: 'POST', path: '/coffee-chat', status: '200 OK', color: '#00FF87' },
            { method: 'DELETE', path: '/bad-martech', status: '204 No Content', color: '#F54E00' },
          ].map(r => (
            <div key={r.path} style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.78rem' }}>
              <span style={{ color: '#F54E00' }}>{r.method}</span>
              <span style={{ color: '#8B949E' }}> {r.path} → </span>
              <span style={{ color: r.color }}>{r.status}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="mailto:[YOUR_EMAIL]"
            className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            style={{ fontFamily: 'Inter, sans-serif', color: '#8B949E' }}
          >
            <Mail size={15} /> [YOUR_EMAIL]
          </a>
          <a
            href="[YOUR_LINKEDIN_URL]"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            style={{ fontFamily: 'Inter, sans-serif', color: '#8B949E' }}
          >
            <ExternalLink size={15} /> LinkedIn
          </a>
        </div>
      </div>

      <p
        className="text-center mt-12 text-xs"
        style={{ fontFamily: '"JetBrains Mono", monospace', color: '#30363D' }}
      >
        Built to apply for one specific job. No regrets.
      </p>
    </footer>
  )
}

/* ─── Main export ─── */
const modeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.25 } },
}

export default function DeveloperMode() {
  return (
    <motion.div
      variants={modeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="developer-mode"
    >
      <TerminalHero />

      {/* Use Case Cards */}
      <section className="px-6 md:px-16 py-16" style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <span
            className="text-xs font-bold tracking-widest uppercase block mb-8"
            style={{ fontFamily: '"JetBrains Mono", monospace', color: '#8B949E' }}
          >
            // use cases
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {USE_CASES.map(uc => (
              <CodeCard key={uc.filename} {...uc} />
            ))}
          </div>
        </div>
      </section>

      <ArchitectureDiagram />
      <DevFooter />
      <PostHogWidget />
    </motion.div>
  )
}
