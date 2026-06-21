import { useRef, useState } from "react";
import { CloudUpload, File, Trash2 } from "lucide-react";

type Props = {
  onChange?: (file: File | null) => void;
};

export default function FileUpload({ onChange }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatSize = (size: number) => {
    return (size / 1024 / 1024).toFixed(2) + " MB";
  };

  const validateFile = (f: File) => {
    const allowed = ["image/jpeg", "application/pdf"];

    if (!allowed.includes(f.type)) {
      alert("فقط فایل JPG یا PDF مجاز است");
      return false;
    }

    if (f.size > 5 * 1024 * 1024) {
      alert("حداکثر حجم فایل ۵ مگابایت است");
      return false;
    }

    return true;
  };

  const handleFile = (f: File) => {
    if (!validateFile(f)) return;
    setFile(f);
    onChange?.(f);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
    onChange?.(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  return (
    <div
      className={`w-full rounded-[12px] border-2 border-primary-200 transition-all
      ${
        file
          ? "h-[80px] border-gray-300 px-[10px] py-[12px] flex items-center justify-between"
          : "h-[160px] border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 cursor-pointer"
      }
      ${dragActive ? "bg-gray-50 border-primary" : ""}`}
      onClick={() => !file && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.pdf"
        className="hidden"
        onChange={handleChange}
      />

      {!file && (
        <>
          <CloudUpload size={32} className="text-primary-600"/>
          <p className="text-base text-primary-700">برای بارگذاری کلیک کنید</p>
          <p className="text-xs text-neutral-400">
            فرمت JPG یا PDF - حداکثر ۵ مگابایت
          </p>
        </>
      )}

      {file && (
        <>
          <div className="flex items-center gap-[12px]">
            <div className="w-[40px] h-[40px] flex items-center justify-center bg-primary-100 rounded-full">
              <File size={24} className="text-primary-600" />
            </div>

            <div className="flex flex-col">
              <span className="text-base text-primary-700">{file.name}</span>
              <span className="text-xs text-neutral-400">
                {formatSize(file.size)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeFile();
            }}
            className="p-2 rounded-lg text-primary-600 hover:bg-primary-100"
          >
            <Trash2 size={20} />
          </button>
        </>
      )}
    </div>
  );
}
