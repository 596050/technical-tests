import {
  SelectChangeEvent
} from "@tbi/components";
import { SELECT_OPTIONS } from "@tbi/helpers";
import { UseSearchParamsProps } from "@tbi/hooks";

export function cleanParams<
  T extends SelectChangeEvent<string>,
  P extends UseSearchParamsProps[keyof UseSearchParamsProps],
>(key: string, event: T) {
  return (filters: P) => ({
    ...filters,
    ...(!!event.target.value ? { [key]: event.target.value } : {}),
    ...(event.target.value === SELECT_OPTIONS.None ? { [key]: null } : {}),
  });
}