import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerSheet, type NodeMetaData } from './TriggerSheet';

export type NodeKind ='price-trigger'|'time-trigger'|'hyperliquid'|'bagpack'|'lighter';
interface NodeType{
    data:{
        type : 'action' | 'trigger',
        kind : NodeKind,
        metadata: NodeMetaData,
        label?: string
    },
    id: string, 
    position: { x: number, y: number }
}
interface Edge{
    id: string;
    source : string;
    target : string;
}

export default function CreateWorkflow() {
    const [edges, setEdges] = useState<Edge[]>([]);
    const [nodes, setNodes] = useState<NodeType[]>([]);

    const onNodesChange = useCallback(
        (changes : any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes : any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {!nodes.length ? (
                <TriggerSheet onSelect={(kind, metadata) => {
                    setNodes([
                        ...nodes,
                        {
                            id: Math.random().toString(),
                            data: {
                                type: 'trigger',
                                kind,
                                metadata,
                                label: kind
                            },
                            position: { x: 0, y: 0 }
                        }
                    ]);
                }} />
            ) : null}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            />
        </div>
    );
}





