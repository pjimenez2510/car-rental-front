"use client";

import * as React from "react";

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
import { formatDate } from "@/lib/format-date";

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
            <CalendarIcon className="mr-2" />
            {dataRange?.startDate ? (
              dataRange.endDate ? (
                <>
                  {formatDate(dataRange.startDate, "LLL dd, y")} -{" "}
                  {formatDate(dataRange.endDate, "LLL dd, y")}
                </>
              ) : (
                formatDate(dataRange.startDate, "LLL dd, y")
              )
            ) : (
              <span>Seleciona el rango de fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            disabled={(date) => date < new Date()}
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
