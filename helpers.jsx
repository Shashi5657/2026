export const FILE_EXTENSIONS = {
  IMAGE: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"],

  VIDEO: [".mp4", ".m4v", ".mov", ".avi", ".mkv", ".webm"],

  PDF: [".pdf"],

  DOCUMENT: [
    // Word
    ".doc",
    ".docx",

    // Excel
    ".xls",
    ".xlsx",
    ".csv",

    // PowerPoint
    ".ppt",
    ".pptx",

    // Text & markup
    ".txt",
    ".rtf",
    ".md",
  ],
};

export const MIME_TYPES = {
  IMAGE: "image/",
  VIDEO: "video/",
  PDF: "application/pdf",
  WORD: ["application/msword"],
  EXCEL: ["application/vnd.ms-excel"],
};

export const getFileTypeFromExtension = (extension) => {
  const ext = extension?.toLowerCase() || "";

  if (FILE_EXTENSIONS.IMAGE.includes(ext)) return "image";
  if (FILE_EXTENSIONS.VIDEO.includes(ext)) return "video";
  if (FILE_EXTENSIONS.PDF.includes(ext)) return "pdf";
  if (FILE_EXTENSIONS.DOCUMENT.includes(ext)) return "document";

  return "unknown";
};

export const getFileTypeFromMime = (mimeType) => {
  const mime = mimeType.toLowerCase() || "";

  if (mime.startsWith(MIME_TYPES.IMAGE)) return "image";
  if (mime.startsWith(MIME_TYPES.VIDEO)) return "video";
  if (mime === MIME_TYPES.PDF) return "pdf";
  if (MIME_TYPES.WORD.includes(mime)) return "document";
  if (MIME_TYPES.EXCEL.includes(mime)) return "excel";

  return unknown;
};

export const detectFileType = ({ extension, mimeType, fileName }) => {
  if (mimeType) {
    const type = getFileTypeFromMime(mimeType);
    if (type !== "unknown") return type;
  }

  if (extension) {
    const type = getFileTypeFromExtension(extension);
    if (type !== "unknown") return type;
  }

  if (fileName) {
    const ext = "." + fileName.split(".").pop().toLowerCase();
    return getFileTypeFromExtension(ext);
  }

  return "unknown";
};

export const getFileTypeLabel = (fileType, extension) => {
  const labels = {
    image: "Image",
    video: "Video",
    pdf: "Pdf",
    document: "Document",
    excel: "Excel",
  };

  if (labels[fileType]) return labels[fileType];

  if (extension) {
    return extension.replace(".", "").toUpperCase();
  }

  return "FILE";
};

export const getVideoMimeType = (extension) => {
  const ext = extension?.toLowerCase().replace(".", "") || "mp4";
  return `video/${ext}`;
};

export const safeEncodeURI = (url) => {
  if (!url) return "";
  try {
    if (url !== decodeURI(url)) {
      return url;
    }
    return encodeURI(url);
  } catch (error) {
    return url;
  }
};

export const createPreviewUrl = (file) => {
  if (file instanceof File || file instanceof Blob) {
    return URL.createObjectURL(file);
  }
  return file;
};

export const isPreviewable = (fileType) => {
  return ["image", "video"].includes(fileType);
};

export const FilePreview = ({
  src,
  file,
  fileName,
  fileExtension,
  mimeType,
  alt,
  mode = "thumnail",
  width = 100,
  height = 100,
  onClick,
  onRemove,
  showRemoveButton = false,
  useReactPlayer = false,
  className,
  style = {},
  unsupportedText = "Unsupported File Type",
  t = (text) => text,
}) => {
  const fileSrc = file ? createPreviewUrl(file) : safeEncodeURI(src);

  const fileType = detectFileType({
    extension: fileExtension,
    mimeType: mimeType || file?.type,
    fileName: fileName || file?.name,
  });

  const displayName = fileName || file?.name || "File";

  const extension =
    fileExtension ||
    (file?.name && "." + file.name.split(".").pop()) ||
    (fileName && "." + fileName.split(".").pop()) ||
    "";

  const renderRemoveButton = () => {
    if (!showRemoveButton || !onRemove) return null;

    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        style={{
          position: "absolute",
          top: "-5px",
          right: "-5px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "#ff4d4f",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          zIndex: 10,
        }}
        aria-label="Remove-file"
      >
        x
      </button>
    );
  };

  const renderImage = () => {
    <img
      src={fileSrc}
      alt={alt || displayName}
      width={width}
      height={height}
      loading="lazy"
      onClick={onclick}
      className={`file-preview-image ${className}`}
      style={{
        objectFit: "cover",
        cursor: onclick ? "pointer" : "default",
        borderRadius: "4px",
        ...style,
      }}
    />;
  };

  const renderVideo = () => {
    if (useReactPlayer) {
      return (
        <ReactPlayer
          url={fileSrc}
          controls
          width={`${width}px`}
          height={`${height}px`}
          className={className}
          style={style}
        />
      );
    }

    return (
      <video
        controls
        width={width}
        height={height}
        loading="lazy"
        onClick={onclick}
        className={`file-preview-video ${className}`}
        style={{
          cursor: onClick ? "pointer" : "default",
          borderRadius: "4px",
          ...style,
        }}
      >
        <source src={fileSrc} type={getVideoMimeType(extension)} />
      </video>
    );
  };

  const renderDocumentLink = () => {
    <a
      href={fileSrc}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`file-preview-document ${className}`}
      style={{
        display: "block",
        width: `${width}px`,
        overflowWrap: "break-word",
        textOverflow: "ellipsis",
        whiteSpace: "normal",
        textDecoration: "none",
        color: "#1890ff",
        ...style,
      }}
    >
      {displayName}
    </a>;
  };

  const renderFileBadge = () => {
    const label = getFileTypeLabel(fileType, extension);

    return (
      <div
        style={{
          backgroundColor: "#fff",
          color: "black",
          padding: "5px 10px",
          borderRadius: "4px",
          fontSize: mode === "card" ? "12px" : "10px",
          textAlign: "center",
        }}
      >
        {label}
      </div>
    );
  };

  const renderDocumentCard = () => {
    const icon = fileType === "pdf" ? "PDF-ICON" : "DOC_ICON";
    const label = fileType === "pdf" ? t("PDF Document") : t("Document");

    return (
      <a
        href={fileSrc}
        target="_blank"
        ref="noopener noreferrer"
        onClick={onClick}
        style={{
          display: "inline-block",
          padding: "8px 16px",
          backgroundColor: "#f0f0f0",
          borderRadius: "4px",
          textDecoration: "none",
          color: "#1890ff",
          ...style,
        }}
        className={className}
      >
        {icon}
        {label}
      </a>
    );
  };

  const renderContent = () => {
    switch (mode) {
      case "thumbnail":
      case "list":
        switch (fileType) {
          case "video":
            return renderVideo();
          case "image":
            return renderImage();
          case "pdf":
          case "document":
          case "excel":
            return renderDocumentLink();
          default:
            return <span className={className}>{t(unsupportedText)}</span>;
        }
      case "card":
        switch (fileType) {
          case "video":
            if (useReactPlayer) return renderVideo();
            return renderFileBadge();
          case "image":
            return renderImage();
          case "pdf":
          case "document":
          case "excel":
            return renderDocumentCard();
          default:
            return renderFileBadge();
        }

      case "inline":
        if (fileType === "image") {
          return renderImage();
        }
        return renderFileBadge();

      default:
        return renderContent();
    }
  };

  const getWrapperStyle = () => {
    const baseStyle = {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    };

    if (mode === "card" || mode === "inline") {
      return {
        ...baseStyle,
        width: `${width}px`,
        height: `${height}px`,
        border: showRemoveButton ? "2px solid #52c41a" : " 1px solid #d9d9d9",
        borderRadius: "4px",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
      };
    }
    return baseStyle;
  };

  if (mode === "card" || mode === "inline") {
    return (
      <div
        style={getWrapperStyle()}
        onClick={!isPreviewable(fileType) && onClick ? onClick : undefined}
        className={`file-preview-wrapper ${mode}`}
      >
        {renderContent()}
        {renderRemoveButton()}
      </div>
    );
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {renderContent()}
      {renderRemoveButton}
    </div>
  );
};

export const AttachmentList = ({
  attachments = [],
  layout = "list",
  previewMode = "thumbnail",
  width = "100",
  height = "100",
  onItemClick,
  onItemRemove,
  showRemoveButton = false,
  useReactPlayer = false,
  emptyText = "No attachments found",
  className = "",
  containerStyle = {},
  t = (text) => text,
}) => {
  const normalizeAttachment = (attachment, index) => {
    if (attachment instanceof File) {
      return {
        file: null,
        rawFile: attachment,
        fileName: attachment.name,
        mimeType: attachment.type,
        fileExtension: "." + attachment.name.split(".")?.pop()?.toLowerCase(),
        index,
      };
    }

    return {
      file: attachment.file || attachment.fileUrl || attachment.url,
      rawFile: attachment.rawFile || null,
      fileName: attachment.fileName || attachment.name || `File ${index + 1}`,
      fileExtension:
        attachment.fileExtension ||
        (attachment.fileName &&
          attachment.fileName.split(".").pop().toLowerCase()) ||
        (attachment.name && attachment.name.split(".").pop().toLowerCase()),
      mimeType: attachment.fileType || attachment.type || attachment.mimeType,
      index,
    };
  };

  const getAttachmentFileType = (normalized) => {
    return detectFileType({
      extension: normalized.fileExtension,
      mimeType: normalized.mimeType,
      fileName: normalized.fileName,
    });
  };

  const handleClick = (normalized, originalAttachment) => {
    if (!onItemClick) return undefined;

    const fileType = getAttachmentFileType(normalized);
    const isVideo = fileType === "video";

    return () => {
      onItemClick(originalAttachment, normalized.index, isVideo);
    };
  };

  const handleRemove = (normalized, originalAttachment) => {
    if (!onItemClick) return undefined;

    return () => {
      onItemRemove(originalAttachment, normalized.index);
    };
  };

  if (!attachments || attachments.length === 0) {
    return (
      <p className="label-data" style={{ color: "#999" }}>
        {t(emptyText)}
      </p>
    );
  }

  const renderAttachment = (attachment, index) => {
    const normalized = normalizeAttachment(attachment, index);

    return (
      <FilePreview
        key={`attachment-${index}`}
        src={normalized.file}
        file={normalized.rawFile}
        fileName={normalized.fileName}
        fileExtension={normalized.fileExtension}
        mimeType={normalized.mimeType}
        mode={previewMode}
        width={width}
        height={height}
        onClick={handleClick(normalized, attachment)}
        onRemove={handleRemove(normalized, attachment)}
        showRemoveButton={showRemoveButton}
        useReactPlayer={useReactPlayer}
        t={t}
      />
    );
  };

  switch (layout) {
    case "grid":
      return (
        <div
          className={`attachment-list-grid ${className}`}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${width}px), 1fr)`,
            gap: "10px",
            ...containerStyle,
          }}
        >
          {attachments.map(renderAttachment)}
        </div>
      );

    case "flex":
      return (
        <div
          className={`attachment-list-flex ${className}`}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            ...containerStyle,
          }}
        >
          {attachments.map(renderAttachment)}
        </div>
      );
    case "list":
      return (
        <ul
          className={`visit-info-evidenceslist ${className}`}
          style={containerStyle}
        >
          {attachments.map((attachment, index) => {
            <List key={`list-item-${index}`}>
              {renderAttachment(attachment, index)}
            </List>;
          })}
        </ul>
      );
  }
};
