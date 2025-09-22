/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

const filterSchema = z.object({
  postcode: z.string().optional(),
  status: z.array(z.string()).optional(),
  vendorType: z.array(z.string()).optional(),
  serviceOffering: z.array(z.string()).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

interface SidebarFiltersProps {
  onFilter: (data: z.infer<typeof filterSchema>) => void;
  onClear: () => void;
}
export function SidebarFilters({ onFilter, onClear }: SidebarFiltersProps) {
  const { register, handleSubmit, control, watch, reset } = useForm<
    z.infer<typeof filterSchema>
  >({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      postcode: "",
      status: [],
      vendorType: [],
      serviceOffering: [],
      startDate: undefined,
      endDate: undefined,
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const clearFilters = () => {
    reset({
      postcode: "",
      status: [],
      vendorType: [],
      serviceOffering: [],
      startDate: undefined,
      endDate: undefined,
    });
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit(onFilter)}
      className="flex flex-col h-full bg-slate-50 rounded-[10px] overflow-y-auto scrollbar-none w-full"
    >
      {/* RESPONSIVE CHANGE: Reduced padding on small screens */}
      <div className="p-4 sm:p-6 space-y-8 flex-1 w-full">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Gler Logo" className="h-16 w-44" />
        </div>
        <button
          type="button"
          className="w-full bg-gray-200/70 text-gray-800 font-bold rounded-lg p-2 text-center"
        >
          User Management
        </button>
        <div className="space-y-8">
          <div className="space-y-1">
            <Label htmlFor="postcode" className="font-semibold text-gray-800">
              Postcode
            </Label>
            <Input
              id="postcode"
              placeholder="ZIP"
              className="mt-2 bg-white rounded-lg border-gray-300"
              {...register("postcode")}
            />
          </div>
          <div className="space-y-3">
            <Label className="font-semibold text-gray-800">
              Registration Status
            </Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="space-y-3">
                  <CheckboxItem id="onboarded" value="Onboarded" field={field}>
                    Onboarded
                  </CheckboxItem>
                  <CheckboxItem id="rejected" value="Rejected" field={field}>
                    Rejected
                  </CheckboxItem>
                </div>
              )}
            />
          </div>
          <div className="rounded-lg">
            <Label className="font-semibold text-gray-800">
              Date Registered
            </Label>
            {/* RESPONSIVE CHANGE: Stacks to 1 column on mobile, 2 on larger screens */}
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePickerPopover
                    field={field}
                    placeholder="Start"
                    selectedDate={startDate}
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePickerPopover
                    field={field}
                    placeholder="End"
                    selectedDate={endDate}
                  />
                )}
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label className="font-semibold text-gray-800">Vendor Type</Label>
            <Controller
              name="vendorType"
              control={control}
              render={({ field }) => (
                <div className="mt-2 space-y-3">
                  <CheckboxItem
                    id="independent"
                    value="Independent"
                    field={field}
                  >
                    Independent
                  </CheckboxItem>
                  <CheckboxItem id="company" value="Company" field={field}>
                    Company
                  </CheckboxItem>
                </div>
              )}
            />
          </div>
          <div className="space-y-3">
            <Label className="font-semibold text-gray-800">
              Service Offering
            </Label>
            <Controller
              name="serviceOffering"
              control={control}
              render={({ field }) => (
                <div className="mt-2 space-y-3">
                  <CheckboxItem
                    id="housekeeping"
                    value="Housekeeping"
                    field={field}
                  >
                    Housekeeping
                  </CheckboxItem>
                  <CheckboxItem
                    id="window-cleaning"
                    value="Window Cleaning"
                    field={field}
                  >
                    Window Cleaning
                  </CheckboxItem>
                  <CheckboxItem id="car-valet" value="Car Valet" field={field}>
                    Car Valet
                  </CheckboxItem>
                </div>
              )}
            />
          </div>
        </div>
      </div>
      {/* RESPONSIVE CHANGE: Stacks buttons vertically on mobile */}
      <div className="p-4 sm:p-6 pt-4 border-t border-gray-200 bg-slate-50 flex flex-col sm:flex-row sm:justify-between items-center gap-3">
        <Button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 cursor-pointer font-semibold"
        >
          Filter
        </Button>
        <Button
          type="button"
          onClick={clearFilters}
          className="w-full sm:w-auto bg-transparent text-[#525758] cursor-pointer hover:text-white font-semibold px-6 border-2"
        >
          Clear Filters
        </Button>
      </div>
    </form>
  );
}

const CheckboxItem = ({
  id,
  value,
  field,
  children,
}: {
  id: string;
  value: string;
  field: any;
  children: React.ReactNode;
}) => (
  <div className="flex items-center">
    <Checkbox
      id={id}
      checked={field.value?.includes(value)}
      onCheckedChange={(checked) => {
        const currentValues = field.value || [];
        if (checked) {
          field.onChange([...currentValues, value]);
        } else {
          field.onChange(currentValues.filter((v: string) => v !== value));
        }
      }}
      className="h-5 w-5"
    />
    <Label htmlFor={id} className="ml-3 text-base font-medium">
      {children}
    </Label>
  </div>
);

const DatePickerPopover = ({
  field,
  placeholder,
  selectedDate,
}: {
  field: any;
  placeholder: string;
  selectedDate?: Date;
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className={cn(
          "w-full justify-between text-left font-normal bg-white rounded-lg",
          !selectedDate && "text-muted-foreground"
        )}
      >
        <div className="flex flex-col items-start">
          {selectedDate ? (
            format(selectedDate, "MM/dd/yyyy")
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <CalendarIcon className="h-4 w-4 text-gray-500" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={field.value}
        onSelect={field.onChange}
        autoFocus
      />
    </PopoverContent>
  </Popover>
);
