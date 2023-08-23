export interface Mission {
  name: string;
  flight: number;
}

export interface Capsule {
  capsule_serial?: string;
  capsule_id?: string;
  status?: string;
  original_launch?: string;
  original_launch_unix?: number;
  missions?: Mission[];
  landings?: number;
  type?: string;
  details?: string;
  reuse_count?: number;
}

export interface DropdownProps {
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}
export interface FilterOptions {
  status: string;
  original_launch: string;
  type: string;
}
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export interface ModalProps {
  children: React.ReactNode;
  onClose:(event: React.MouseEvent<HTMLDivElement, MouseEvent>)  => void;
}
export interface DataGridItemProps {
  item: Capsule;
}
