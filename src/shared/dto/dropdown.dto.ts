export class DropdownDTO {
  key: number;

  label: string | number;

  shortLabel?: string | number;
}

export class DropdownResponseDTO {
  message: string;

  data: DropdownDTO[];
}
