import { useState, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useWindowWidth } from '../hooks/useWindowWidth'

const GROUP_STYLES = {
  data: { bg: '#0D2137', color: '#58A6FF', border: '#1F6FEB' },
  activation: { bg: '#2D1200', color: '#F54E00', border: '#F54E00' },
  measurement: { bg: '#051E0E', color: '#00FF87', border: '#00FF87' },
  content: { bg: '#161B22', color: '#8B949E', border: '#30363D' },
}

const NODE_TOOLTIPS = {
  'rt-cdp': { name: 'Adobe RT-CDP', category: 'Data Layer', use: 'Real-time customer profile unification across touchpoints' },
  'sf-data360': { name: 'Salesforce Data360', category: 'Data Layer', use: 'Unified data model for customer 360 insights' },
  'sfmc': { name: 'Salesforce Marketing Cloud', category: 'Activation Layer', use: 'Email, SMS, and journey orchestration at scale' },
  'sfmc-web': { name: 'SFMC Web Personalisation', category: 'Activation Layer', use: 'Dynamic on-site content personalisation via segment rules' },
  'agentforce': { name: 'Salesforce Agentforce', category: 'Activation Layer', use: 'AI-driven sales and service agent augmentation' },
  'ga4': { name: 'Google Analytics 4', category: 'Measurement Layer', use: 'Event-based behavioural analytics and conversion tracking' },
  'gtm': { name: 'Google Tag Manager', category: 'Measurement Layer', use: 'Tag orchestration and data layer management' },
  'g-optimize': { name: 'Google Optimize', category: 'Measurement Layer', use: 'A/B and multivariate testing on web experiences' },
  'aem': { name: 'Adobe Experience Manager', category: 'Content & Experience', use: 'Enterprise CMS for content authoring and delivery' },
}

function makeNode(id, x, y, label, group) {
  const s = GROUP_STYLES[group]
  return {
    id,
    position: { x, y },
    data: { label },
    style: {
      background: s.bg,
      color: s.color,
      border: `1.5px solid ${s.border}`,
      borderRadius: '6px',
      padding: '10px 14px',
      fontSize: '12px',
      fontFamily: '"JetBrains Mono", monospace',
      minWidth: '160px',
      cursor: 'pointer',
    },
    group,
  }
}

const initialNodes = [
  makeNode('rt-cdp', 80, 60, 'Adobe RT-CDP', 'data'),
  makeNode('sf-data360', 320, 60, 'Salesforce Data360', 'data'),
  makeNode('sfmc', 20, 230, 'SFMC', 'activation'),
  makeNode('sfmc-web', 240, 230, 'SFMC Web Personalisation', 'activation'),
  makeNode('agentforce', 500, 230, 'Salesforce Agentforce', 'activation'),
  makeNode('ga4', 20, 400, 'Google Analytics 4', 'measurement'),
  makeNode('gtm', 240, 400, 'Google Tag Manager', 'measurement'),
  makeNode('g-optimize', 500, 400, 'Google Optimize', 'measurement'),
  makeNode('aem', 240, 560, 'Adobe Experience Manager', 'content'),
]

function makeEdge(id, source, target, color) {
  return {
    id,
    source,
    target,
    animated: true,
    style: { stroke: color, strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color, width: 14, height: 14 },
  }
}

const DATA_COLOR = '#1F6FEB'
const ACT_COLOR = '#F54E00'
const MEAS_COLOR = '#00FF87'

const initialEdges = [
  makeEdge('e1', 'rt-cdp', 'sfmc', DATA_COLOR),
  makeEdge('e2', 'rt-cdp', 'sfmc-web', DATA_COLOR),
  makeEdge('e3', 'sf-data360', 'rt-cdp', DATA_COLOR),
  makeEdge('e4', 'sf-data360', 'agentforce', DATA_COLOR),
  makeEdge('e5', 'gtm', 'ga4', MEAS_COLOR),
  makeEdge('e6', 'gtm', 'rt-cdp', MEAS_COLOR),
  makeEdge('e7', 'ga4', 'rt-cdp', MEAS_COLOR),
  makeEdge('e8', 'aem', 'sfmc-web', ACT_COLOR),
  makeEdge('e9', 'aem', 'g-optimize', ACT_COLOR),
  makeEdge('e10', 'sfmc', 'agentforce', ACT_COLOR),
  makeEdge('e11', 'gtm', 'g-optimize', MEAS_COLOR),
]

const GROUPS = [
  { key: 'data', label: 'Data Layer', color: '#1F6FEB' },
  { key: 'activation', label: 'Activation Layer', color: '#F54E00' },
  { key: 'measurement', label: 'Measurement Layer', color: '#00FF87' },
  { key: 'content', label: 'Content & Experience', color: '#8B949E' },
]

const MOBILE_GROUPS = [
  {
    label: 'Data Layer',
    color: '#1F6FEB',
    nodes: ['Adobe RT-CDP', 'Salesforce Data360'],
  },
  {
    label: 'Activation Layer',
    color: '#F54E00',
    nodes: ['Salesforce Marketing Cloud', 'SFMC Web Personalisation', 'Salesforce Agentforce'],
  },
  {
    label: 'Measurement Layer',
    color: '#00FF87',
    nodes: ['Google Analytics 4', 'Google Tag Manager', 'Google Optimize'],
  },
  {
    label: 'Content & Experience',
    color: '#8B949E',
    nodes: ['Adobe Experience Manager'],
  },
]

function MobileView() {
  return (
    <div className="px-4 py-8 max-w-lg mx-auto">
      <h3
        className="text-xs font-bold tracking-widest uppercase mb-6"
        style={{ fontFamily: '"JetBrains Mono", monospace', color: '#8B949E' }}
      >
        // MarTech Stack | ZS Associates Engagements
      </h3>
      <div className="space-y-4">
        {MOBILE_GROUPS.map(group => (
          <div
            key={group.label}
            className="rounded-lg p-4"
            style={{ background: '#161B22', border: `1px solid ${group.color}33` }}
          >
            <div
              className="text-xs font-bold mb-3 uppercase tracking-wider"
              style={{ fontFamily: '"JetBrains Mono", monospace', color: group.color }}
            >
              {group.label}
            </div>
            <ul className="space-y-1">
              {group.nodes.map(node => (
                <li
                  key={node}
                  className="text-sm"
                  style={{ fontFamily: '"JetBrains Mono", monospace', color: '#E6EDF3' }}
                >
                  → {node}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ArchitectureDiagram() {
  const width = useWindowWidth()
  const isMobile = width < 768
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)
  const [tooltip, setTooltip] = useState(null)

  const onNodeClick = useCallback((_evt, node) => {
    const info = NODE_TOOLTIPS[node.id]
    if (!info) return
    setTooltip(prev => prev?.id === node.id ? null : { id: node.id, ...info })
  }, [])

  const onPaneClick = useCallback(() => setTooltip(null), [])

  return (
    <section className="py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase block mb-1"
              style={{ fontFamily: '"JetBrains Mono", monospace', color: '#8B949E' }}
            >
              // the architecture
            </span>
            <h2
              className="text-xl font-bold"
              style={{ fontFamily: '"JetBrains Mono", monospace', color: '#E6EDF3' }}
            >
              MarTech Stack
            </h2>
            <p className="text-sm mt-1" style={{ color: '#8B949E', fontFamily: 'Inter, sans-serif' }}>
              ZS Associates Engagements — click any node for details
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3">
            {GROUPS.map(g => (
              <div key={g.key} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: g.color }} />
                <span className="text-xs" style={{ fontFamily: '"JetBrains Mono", monospace', color: '#8B949E' }}>
                  {g.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {isMobile ? (
          <MobileView />
        ) : (
          <div className="relative" style={{ height: 700 }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              fitView
              fitViewOptions={{ padding: 0.15 }}
              style={{
                background: 'transparent',
                borderRadius: '8px',
                border: '1px solid #30363D',
              }}
            >
              <Controls
                style={{
                  background: '#161B22',
                  border: '1px solid #30363D',
                  borderRadius: '6px',
                }}
              />
            </ReactFlow>

            {tooltip && (
              <div
                className="absolute bottom-4 left-4 rounded-lg p-4 max-w-xs z-10"
                style={{ background: '#161B22', border: '1px solid #30363D' }}
              >
                <div
                  className="font-bold text-sm mb-1"
                  style={{ fontFamily: '"JetBrains Mono", monospace', color: '#E6EDF3' }}
                >
                  {tooltip.name}
                </div>
                <div
                  className="text-xs mb-2"
                  style={{ fontFamily: '"JetBrains Mono", monospace', color: '#8B949E' }}
                >
                  {tooltip.category}
                </div>
                <div className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#8B949E' }}>
                  Used for: {tooltip.use}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
