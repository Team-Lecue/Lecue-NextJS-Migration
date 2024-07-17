// 추후 import해오는 것으로 변경 예정
export interface SelectColorProps {
  isIconClicked: boolean;
  lecueNoteState: {
    textColor: string;
    background: string;
    category?: string;
    contents?: string;
  };
  selectedFile: (file: File) => void;
  presignedUrlDispatch: React.Dispatch<{
    type: "SET_PRESIGNED_URL";
    presignedUrl: string;
    filename: string;
  }>;
  handleCategoryFn: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleColorFn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleIconFn: () => void;
  handleTransformImgFile: (file: string | FileReader) => void;
  handleIsLoading: (status: boolean) => void;
}

export type createBookType = Omit<
  SelectColorProps,
  "clickedBgColor" | "clickedCategory"
>;

export interface BookInfoSectionProps {
  backgroundColor: string;
  description: string;
  changeDescription: (description: string) => void;
}

export interface CompleteButtonProps {
  isActive: boolean;
  onClick: () => void;
  backgroundColor: string;
}

export interface BookInfoTextareaProps {
  description: string;
  changeDescription: (description: string) => void;
}

export interface BookInputProps {
  title: string;
  changeTitle: (title: string) => void;
}

export interface BookInputSectionProps {
  backgroundColor: string;
  title: string;
  changeTitle: (title: string) => void;
}

export interface ShowColorChartProps {
  backgroundColor: string;
  handleFn: (backgroundColor: string) => void;
}
