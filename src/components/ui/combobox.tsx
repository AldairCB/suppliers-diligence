"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

type props = {
    labelPlaceHolder: string
    searchPlaceholder?: string
    emptyMessage?: string
    options: string[]
    onSelect: (value: string) => void
}

export function Combobox({
    labelPlaceHolder,
    searchPlaceholder = "Search...",
    emptyMessage = "No results found.",
    options,
    onSelect,
}: props) {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between grow"
                    // "grow" tells the element to fill the whole available space
                    // previously it was set to w-[200px] to match the width of the popover
                >
                    {selected ? options.find((option) => option === selected) : labelPlaceHolder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option}
                                    value={option}
                                    onSelect={(currentValue) => {
                                        onSelect(currentValue)
                                        setSelected(currentValue === selected ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check className={cn("mr-2 h-4 w-4", selected === option ? "opacity-100" : "opacity-0")}/>
                                    {option}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}