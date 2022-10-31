type BaseProps = {
  id?: string | number;
  className?: string;
};

export type CardDto = {
  name: string;
  description: string;
};

export type CustomCardProps = BaseProps &
  Partial<CardDto> & {
    deleteHandler?: (data?: any) => void;
    edit?: (data?: any) => void;
    type?: 'add' | 'update'
  };
