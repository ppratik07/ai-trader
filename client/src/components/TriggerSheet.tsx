import type { NodeKind } from "./CreateWorkflow"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,

} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useState } from "react"

const SUPPORTED_TRIGGERS = [
    {
        id: 'time-trigger',
        title: 'Time Trigger',
        description: 'Trigger based on specific time intervals'
    },
    {
        id: 'price-trigger',
        title: 'Price Trigger',
        description: 'Trigger based on asset price movements'
    }
]
export type NodeMetaData = any;
export const TriggerSheet = ({
    onSelect
}: {
    onSelect: (kind: NodeKind, metadata: NodeMetaData) => void
}) => {
    const [metadata, setMetadata] = useState({});
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id);
    return (
        <Sheet open={true}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Select Trigger</SheetTitle>
                    <SheetDescription>
                        Select the type of trigger you need
                        {selectedTrigger}
                    </SheetDescription>
                </SheetHeader>
                <Select value={selectedTrigger} onValueChange={(value)=>{
                    setSelectedTrigger(value)
                }}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a trigger" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                                <SelectItem
                                    key={id}
                                    value={id}
                                    onSelect={() => onSelect(()=>{setSelectedTrigger(id)})}
                                >
                                    {title}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <SheetFooter>
                    <Button onClick={()=>{
                        onSelect(
                            selectedTrigger,
                            metadata
                        )
                    }}>Save changes</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}