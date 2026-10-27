import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { fallacies } from './data';

import { useTranslation } from "react-i18next";

interface NodeData {
  label: string;
  count?: number;
  title?: string;
  variant: 'root' | 'primary' | 'accent';
}

function CustomNode({ data }: { data: NodeData }) {
  if (data.variant === 'root') {
    return (
      <div className="bg-bg text-primary px-8 py-5 font-mono text-xs tracking-widest uppercase border-2 border-primary shadow-[4px_4px_0px_0px_var(--primary)]">
        <Handle type="source" position={Position.Left} className="opacity-0" />
        {data.label}
      </div>
    );
  }

  if (data.variant === 'primary' && data.count !== undefined) {
    return (
      <div className="bg-bg text-primary p-5 w-60 border border-primary/40 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]">
        <Handle type="target" position={Position.Right} className="opacity-0" />
        <Handle type="source" position={Position.Left} className="opacity-0" />
        <div className="font-mono text-[11px] uppercase tracking-wider mb-2">{data.label}</div>
        <div className="text-xl font-bold font-mono">{data.count}</div>
      </div>
    );
  }

  if (data.variant === 'accent' && data.count !== undefined) {
    return (
      <div className="bg-bg text-accent p-5 w-60 border border-accent/40 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]">
        <Handle type="target" position={Position.Right} className="opacity-0" />
        <Handle type="source" position={Position.Left} className="opacity-0" />
        <div className="font-mono text-[11px] uppercase tracking-wider mb-2">{data.label}</div>
        <div className="text-xl font-bold font-mono">{data.count}</div>
      </div>
    );
  }

  const borderStyle =
    data.variant === 'primary'
      ? 'border-primary/30 hover:border-primary text-primary'
      : 'border-accent/30 hover:border-accent text-accent';

  return (
    <div className="relative">
      <Handle type="target" position={Position.Right} className="opacity-0" />
      <Link
        to={`/${encodeURIComponent(data.title || '')}`}
        className={`block bg-bg px-4 py-3.5 w-60 border text-[11px] font-mono tracking-tight transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)] ${borderStyle}`}
      >
        {data.label}
      </Link>
    </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
};

export default function FallacyMap() {
  const { nodes, edges } = useMemo(() => {
    const formal = fallacies.filter((f) => f.formality);
    const informal = fallacies.filter((f) => !f.formality);
    const {t} = useTranslation();
    const nodes: Node[] = [
      {
        id: 'root',
        type: 'custom',
        position: { x: 3200, y: 1000 },
        data: { label: 'Logical Fallacies', variant: 'root' },
      },
      {
        id: 'formal',
        type: 'custom',
        position: { x: 2300, y: 150 },
        data: { label: 'Formal Fallacies', count: formal.length, variant: 'primary' },
      },
      {
        id: 'informal',
        type: 'custom',
        position: { x: 2300, y: 2400 },
        data: { label: 'Informal Fallacies', count: informal.length, variant: 'accent' },
      },
    ];

    const edges: Edge[] = [
      {
        id: 'root-formal',
        source: 'root',
        target: 'formal',
        type: 'bezier',
        style: { stroke: 'currentColor', strokeWidth: 1.5, opacity: 0.2 },
      },
      {
        id: 'root-informal',
        source: 'root',
        target: 'informal',
        type: 'bezier',
        style: { stroke: 'currentColor', strokeWidth: 1.5, opacity: 0.2 },
      },
    ];

    const addBranch = (
      items: typeof fallacies,
      groupId: string,
      variant: 'primary' | 'accent',
      startY: number
    ) => {
      const PER_COL = 6;
      const ROW_GAP = 180;
      const COL_GAP = 420;

      items.forEach((f, i) => {
        const id = `${groupId}-${i}`;
        const col = Math.floor(i / PER_COL);
        const row = i % PER_COL;

        nodes.push({
          id,
          type: 'custom',
          position: {
            x: 1600 - col * COL_GAP,
            y: startY + row * ROW_GAP,
          },
          data: {
            title: t(`fallacy.`),
            label: f.title.replaceAll('-', ' '),
            variant,
          },
        });

        edges.push({
          id: `edge-${id}`,
          source: groupId,
          target: id,
          type: 'bezier',
          style: { stroke: 'currentColor', strokeWidth: 1, opacity: 0.1 },
        });
      });
    };

    addBranch(formal, 'formal', 'primary', 50);
    addBranch(informal, 'informal', 'accent', 600);

    return { nodes, edges };
  }, []);

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-bg border border-primary/20 touch-pan-x touch-pan-y">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.02}
        maxZoom={2}
        nodesDraggable={true}
        panOnDrag={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="currentColor" gap={40} size={1} className="opacity-5" />
        <Controls className="border border-primary/20 bg-bg fill-primary shadow-none" />
      </ReactFlow>
    </div>
  );
}