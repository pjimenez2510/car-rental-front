import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import { Label } from '../ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface RHFColorSelectProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
}

const RHFColorSelect: React.FC<RHFColorSelectProps> = ({ name, label, options, placeholder }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const getErrorMessage = (name: string): string | undefined => {
    const error = errors[name]
    return error && typeof error.message === 'string' ? error.message : undefined
  }

  return (
    <div className="mt-2 w-full">
      <Label htmlFor={name} className="ml-1">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="max-h-40 overflow-auto">
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        <span
                          className="mr-2 inline-block h-4 w-4 rounded-full"
                          style={{ backgroundColor: option.value }}
                        ></span>
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {getErrorMessage(name) && <p className="mt-1 text-sm text-red-500">{getErrorMessage(name)}</p>}
          </>
        )}
      />
    </div>
  )
}

export default RHFColorSelect
