"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useVehicleFilterStore } from "@/features/vehicles/context/use-vehicle-filter-store";

export function DateRangeFilter({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const {
    filterParams: { dateRange: dataRange },
    setDateRange,
  } = useVehicleFilterStore();

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              " justify-start text-left font-normal",
              !dataRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {dataRange?.startDate ? (
              dataRange.endDate ? (
                <>
                  {format(dataRange.startDate, "LLL dd, y")} -{" "}
                  {format(dataRange.endDate, "LLL dd, y")}
                </>
              ) : (
                format(dataRange.startDate, "LLL dd, y")
              )
            ) : (
              <span>Seleciona el rango de fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dataRange?.startDate}
            selected={{ from: dataRange?.startDate, to: dataRange?.endDate }}
            onSelect={(selectedDate) => {
              setDateRange(selectedDate?.from, selectedDate?.to);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
